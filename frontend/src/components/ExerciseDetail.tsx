import { useEffect, useState } from "react";
import { useParams, Link} from "react-router-dom";
import { getExercisesById, type Exercise } from "../api/exerciseAPI";


//displays details for a single exercise
export default function ExerciseDetail() {
    const {id} = useParams();

    const [exercise, setExercise] = useState<Exercise | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    //loads the exercise when the page opens or when the URL id changes
    useEffect(() => {
        if (!id) return;

        getExercisesById(Number(id))
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

    if (!id) {
        return <p>No exercise ID provided.</p>;
    }

    if (loading) {
        return <p>Loading exercise...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!exercise) {
        return <p>Exercise not found.</p>;
    }
    //note: capital L for router links
    return (
        <section>
            <Link to="/exercises">← Back to exercises</Link>    
            <h2>{exercise.name}</h2>
            <p>{exercise.description ?? "No description available."}</p>

            {exercise.url && (
                <p>
                    <a href={exercise.url} target="_blank" rel="noreferrer">
                        View demo video
                    </a>
                </p>
            )}

            <small>Exercise ID: {exercise.id}</small>
        </section>
    )
}