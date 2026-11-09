#!/usr/bin/env node
// Validates the frontmatter of every problem doc and SOLUTION.md, then regenerates the index
// tables in problems/README.md and solutions/README.md (between the index markers).
//
//   node scripts/build-index.mjs           validate, then write the indexes
//   node scripts/build-index.mjs --check   validate, and fail if an index is out of date (CI)
//
// Exit code 1 on any validation error or stale index.

import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CHECK = process.argv.includes("--check");
const START = "<!-- index:start -->";
const END = "<!-- index:end -->";

const PROBLEM_TYPES = ["social", "technical", "hybrid", "unsure"];
const PROBLEM_STATUSES = ["accepted", "claimed", "in-progress", "shipped", "archived"];
const SOLUTION_TYPES = ["volunteer-program", "web-app", "mobile-app", "process", "other"];
const SOLUTION_STATUSES = ["proposed", "building", "piloting", "live", "paused", "retired"];

const errors = [];
const fail = (file, msg) => errors.push(`${file}: ${msg}`);

function readFrontmatter(rel) {
  const text = readFileSync(join(ROOT, rel), "utf8");
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!m) {
    fail(rel, "missing YAML frontmatter (the block between --- lines at the top)");
    return null;
  }
  try {
    return parse(m[1]) ?? {};
  } catch (e) {
    fail(rel, `frontmatter is not valid YAML: ${e.message.split("\n")[0]}`);
    return null;
  }
}

function requireString(rel, fm, key) {
  const v = fm[key];
  if (typeof v !== "string" || !v.trim()) {
    fail(rel, `"${key}" is required and must be text`);
    return false;
  }
  return true;
}

function requireDate(rel, fm, key) {
  const v = fm[key];
  const ok = v instanceof Date || (typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v));
  if (!ok) fail(rel, `"${key}" is required and must be a date like 2026-11-08`);
}

function requireEnum(rel, fm, key, allowed) {
  if (!allowed.includes(fm[key])) {
    fail(rel, `"${key}" must be one of: ${allowed.join(", ")} (got ${JSON.stringify(fm[key])})`);
  }
}

// Table cells can't contain a pipe or a line break.
const cell = (v) => String(v ?? "").replace(/\|/g, "\\|").replace(/\s*\n\s*/g, " ");

// ---------- problems ----------
const problems = new Map(); // id -> { rel, fm, file }
for (const file of readdirSync(join(ROOT, "problems")).sort()) {
  if (!file.endsWith(".md") || file === "README.md") continue;
  const rel = `problems/${file}`;
  const m = file.match(/^(\d{4})-[a-z0-9]+(?:-[a-z0-9]+)*\.md$/);
  if (!m) {
    fail(rel, "file name must look like 0001-short-slug.md (4 digits, then lowercase words joined by hyphens)");
    continue;
  }
  const fm = readFrontmatter(rel);
  if (!fm) continue;
  const id = String(fm.id ?? "");
  if (id !== m[1]) fail(rel, `"id" must be "${m[1]}" to match the file name (got ${JSON.stringify(fm.id)})`);
  if (problems.has(m[1])) fail(rel, `id ${m[1]} is already used by ${problems.get(m[1]).rel}`);
  ["title", "purpose", "issue"].forEach((k) => requireString(rel, fm, k));
  requireDate(rel, fm, "submitted");
  requireEnum(rel, fm, "type", PROBLEM_TYPES);
  requireEnum(rel, fm, "status", PROBLEM_STATUSES);
  problems.set(m[1], { rel, fm, file });
}

