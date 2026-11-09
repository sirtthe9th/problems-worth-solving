<!-- purpose: Who decides what in the hub: the roles, how a problem moves through its statuses and labels, what gets accepted or declined, how claims and expiry work, and the moderation tools maintainers use. -->

# Governance

## Roles

| Role | Who | Can |
|---|---|---|
| **Maintainer** | The repository owner (currently [@sirtthe9th](https://github.com/sirtthe9th)) | Triage and label issues, accept or decline problems, review and merge every pull request, enforce the Code of Conduct and SAFETY.md |
| **Solution lead** | Whoever claimed a problem and opened its solution folder | Decide the direction of their solution, and agree or refuse changes to their folder |
| **Contributor** | Anyone | Submit and improve problems, comment, propose solutions, contribute to a solution with the lead's agreement |

## Lifecycle

### Problems

| Status | Where it lives | Meaning |
|---|---|---|
| `status: proposed` | Issue | Submitted, waiting for triage |
| `needs-info` | Issue | The maintainer asked a question. Closed after 30 days with no reply |
| `status: accepted` | Issue + `problems/NNNN-slug.md` | Triaged and written up as a requirements doc |
| `status: claimed` | Both | At least one solution lead is working on it |
| `status: in-progress` | Both | A solution is being built or piloted |
| `status: shipped` | Both | At least one solution is live |
| `declined` · `duplicate` · `stale` | Closed issue | Not taken forward, with the reason in a comment |

The `status` field in a problem doc's frontmatter mirrors the label: `accepted`, `claimed`,
`in-progress`, `shipped`, or `archived` (no longer relevant).

### Solutions

`proposed` → `building` → `piloting` → `live`, or `paused` / `retired`. The solution lead keeps the
`status` field in `SOLUTION.md` current.

### Other labels

- **Type:** `type: social`, `type: technical`, `type: hybrid`
- **Help:** `good first issue`, `help wanted`
- **Moderation:** `spam`, `safety-review`

## Triage: what gets accepted

A problem is accepted when it:

1. **Is real.** There's evidence, or a credible first-hand account.
2. **Affects a group of people**, not one person's private situation.
3. **Can be described without identifying a private individual.**
4. **Isn't already solved well.** If a good solution exists, the issue is closed with a link to it.
5. **Is safe to work on in public.** See [SAFETY.md](SAFETY.md).

A declined problem always gets a one-line reason. "Not a fit for this hub" is a reason; silence isn't.

## Claims

- A claim names the problem, the approach and the solution lead.
- **Claims don't lock a problem.** Different approaches to the same problem can run side by side, each
  in its own solution folder.
- **A claim lapses after 60 days with no activity** (no commit, comment or status update). The maintainer
  comments first, waits 14 days, then marks the solution `paused` and reopens the problem to new claims.
  A paused solution lead can pick it back up at any time.

## Decisions and disputes

- Day-to-day decisions are made in the open, in the issue or pull request.
- Within a solution folder, the solution lead decides. Outside it, the maintainer decides.
- A disagreement that can't be settled in the thread goes to the maintainer, whose decision is final.
- Changes to this file, [SAFETY.md](SAFETY.md) or [CONTRIBUTING.md](CONTRIBUTING.md) are made by pull
  request, and stay open for at least 7 days for comment unless they fix an urgent safety problem.

## Moderation tools

Maintainers use GitHub's built-in tools, in roughly this order:

1. **Hide** a comment that breaks the rules (marked as spam, abuse, off-topic or outdated).
2. **Lock** a conversation that has become heated.
3. **[Interaction limits](https://docs.github.com/en/communities/moderating-comments-and-conversations/limiting-interactions-in-your-repository)**:
   temporarily restrict the whole repository to prior contributors or collaborators during a wave of
   abuse.
4. **[Block](https://docs.github.com/en/communities/maintaining-your-safety-on-github/blocking-a-user-from-your-personal-account)**
   a user, temporarily or permanently.
5. **[Report](https://docs.github.com/en/communities/maintaining-your-safety-on-github/reporting-abuse-or-spam)**
   the account to GitHub.

Enforcement follows the ladder in the [Code of Conduct](CODE_OF_CONDUCT.md#enforcement-guidelines):
correction, warning, temporary ban, permanent ban. A scam, an attempt to reach vulnerable people, or
doxxing skips straight to a permanent ban.

## Repository protections

- Every change to `main` goes through a pull request with a maintainer's approval and a passing
  `validate` check. No force-pushes.
- Workflows from first-time and outside contributors need a maintainer's approval to run.
- Secret scanning with push protection and private vulnerability reporting are on.

## Growing past one maintainer

While there is one maintainer, every pull request goes through them. When solutions need their own
reviewers, the plan is:

1. Move the repository to a free GitHub organization.
2. Give each active solution a team, with its solution lead as maintainer.
3. Add a line per solution folder to `.github/CODEOWNERS`, so a solution's team reviews its own code and
   the hub's maintainers review everything else.

A solution that outgrows the hub can also **graduate** to its own repository. Its `SOLUTION.md` stays
here, with the link.
