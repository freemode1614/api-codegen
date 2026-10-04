---
status: Proposed          # Proposed | Accepted | Rejected | Superseded
date: YYYY-MM-DD
deciders: <github-handles>
consulted: <github-handles>     # optional
informed: <github-handles>      # optional
supersedes: []                  # list of ADR numbers, optional
superseded_by:                  # filled when status becomes Superseded
---

# NNNN. Short, declarative title

<!--
Replace NNNN with the next four-digit number. See .github/ADR/README.md for
numbering rules.

The title should state the decision, not the topic.
Good: "Adopt Changesets for release management"
Bad:  "Release management"
-->

## Context and problem statement

<!--
Describe the forces at play in 2–3 paragraphs. Include:

- The current state of affairs.
- The decision driver (user pain, incident, new requirement, regulatory…).
- Any constraints: deadlines, compatibility, peer-dependency contracts.

End with a concise question that the decision must answer, e.g.:

  > Which release workflow should we adopt to ship bug fixes within 24 h
  > without breaking downstream Vite users?
-->

## Considered options

<!--
List the realistic options. Typically 2–4. For each:

- One-line summary.
- Pros (with evidence: benchmarks, prior art, internal data).
- Cons (be honest).
- Cost estimate if relevant (lines of code, learning curve, ongoing ops).
-->

### Option A — …

- **Pros**: …
- **Cons**: …

### Option B — …

- **Pros**: …
- **Cons**: …

### Option C — No change (status quo)

- **Pros**: …
- **Cons**: …

## Decision outcome

<!--
State the chosen option and *why*, in one paragraph. Reference the option
letter from above. If the decision is conditional, state the trigger that
would revisit it.
-->

Chosen option: **"Option X"**, because …

### Consequences

<!--
Be explicit about both positive and negative consequences. Group them by
area (users, maintainers, build, docs, etc.) so reviewers can spot scope
creep early.

Use concrete language — "Every PR will require …" is more useful than
"PRs may become harder".
-->

**Positive**

- …

**Negative**

- …

**Neutral**

- …

## Implementation plan

<!--
If useful, list the concrete steps that turn the decision into reality.
Delete this section if it duplicates the PR description.
-->

1. …
2. …
3. …

## Validation

<!--
How will we know the decision worked? Examples:

- Specific metric (release latency < 24 h, bundle size < X kB).
- A follow-up review date (e.g. "Re-evaluate after 6 months").
- An explicit kill criterion that would trigger a new ADR.
-->

- …

## References

<!--
Links to relevant issues, prior art, RFCs, benchmarks, internal docs.

- …

<!--
NOTE: This template is based on the MADR (Markdown Any Decision Record)
project and the AWS prescriptive guidance, with simplifications for
microsoft/TypeScript-style projects.
-->
