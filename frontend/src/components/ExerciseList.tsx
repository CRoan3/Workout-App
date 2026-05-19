import { useEffect, useState } from "react";
import { type Exercise, getExercises } from "../api/exerciseAPI";

// Displays the list of exercises from the backend
export default function ExerciseList() {
    const [exercises, setExercises] = useState<Exercise[]>([]);     //stores exercises returned from API in an array
    const [loading, setLoading] = useState(true);                   //tracks if data is still loading
    const [error, setError] = useState("");                         //stores error messages

    // runs once on init component load
    useEffect(() => {
        getExercises()
            .then((data) => {
                setExercises(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Error loading exercises.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading exercises...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <section>
            <h2>Exercises</h2>

            {exercises.length === 0 ? (
                <p>No exercises found.</p>
            ) : (
                <ul>
                    {exercises.map((exercise) => (
                    <li key={exercise.id}>
                        <h3>{exercise.name}</h3>
                        <p>{exercise.description}</p>
                    </li>
                    ))}
                </ul>
            )}

        </section>
    );


}