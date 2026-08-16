import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createWorkoutPlan, type WorkoutPlanCreateRequest } from "../api/workoutPlans";

export default function WorkoutPlanCreateForm() {
    const [name, setName] = useState("");          // Stores the current value of the workout plan name textbox
    const [description, setDescription] = useState("");     // Stores the current value of the description textbox
    const navigate = useNavigate();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();    //prevents browser from refreshing the page

        const request: WorkoutPlanCreateRequest = {
            name,
            description
        };

        try {
            const workoutPlan = await createWorkoutPlan(request);

            navigate(`/workout-plans/${workoutPlan.id}`);
        } catch (error) {
            console.error(error);
            alert("Failed to create workout plan.")
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Create Workout Plan</h2>
            <div>
                <label>Name</label>

                <br />

                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                />
            </div>

            <br />

            <div>
                <label>Description</label>
                <br />
                <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <br />

            <button type="submit">
                Create Workout Plan
            </button>

        </form>
    );
}