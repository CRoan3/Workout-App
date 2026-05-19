CREATE TABLE exercises (
	id BIGSERIAL PRIMARY KEY,
	name text NOT NULL UNIQUE,
	url text,
	description text,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
	);
	
CREATE TABLE tags (
	id BIGSERIAL PRIMARY KEY,
	name TEXT NOT NULL UNIQUE
	);
	
CREATE TABLE exercise_tags (
	exercise_id BIGINT NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
	tag_id BIGINT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
	PRIMARY KEY (exercise_id, tag_id)
	);
	
CREATE INDEX idx_exercise_tags_tag_id ON exercise_tags(tag_id); 

CREATE TABLE exercise_tips (
	id BIGSERIAL PRIMARY KEY,
	exercise_id BIGINT NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
	tip text NOT NULL,
	sort_order INT NOT NULL DEFAULT 1
	);
	
CREATE INDEX idx_exercise_tips_exercise_id ON exercise_tips(exercise_id);

CREATE INDEX idx_exercise_tags_exercise_id ON exercise_tags(exercise_id);

CREATE INDEX idx_exercise_tips_exercise_sort
ON exercise_tips(exercise_id, sort_order);