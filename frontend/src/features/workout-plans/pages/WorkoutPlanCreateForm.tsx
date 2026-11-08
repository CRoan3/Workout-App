import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateWorkoutPlan } from "../queries";

// Form for creating a new workout plan
export default function WorkoutPlanCreateForm() {
    const navigate = useNavigate();
    const createPlan = useCreateWorkoutPlan();    // gives us mutate(), isPending and error for the save

    // form input state
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();    // prevents browser from refreshing the page

        createPlan.mutate(
            { name, description },
            {
                // after creation, go to the new workout plan's detail page
                onSuccess: (workoutPlan) => navigate(`/workout-plans/${workoutPlan.id}`),
            }
        );
    }

    return (
        <section>
            <Link to="/workout-plans" className="back-link">← Back to workout plans</Link>
            <h2>Create Workout Plan</h2>

            {createPlan.error && <p className="error">{createPlan.error.message}</p>}

            <form onSubmit={handleSubmit} className="panel">
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" value={name} onChange={(event) => setName(event.target.value)} required />
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} />
                </div>

                <button type="submit" disabled={createPlan.isPending}>
                    {createPlan.isPending ? "Saving..." : "Create Workout Plan"}
                </button>
            </form>
        </section>
    );
}
