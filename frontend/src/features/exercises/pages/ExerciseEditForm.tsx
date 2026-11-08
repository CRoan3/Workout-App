import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getExerciseById, updateExercise, type Exercise } from "../api";
import { idFromSlug, toSlug } from "@/lib/slug";

// Form for editing an existing exercise
export default function ExerciseEditForm() {
    const { slug } = useParams();     // e.g. "1-flat-bench-press"
    const id = idFromSlug(slug);      // e.g. 1
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
        if (Number.isNaN(id)) {
            setError("No valid exercise ID provided.")
            setLoading(false);
            return;
        }

        getExerciseById(id)
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

        if (Number.isNaN(id)) {
            setError("No valid exercise ID provided.");
            return;
        }

        setSaving(true);
        setError("");

        try {
            const updatedExercise = await updateExercise(id, {
                name,
                description,
                url
            });
            // build the URL from the saved name, since a rename changes it
            navigate(`/exercises/${toSlug(updatedExercise.id, updatedExercise.name)}`);
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
        return <p className="error">{error}</p>
    }

    return (
        <section>
            <Link to={`/exercises/${slug}`} className="back-link">← Back to exercise</Link>
            <h2>Edit Exercise</h2>

            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit} className="panel">
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