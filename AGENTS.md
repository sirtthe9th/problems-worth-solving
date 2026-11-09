<!-- purpose: The rules for AI coding assistants (and the people using them) working in this repository, condensed from CONTRIBUTING.md and SAFETY.md. -->

# Instructions for AI assistants

You're working in a public hub of problems and their solutions. A person is responsible for everything
you help them submit.

## Layout

- `problems/NNNN-slug.md`: one requirements doc per accepted problem. Frontmatter is validated.
- `solutions/NNNN-slug/SOLUTION.md`: one solution per folder. `NNNN` is the problem id. Code and other
  material for that solution sit in the same folder.
- `templates/`: copy these. Don't edit them as part of a problem or solution change.
- `problems/README.md` and `solutions/README.md`: the tables between the `index` markers are generated.
  Run `npm run index`; never edit them by hand.

## Rules

1. **Facts or blanks.** Never invent evidence, statistics, sources, or "how it works here" facts. If you
   don't have a source, write `[to confirm]` and add it to the Gaps or Open questions list.
2. **Roles, not names.** Never name or identify a private individual.
3. **Problem docs describe the problem only.** Don't add a solution to a problem doc.
4. **Follow the solution framework in order** (CONTRIBUTING.md): field, situation, users, access, steps,
   then around the steps. Don't skip to the steps.
5. **No money, no secrets, no real personal data**, including in test fixtures. See SAFETY.md.
6. **Stay in your folder.** A change to a solution touches only that solution's folder, plus the
   regenerated index.
7. **Run `npm run check` before proposing a pull request**, and leave it failing rather than weakening a
   check to make it pass.
