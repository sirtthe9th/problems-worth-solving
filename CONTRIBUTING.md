<!-- purpose: Step-by-step instructions for every way to contribute (submit, improve, claim, build), the writing rules, and the solution framework that every SOLUTION.md follows. -->

# Contributing

Thank you for helping. There are four ways to contribute, and only the last one needs git.

1. [Submit a problem](#1-submit-a-problem)
2. [Improve a problem](#2-improve-a-problem)
3. [Claim a problem](#3-claim-a-problem)
4. [Build a solution](#4-build-a-solution)

Before you start, read the [Code of Conduct](CODE_OF_CONDUCT.md) and [SAFETY.md](SAFETY.md).

## 1. Submit a problem

1. **Search first.** Check [open issues](https://github.com/sirtthe9th/problems-worth-solving/issues)
   and [`problems/`](problems/) in case it's already here. If it is, add what you know as a comment.
2. **Open a [Problem issue](https://github.com/sirtthe9th/problems-worth-solving/issues/new?template=1-problem.yml)**
   and fill in the form. Required fields are marked; the rest can be "don't know".
3. **Stay around for questions.** A maintainer may label it `needs-info` and ask for more. If there's
   no reply in 30 days, the issue may be closed. You can always reopen it.
4. **When it's accepted**, a maintainer turns it into a requirements doc in `problems/` and links it
   from the issue. You'll be credited in the doc.

Not sure it's a real problem yet? [Start a discussion](https://github.com/sirtthe9th/problems-worth-solving/discussions)
in the **Ideas** category instead.

## 2. Improve a problem

- **Add evidence, prior art, or a requirement** by commenting on the problem's issue.
- **Or edit the doc directly:** open the file in `problems/`, click the pencil icon, and GitHub will walk
  you through a pull request. Bump `last_reviewed` to today's date.

## 3. Claim a problem

1. **Open a [Claim issue](https://github.com/sirtthe9th/problems-worth-solving/issues/new?template=2-claim.yml)**
   that names the problem and your approach.
2. A maintainer labels the problem `status: claimed` and links your claim.
3. **Claims don't lock a problem.** Someone else can propose a different approach to the same problem.
   Each approach gets its own solution folder.
4. **Post an update at least every 60 days.** A claim with no activity for 60 days is marked `paused`
   and the problem is open to new claims (see [GOVERNANCE.md](GOVERNANCE.md#claims)).

## 4. Build a solution

1. **Fork** this repository (or, if you're a collaborator, make a branch).
2. Create `solutions/NNNN-short-slug/`, where `NNNN` is the problem's id.
3. Copy [`templates/solution-proposal.md`](templates/solution-proposal.md) into it as `SOLUTION.md` and
   fill it in, following [the solution framework](#the-solution-framework) below.
4. Put the work itself in the same folder: code, a volunteer playbook, flyers, scripts, whatever the
   solution is. Add a `README.md` there if the solution has code that needs setup instructions.
5. Run `npm install` and then `npm run index` to update the index tables, and `npm run check` to validate.
6. **Open a pull request** and fill in the checklist. A maintainer reviews every pull request.

Your first pull request is a proposal: an honest `SOLUTION.md` with `status: proposed` and gaps marked
`[to confirm]` is welcome. You don't need to have built anything yet.

## Writing rules

These apply to everything in the repo.

- **Facts or blanks.** Every claim cites a source (a link, a report, first-hand experience described by
  role) or is marked `[to confirm]`. Every `[to confirm]` is repeated in the doc's Gaps or Open
  questions list.
- **Roles, not names.** "Volunteer driver", "clinic receptionist", "parent of a child at…". Never name
  or identify a private person. Public organizations can be named.
- **Problem docs describe the problem.** They don't prescribe a solution, so different approaches can
  compete.
- **Plain language.** Write for someone outside the field. Explain any acronym the first time.
- **No money asks.** See [SAFETY.md](SAFETY.md).

## The solution framework

Every `SOLUTION.md` follows the same framework, so anyone can pick up a solution and understand it
without having to ask. **Each level builds on the one before it.**

| # | Level | In one line | The question it answers |
|---|---|---|---|
| 1 | **Subject matter context** | Know the field | What would anyone working in this area need to know? |
| 2 | **Specific context** | Know this situation | How does the problem actually play out for *these* people, in *this* place? |
| 3 | **The users** | Know the people | Who does this serve, and who will run it? What are they like? |
| 4 | **Access** | Be able to get in | Which systems, places and resources does it depend on, and who grants and removes access? |
| 5 | **Solution steps** | Do it | Starting from what inputs, taking what actions, producing what outputs, and reaching what goal? |

Around the steps sit four questions the steps alone don't answer: the **trigger** (what starts it),
**who does it** (does, approves, is consulted, is told), the **check** (how you know it worked), and
**when it goes wrong**.

You need the field and the situation together before you can design for the users. You need to know the
users before you know what access to ask for. And you need access before the steps can run.

### Where this comes from

These are established ideas from other fields, and they're useful vocabulary if you're talking to a
funder, an IT team or a partner organization.

| Level | Term | What it adds |
|---|---|---|
| 1–2 | [Knowledge, Skills and Abilities](https://onetcenter.org/content.html) (O\*NET) | The split between general field knowledge and job-specific knowledge |
| 2 | [Tacit vs. explicit knowledge](https://en.wikipedia.org/wiki/SECI_model_of_knowledge_dimensions) (SECI) | Why level 2 is the hard one: much of "how it works here" lives in people's heads |
| 4 | [Least privilege](https://csrc.nist.gov/glossary/term/least_privilege) (NIST) | Ask for the lowest access that works |
| 4 | [Role-based access control](https://csrc.nist.gov/glossary/term/role_based_access_control) (NIST) | Access attaches to roles, not people |
| 5 | [SIPOC](https://en.wikipedia.org/wiki/SIPOC) | Who supplies each input and who receives each output |
| 5 | [IDEF0](https://en.wikipedia.org/wiki/IDEF0) | Inputs, controls, outputs and mechanisms for each step |
| Around | [RACI](https://en.wikipedia.org/wiki/Responsibility_assignment_matrix) | Responsible, accountable, consulted, informed |
| Around | [Exit criteria](https://www.6sigma.us/six-sigma-in-focus/exit-criteria/) | A written test for "this is done" |

A `SOLUTION.md` counts as complete when levels 1–5 each meet the *Complete when* test written under them
in the template.

## Pull request rules

- **One problem or one solution per pull request.**
- **Fill in the checklist** in the pull request template.
- **Don't edit someone else's solution folder** without the solution lead's agreement in the pull
  request thread.
- **Every pull request needs a maintainer's approval** and a passing `validate` check before it can be
  merged.
- **Code in solutions** must not include secrets, API keys, or real personal data, including in test
  fixtures.

## Running the checks locally

```sh
npm install
npm run index   # rebuild the tables in problems/README.md and solutions/README.md
npm run check   # fail if any frontmatter is invalid or an index is out of date
npm run lint    # markdown style
```

## Using an AI assistant

You're welcome to. The rules for AI-assisted contributions are in [AGENTS.md](AGENTS.md), and you are
responsible for everything you submit.
