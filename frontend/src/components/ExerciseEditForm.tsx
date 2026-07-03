import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getExercisesById, updateExercise, type Exercise } from "../api/exerciseAPI";

// Form for editing an existing exercise
export default function ExerciseEditForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [exercise, setExercise] = useState<Exercise | null>(null);

    //Form input state
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [url, setUrl] = useState("");

    // UI state
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // Load the current exercise data so the form can be prefilled
    useEffect(() => {
        if (!id) {
            setError("No valid exercise ID provided.")
            setLoading(false);
            return;
        }

        getExercisesById(Number(id))
        .then((data) => {        //populating form with exercise data
            setExercise(data);
            setName(data.name);
            setDescription(data.description ?? "");
            setUrl(data.url ?? "");
            setLoading(false);
        })
        .catch(() => {
            setError("Could not load exercise.");
            setLoading(false);
        })
    }, [id]);

    // Submit updated exercise data to the backend
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!id) {
            setError("No valid exercise ID provided.");
            return;
        }

        setSaving(true);
        setError("");

        try {
            const updatedExercise = await updateExercise(Number(id), {
                name,
                description,
                url
            });
            navigate(`/exercises/${updatedExercise.id}`);
        } catch {
            setError("Could not update exercise.")
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return <p>Loading exercise...</p>;
    }

    if (error && !exercise) {
        return <p>{error}</p>
    }

    return (
        <section>
            <Link to={`/exercises/${id}`}>← Back to exercise</Link>
            <h2>Edit Exercise</h2>

            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required />
                </div>

                <div>
                    <label htmlFor="description">Description</label>
                    <textarea id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}></textarea>
                </div>

                <div>
                    <label htmlFor="url">Video URL</label>
                    <input id="url"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)} />
                </div>

                <button type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Save changes"} 
                </button>
            </form>

        </section>
    )

}