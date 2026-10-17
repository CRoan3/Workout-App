import { useState } from "react";
import { Link } from "react-router-dom";
import { useExercises } from "../queries";

// Displays the list of exercises from the backend. We will include filtering here until our exercise compendium grows
export default function ExerciseList() {
    const { data: exercises = [], isPending, error } = useExercises();
    const [searchTerm, setSearchTerm] = useState("");    // UI state: stays as useState

    if (isPending) {
        return <p>Loading exercises...</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
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