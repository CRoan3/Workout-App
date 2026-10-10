# Workout App

A full-stack workout planning app. Build a library of exercises (with tags and coaching tips), then assemble them into workout plans made up of ordered workout days.

## Tech stack

| Layer    | Tech                                                   |
|----------|--------------------------------------------------------|
| Frontend | React 19, TypeScript, Vite, React Router               |
| Backend  | Spring Boot 4 (Java 17), Spring Data JPA / Hibernate   |
| Database | PostgreSQL 16, schema managed by Flyway                 |

## Project structure

```
.
├── frontend/          React + Vite app (runs on :5173)
└── backend/           Spring Boot REST API (runs on :8080)
    └── src/main/resources/db/migration/   Flyway migrations (V1__, V2__, ...)
```

## Prerequisites

- JDK 17 or newer
- Node.js 20.19+ or 22.12+
- PostgreSQL 16

## Getting started

### 1. Create the database

Create an empty database named `Workout_Tracker` (e.g. in pgAdmin, or `createdb -U postgres Workout_Tracker`).

You don't need to create any tables: Flyway builds the full schema automatically the first time the backend starts.

The backend connects as `postgres` / `postgres` by default; see `backend/src/main/resources/application.properties`.

### 2. Run the backend

```bash
cd backend
./mvnw spring-boot:run        # Windows: .\mvnw.cmd spring-boot:run
```

Check it's up: http://localhost:8080/health should return `OK`.

### 3. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173.

## Database migrations

The schema is versioned with [Flyway](https://documentation.red-gate.com/flyway). Migrations live in `backend/src/main/resources/db/migration/` and run automatically on backend startup.

To change the schema:

1. Add a new file with the next version number, e.g. `V4__add_something.sql` (capital `V`, two underscores).
2. Restart the backend.

Never edit a migration that has already been applied; Flyway checksums each file and will refuse to start. Make changes in a new migration instead. Don't change the schema by hand in pgAdmin either.

## API overview

| Method | Endpoint                                   | Description                    |
|--------|--------------------------------------------|--------------------------------|
| GET    | `/api/exercises`                           | List exercises                 |
| GET    | `/api/exercises/{id}`                      | Get one exercise               |
| POST   | `/api/exercises`                           | Create an exercise             |
| PUT    | `/api/exercises/{id}`                      | Update an exercise             |
| GET    | `/api/workout-plans`                       | List workout plans             |
| GET    | `/api/workout-plans/{id}`                  | Get one workout plan           |
| POST   | `/api/workout-plans`                       | Create a workout plan          |
| POST   | `/api/workout-days/{dayId}/exercises`      | Add an exercise to a workout day |

### Error responses

Errors use the standard [RFC 9457 Problem Details](https://www.rfc-editor.org/rfc/rfc9457) JSON format, produced by `GlobalExceptionHandler`:

```json
{
  "type": "about:blank",
  "title": "Resource Not Found",
  "status": 404,
  "detail": "Exercise not found with id: 99999",
  "instance": "/api/exercises/99999"
}
```

| Status | When                                                              |
|--------|-------------------------------------------------------------------|
| 400    | Malformed request (invalid JSON, wrong parameter type, e.g. `/api/exercises/abc`) |
| 404    | The requested resource (or one it references) doesn't exist     |
| 500    | Unexpected server error; details are logged server-side, never returned to the client |
