import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createExercise } from "../api/exerciseAPI";


// Form for creating a new exercise
export default function ExerciseCreateForm() {
    const navigate = useNavigate();

    // form input state
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");

    // UI state
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // Handles form submission
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setSaving(true);
        setError("");

        try {
            const createdExercise = await createExercise({
                name,
                description,
                url,
            });

            console.log(createdExercise);  //for checking backend response - REMOVE

            //after creation, go to the new exercise detail page
            navigate(`/exercises/${createdExercise.id}`);
        } catch {
            setError("Could not create exercise.")
        } finally {
            setSaving(false);
        }
    }

    return (
        <section>
            <h2>
                Create Exercise
            </h2>

            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" value={name} onChange={(event) => setName(event.target.value)} required/> 
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
                </div>

                <div>
                    <label htmlFor="url">Video URL</label>
                    <input id="url" value={url} onChange={(event) => setUrl(event.target.value)}/>
                </div>

                <button type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Create Exercise"}
                </button>
        </form>

        </section>
    )
}