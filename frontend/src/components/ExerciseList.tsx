import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { type Exercise, getExercises } from "../api/exerciseAPI";

// Displays the list of exercises from the backend. We will include filtering here until our exercise compendium grows
export default function ExerciseList() {
    const [exercises, setExercises] = useState<Exercise[]>([]);     //stores exercises returned from API in an array
    const [loading, setLoading] = useState(true);                   //tracks if data is still loading
    const [error, setError] = useState("");                         //stores error messages
    const [searchTerm, setSearchTerm] = useState("");

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

    const search = searchTerm.toLowerCase();

    const filteredExercises = exercises.filter((exercise) => {
            const nameMatches = exercise.name.toLowerCase().includes(search);

            const descriptionMatches = exercise.description?.toLowerCase().includes(search) ?? false;

            const tagMatches = exercise.tags.some((tag) => 
                tag.toLowerCase().includes(search)
            );
        
            return nameMatches || descriptionMatches || tagMatches;
        });

    return (
        <section>
            <h2>Exercises</h2>
            <div>
                <input 
                type="text"
                placeholder="Search exercises..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)} />
            </div>

            <Link to="/exercises/new">Create New Exercise</Link>

            {filteredExercises.length === 0 ? (
                <p>No exercises found.</p>
            ) : (
                <ul>
                    {filteredExercises.map((exercise) => (
                    <li key={exercise.id}>
                        <h3>
                            <Link to={`/exercises/${exercise.id}`}>{exercise.name}</Link>
                        </h3>
                        <p>{exercise.description}</p>
                    </li>
                    ))}
                </ul>
            )}

        </section>
    );


}