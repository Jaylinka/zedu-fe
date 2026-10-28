Summary / Description
Rewrite the Problem section on the /about page to add education-specific urgency and stakes. Current copy uses generic complaints ("messages got buried", "discussions became messy") that apply to any chat tool, not unique to learning environments. The section lacks a clear transition from problem to why Zedu specifically.

Why is this ticket needed? (Required)
The Problem section is a key part of the awareness/consideration journey on /about. Without education-specific stakes, prospective educators and institutions don't feel the urgency to switch from general chat tools. The current copy weakens the case for Zedu by failing to articulate what happens when structure is missing and why Zedu is the right solution.

Details (proposed Idea)
Replace the current Problem section copy:

Current:
"Modern learning programs were forced to rely on tools built for workplaces or social chat. Important messages got buried. Cohort discussions became messy. Structure was missing. We built Zedu to give educators a workspace designed specifically for organized learning where every channel, cohort, and conversation has purpose."

Proposed:
"General chat tools weren't built for learning. When announcements, assignment questions, and cohort chatter all live in one noisy feed, students disengage and instructors spend more time managing the conversation than teaching.

Zedu replaces that chaos with dedicated channels per subject and lets educators control permissions. AI helps with moderation, so the community stays organized as it grows."

Steps to reproduce (for bugs)
N/A — copy improvement, not a bug.

Acceptance criteria

- [ ] Problem section copy rewritten with education-specific urgency as specified above
- [ ] Copy clearly states the stakes (students disengage, instructors spend more time managing conversation than teaching)
- [ ] Clear transition from problem ("General chat tools weren't built for learning") to solution ("Zedu replaces that chaos...")
- [ ] No changes to hero section or CTA hierarchy (those are separate tickets)
- [ ] Copy passes Prettier formatting, ESLint, and TypeScript checks (`pnpm check-format`, `pnpm check-lint`, `pnpm check-types`)
- [ ] Production build succeeds (`pnpm build`)
- [ ] No hardcoded public URLs or client-side identifiers
- [ ] `.env` and secrets are not committed
