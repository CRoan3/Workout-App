CREATE TABLE workout_plans (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE workout_days (
    id BIGSERIAL PRIMARY KEY,
    workout_plan_id BIGINT NOT NULL REFERENCES workout_plans(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    day_order INT NOT NULL,
    day_of_week TEXT
);

CREATE INDEX idx_workout_days_plan_id ON workout_days(workout_plan_id);

CREATE TABLE workout_day_exercises (
    id BIGSERIAL PRIMARY KEY,
    workout_day_id BIGINT NOT NULL REFERENCES workout_days(id) ON DELETE CASCADE,
    exercise_id BIGINT NOT NULL REFERENCES exercises(id),
    exercise_order INT NOT NULL,
    sets INT,
    reps TEXT,
    rest_seconds INT,
    notes TEXT
);

CREATE INDEX idx_workout_day_exercises_day_id ON workout_day_exercises(workout_day_id);
CREATE INDEX idx_workout_day_exercises_exercise_id ON workout_day_exercises(exercise_id);
