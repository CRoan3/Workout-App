# Frontend

React 19 + TypeScript app built with Vite. For how to install and run it, see the [root README](../README.md).

## Folder structure

The code is organized **by feature**, not by file type. Everything belonging to one feature (its API calls, pages and feature-specific components) lives together under `src/features/<feature>/`.

```
src/
├── App.tsx              Route definitions
├── main.tsx             Entry point; mounts <App />
├── lib/                 Shared infrastructure, no UI (e.g. apiClient.ts)
├── components/          Shared UI used by more than one feature (e.g. Layout.tsx)
├── pages/               App-level pages that belong to no feature (e.g. NotFound.tsx)
└── features/
    ├── exercises/
    │   ├── api.ts       API calls + TypeScript types for this feature
    │   ├── pages/       Route-level screens (one per route)
    │   └── components/  Pieces reused within this feature (created when needed)
    └── workout-plans/
        └── ...          Same layout as above
```

### Where does a new file go?

| You're adding...                                        | Put it in                          |
|---------------------------------------------------------|------------------------------------|
| A screen that a route renders                           | `features/<feature>/pages/`        |
| A component used only inside one feature                | `features/<feature>/components/`   |
| A call to a backend endpoint, or a type it returns      | `features/<feature>/api.ts`        |
| A component used by several features (button, card...)  | `components/`                      |
| Non-UI code shared across the app (API client, helpers) | `lib/`                             |
| A page not tied to any feature (404, home)              | `pages/`                           |

If something starts out feature-specific and later gets used by a second feature, move it up to `components/` or `lib/`.

## Talking to the backend

All HTTP calls go through `apiRequest` in [`src/lib/apiClient.ts`](src/lib/apiClient.ts). Components never call `fetch` directly.

```ts
// features/exercises/api.ts
export function getExerciseById(id: number): Promise<Exercise> {
    return apiRequest<Exercise>(`/api/exercises/${id}`);
}

export function createExercise(exercise: ExerciseRequest): Promise<Exercise> {
    return apiRequest<Exercise>("/api/exercises", {
        method: "POST",
        body: JSON.stringify(exercise),
    });
}
```

`apiRequest`:

- Prefixes the path with `VITE_API_BASE_URL`. **Paths must start with `/`**, or the URL comes out as `http://localhost:8080api/...`.
- Sets `Content-Type: application/json` only when there's a request body.
- Throws an **`ApiError`** for any non-2xx response. `error.status` is the HTTP status, and `error.message` is the backend's human-readable `detail` (see "Error responses" in the root README).
- Returns `undefined` for `204 No Content`.

Each feature's `api.ts` also defines TypeScript types that mirror the backend DTOs (e.g. `Exercise` ↔ `ExerciseResponseDTO`). When a DTO changes, update the matching type. Fields that can be `null` in the database should be typed `string | null`, not `string`.

### Handling errors in components

Show the real error message instead of replacing it with a generic one:

```tsx
.catch((err: Error) => {
    console.error(err);
    setError(err.message);
});
```

## Routing

Routes are defined in [`App.tsx`](src/App.tsx). They are all nested inside a pathless **layout route** that renders [`Layout`](src/components/Layout.tsx) (header + nav), and the matched page renders where `Layout` places `<Outlet />`. The last route, `path="*"`, catches unknown URLs and shows `NotFound`.

## Environment variables

| Variable            | Purpose             | Set in             |
|---------------------|---------------------|--------------------|
| `VITE_API_BASE_URL` | Backend base URL    | `.env.development` |

- Only variables prefixed with `VITE_` are exposed to browser code.
- Vite reads `.env` files at startup, so **restart `npm run dev`** after changing one.
- For personal overrides, create `.env.development.local`. `*.local` files are git-ignored.
- Never put secrets in these files. Everything in them ends up in the JavaScript sent to the browser.

## Adding a new feature (checklist)

1. Create `src/features/<feature>/` with `api.ts` and `pages/`.
2. In `api.ts`, add types that mirror the backend DTOs and one function per endpoint, using `apiRequest`.
3. Build the pages in `pages/`.
4. Register the routes in `App.tsx`, inside the `Layout` route and above the `*` catch-all.
5. Add a `NavLink` in `Layout.tsx` if the feature needs a top-level nav entry.
6. Run `npm run build` (type-check + build) and `npm run lint`.
