-- Keep workout_plans.updated_at current (function defined in V1)
CREATE TRIGGER trg_workout_plans_updated_at
BEFORE UPDATE ON workout_plans
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
