# Architecture Decision Records

Each file here records one significant technical decision: the context, what was decided, the alternatives considered, and the trade-offs. They explain *why* the code looks the way it does.

| #    | Decision                                                              | Status   |
|------|-----------------------------------------------------------------------|----------|
| 0001 | [Use TanStack Query for fetching server data](0001-use-tanstack-query-for-server-data.md) | Accepted |

## Writing a new ADR

1. Copy the most recent ADR and give it the next number: `0002-short-title.md`.
2. Fill in **Context** (the problem), **Decision**, **Alternatives considered** and **Consequences** (positive and negative).
3. Add it to the table above.

ADRs aren't edited after they're accepted. If a decision changes, write a new ADR that supersedes the old one, and set the old one's status to `Superseded by 000N`.