// ---------- solutions ----------
const solutions = []; // { rel, fm, dir }
for (const dir of readdirSync(join(ROOT, "solutions")).sort()) {
  if (!statSync(join(ROOT, "solutions", dir)).isDirectory()) continue;
  const relDir = `solutions/${dir}`;
  const m = dir.match(/^(\d{4})-[a-z0-9]+(?:-[a-z0-9]+)*$/);
  if (!m) {
    fail(relDir, "folder name must look like 0001-short-slug (the problem id, then lowercase words joined by hyphens)");
    continue;
  }
  const rel = `${relDir}/SOLUTION.md`;
  if (!existsSync(join(ROOT, rel))) {
    fail(relDir, "every solution folder needs a SOLUTION.md (copy templates/solution-proposal.md)");
    continue;
  }
  const fm = readFrontmatter(rel);
  if (!fm) continue;
  const pid = String(fm.problem ?? "");
  if (pid !== m[1]) fail(rel, `"problem" must be "${m[1]}" to match the folder name (got ${JSON.stringify(fm.problem)})`);
  if (!problems.has(pid)) fail(rel, `"problem" ${JSON.stringify(pid)} doesn't match any file in problems/`);
  ["title", "purpose"].forEach((k) => requireString(rel, fm, k));
  if (!Array.isArray(fm.leads) || fm.leads.length === 0 || !fm.leads.every((l) => typeof l === "string" && l.trim())) {
    fail(rel, `"leads" must be a list of at least one GitHub username, like [octocat]`);
  }
  requireDate(rel, fm, "started");
  requireEnum(rel, fm, "type", SOLUTION_TYPES);
  requireEnum(rel, fm, "status", SOLUTION_STATUSES);
  solutions.push({ rel, fm, dir });
}

// ---------- build tables ----------
function problemsTable() {
  if (problems.size === 0) return "_No problems have been accepted yet._";
  const rows = [...problems.entries()].map(([id, { fm, file }]) => {
    const sols = solutions
      .filter((s) => String(s.fm.problem) === id)
      .map((s) => `[${cell(s.fm.title)}](../solutions/${s.dir}/SOLUTION.md)`)
      .join(", ");
    return `| ${id} | [${cell(fm.title)}](${file}) | ${cell(fm.type)} | ${cell(fm.status)} | ${sols || "—"} |`;
  });
  return ["| ID | Problem | Type | Status | Solutions |", "|---|---|---|---|---|", ...rows].join("\n");
}

function solutionsTable() {
  if (solutions.length === 0) return "_No solutions yet. Pick a problem and be the first._";
  const rows = solutions.map(({ fm, dir }) => {
    const p = problems.get(String(fm.problem));
    const prob = p ? `[${String(fm.problem)}: ${cell(p.fm.title)}](../problems/${p.file})` : cell(fm.problem);
    const leads = (fm.leads ?? []).map((l) => `@${cell(l).replace(/^@/, "")}`).join(", ");
    return `| [${cell(fm.title)}](${dir}/SOLUTION.md) | ${prob} | ${cell(fm.type)} | ${cell(fm.status)} | ${leads} |`;
  });
  return ["| Solution | Problem | Type | Status | Leads |", "|---|---|---|---|---|", ...rows].join("\n");
}

function updateIndex(rel, table) {
  const path = join(ROOT, rel);
  const text = readFileSync(path, "utf8");
  const a = text.indexOf(START);
  const b = text.indexOf(END);
  if (a === -1 || b === -1 || b < a) {
    fail(rel, `missing the ${START} … ${END} markers`);
    return;
  }
  const next = `${text.slice(0, a + START.length)}\n${table}\n${text.slice(b)}`;
  if (next === text) return;
  if (CHECK) fail(rel, "index is out of date. Run `npm run index` and commit the result");
  else writeFileSync(path, next);
}

if (errors.length === 0) {
  updateIndex("problems/README.md", problemsTable());
  updateIndex("solutions/README.md", solutionsTable());
}

if (errors.length) {
  console.error(`✗ ${errors.length} error(s) found:\n`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`✓ ${problems.size} problem(s), ${solutions.length} solution(s)${CHECK ? ", indexes up to date" : ", indexes written"}`);
