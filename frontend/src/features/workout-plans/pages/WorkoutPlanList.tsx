import { useState } from "react";
import { Link } from "react-router-dom";
import { useWorkoutPlans } from "../queries";

// Displays all workout plans from the backend, with a simple search by name or description
export default function WorkoutPlanList() {
    const { data: workoutPlans = [], isPending, error } = useWorkoutPlans();
    const [searchTerm, setSearchTerm] = useState("");    // UI state: stays as useState

    if (isPending) {
        return <p>Loading workout plans...</p>;
    }

    if (error) {
        return <p className="error">{error.message}</p>;
    }

    const search = searchTerm.toLowerCase();

    const filteredPlans = workoutPlans.filter((plan) => {
        const nameMatches = plan.name.toLowerCase().includes(search);
        const descriptionMatches = plan.description?.toLowerCase().includes(search) ?? false;

        return nameMatches || descriptionMatches;
    });

    return (
        <section>
            <div className="page-header">
                <h2>Workout Plans</h2>
                <Link to="/workout-plans/new" className="button">Create New Workout Plan</Link>
            </div>

            <div className="search">
                <input
                    type="text"
                    placeholder="Search workout plans..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)} />
            </div>

            {workoutPlans.length === 0 ? (
                <p className="muted">No workout plans yet. Create one to get started.</p>
            ) : filteredPlans.length === 0 ? (
                <p className="muted">No workout plans match your search.</p>
            ) : (
                <ul className="card-list">
                    {filteredPlans.map((plan) => (
                        <li key={plan.id}>
                            <h3>
                                <Link to={`/workout-plans/${plan.id}`}>{plan.name}</Link>
                            </h3>
                            <p>{plan.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
