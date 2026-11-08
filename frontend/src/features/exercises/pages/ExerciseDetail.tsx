import { useEffect, useState } from "react";
import { useParams, useNavigate, Link} from "react-router-dom";
import { getExerciseById, type Exercise } from "../api";
import { idFromSlug, toSlug } from "@/lib/slug";


//displays details for a single exercise
export default function ExerciseDetail() {
    const { slug } = useParams();        // e.g. "1-flat-bench-press"
    const id = idFromSlug(slug);         // e.g. 1
    const navigate = useNavigate();

    const [exercise, setExercise] = useState<Exercise | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    //loads the exercise when the page opens or when the URL id changes
    useEffect(() => {
        if (Number.isNaN(id)) return;

        getExerciseById(id)
            .then((data) => {
             setExercise(data);
        })
        .catch(() => {
            setError("Could not load exercise.");
        })
        .finally(() => {
            setLoading(false);
        });
    }, [id]);

    // If the URL has an old or missing name (e.g. /exercises/1, or the exercise was renamed), swap in the current one
    // replace: true so the Back button doesn't return to the outdated URL
    useEffect(() => {
        if (!exercise) return;

        const correctSlug = toSlug(exercise.id, exercise.name);
        if (slug !== correctSlug) {
            navigate(`/exercises/${correctSlug}`, { replace: true });
        }
    }, [exercise, slug, navigate]);

    if (Number.isNaN(id)) {
        return <p>No exercise ID provided.</p>;
    }

    if (loading) {
        return <p>Loading exercise...</p>;
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    if (!exercise) {
        return <p>Exercise not found.</p>;
    }
    //note: capital L for router links
    return (
        <section>
            <Link to="/exercises" className="back-link">← Back to exercises</Link>

            <div className="page-header">
                <h2>{exercise.name}</h2>
                <Link to={`/exercises/${toSlug(exercise.id, exercise.name)}/edit`} className="button secondary">Edit Exercise</Link>
            </div>

            <section className="panel">
                <p>{exercise.description ?? "No description available."}</p>

                {exercise.url && (
                    <p>
                        <a href={exercise.url} target="_blank" rel="noreferrer">
                            View demo video
                        </a>
                    </p>
                )}
            </section>

            <section className="panel">
                <h3>Tips</h3>

                {exercise.tips.length === 0 ? (
                    <p className="muted">No tips available.</p>
                ) : (
                    <ol>
                        {exercise.tips.map((tip) => (
                            <li key={`${tip.sortOrder}-${tip.tip}`}>{tip.tip}</li>
                        ))}
                    </ol>
                )}
            </section>

            <section className="panel">
                <h3>Tags</h3>

                {exercise.tags.length === 0 ? (
                    <p className="muted">No tags available.</p>
                ) : (
                    <ul className="tag-list">
                        {exercise.tags.map((tag) => (
                            <li key={tag}>{tag}</li>
                        ))}
                    </ul>
                )}
            </section>

            <small className="muted">Exercise ID: {exercise.id}</small>
        </section>
    )
}
