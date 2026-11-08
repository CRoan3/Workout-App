import { Link, useParams } from "react-router-dom";
import { useWorkoutPlan } from "../queries";

// Displays details for a single workout plan
export default function WorkoutPlanDetail() {
    const { id } = useParams();
    const planId = Number(id);
    const { data: workoutPlan, isPending, error } = useWorkoutPlan(planId);

    if (isPending) {
        return <p>Loading workout plan...</p>;
    }

    if (error) {
        return <p className="error">{error.message}</p>;
    }

    return (
        <section>
            <Link to="/workout-plans" className="back-link">← Back to workout plans</Link>
            <h2>{workoutPlan.name}</h2>

            <section className="panel">
                <p>{workoutPlan.description ?? "No description available."}</p>
            </section>

            <section className="panel">
                <h3>Workout Days</h3>
                {/* The backend has no endpoints for workout days yet; this section fills in once it does */}
                <p className="muted">No workout days yet.</p>
            </section>

            <small className="muted">
                Created {new Date(workoutPlan.createdAt).toLocaleDateString()}
                {" · "}
                Last updated {new Date(workoutPlan.updatedAt).toLocaleDateString()}
            </small>
        </section>
    );
}
