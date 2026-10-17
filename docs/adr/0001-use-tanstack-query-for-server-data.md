# 1. Use TanStack Query for fetching server data

- **Status:** Accepted
- **Date:** 2026-10-17

## Context

The frontend loads all of its data from the backend REST API. Each page did this by hand with `useState` and `useEffect`:

```tsx
const [exercise, setExercise] = useState<Exercise | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
    getExerciseById(Number(id))
        .then(setExercise)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
}, [id]);
```

This caused several problems that would get worse as more pages were added:

1. **Duplicated code.** Every page repeated the same 10–15 lines of loading/error/data state. The copies drifted apart; for example, some reset `loading` when inputs changed and some didn't.
2. **No caching.** Navigating list → detail → back refetched the list and showed a loading state again, even though the data had just been loaded.
3. **Race conditions.** In `ExerciseDetail`, if `id` changed while a request was in flight, whichever response arrived last was shown. That could be the *previous* exercise, so the page showed different data from what the URL said. Fixing this by hand needs a cleanup function with an "ignore" flag in every effect.
4. **Missing behaviour.** Retrying temporary failures, refetching stale data, deduplicating identical requests, and updating other pages after a save would all have had to be written by hand.

The React documentation also notes that fetching directly in effects doesn't scale well, and recommends a data-fetching library for anything beyond simple cases.

## Decision

Use **[TanStack Query](https://tanstack.com/query)** (`@tanstack/react-query`) for all data that comes from the backend.

- A single `QueryClient` in `main.tsx` holds the cache for the whole app.
- Reads use `useQuery`; writes (create/update/delete) use `useMutation`, which invalidates affected queries so other pages refetch fresh data.
- Each feature exposes small hooks (e.g. `useExercises()`, `useExercise(id)`) that wrap `useQuery` around the functions in its `api.ts`. Pages call the hooks, not `useQuery` directly.
- Defaults: `staleTime` of 30 seconds, and retries only for network/5xx errors, not 4xx (a 404 won't fix itself).
- `useState` is still used for **UI state** that lives only in the browser (form inputs, search text, toggles). TanStack Query is only for **server state**: data whose source of truth is the backend.

## Alternatives considered

| Option | Why not |
|---|---|
| **Keep `useEffect` + `useState`** | Works for one simple page, but every problem above would need a hand-written fix on every page. |
| **A custom `useFetch` hook** | Removes the duplication, but we'd still have to build caching, race-condition handling, retries and invalidation ourselves, which is effectively a worse version of TanStack Query. |
| **SWR** (by Vercel) | Similar idea and smaller, but its support for mutations and cache invalidation is more limited, and it has less tooling. TanStack Query is more widely used for apps with significant create/update flows. |
| **RTK Query** (Redux Toolkit) | Comparable features, but requires adopting Redux. The app has no global client-side state that would justify Redux. |
| **React Router data loaders** | Fetching tied to routes is useful, but it doesn't provide a shared cache across pages or mutation-driven invalidation by itself. It can be combined with TanStack Query later if needed. |

## Consequences

**Positive**
- Pages become shorter: loading/error/data comes from one hook call.
- Cached data shows instantly when you navigate back; it's refreshed in the background.
- Race conditions are avoided, because results are stored per query key (`["exercises", 1]` and `["exercises", 2]` are separate entries).
- Retries, deduplication and refetch-on-focus come built in.
- After a save, invalidating the relevant query keys keeps every page consistent.
- The React Query Devtools show every query and its state during development.

**Negative**
- An extra dependency (~13 kB gzipped) that has to be kept up to date.
- New concepts to learn: query keys, stale vs. fresh data, invalidation.
- Cached data can briefly be out of date (up to `staleTime`). Mutations must invalidate the right keys, or a page can show old data until it refetches.
