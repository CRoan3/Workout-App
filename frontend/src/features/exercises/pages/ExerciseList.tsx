import { useState } from "react";
import { Link } from "react-router-dom";
import { useExercises } from "../queries";
import { toSlug } from "@/lib/slug";

// Displays the list of exercises from the backend. We will include filtering here until our exercise compendium grows
export default function ExerciseList() {
    const { data: exercises = [], isPending, error } = useExercises();
    const [searchTerm, setSearchTerm] = useState("");    // UI state: stays as useState

    if (isPending) {
        return <p>Loading exercises...</p>;
    }

    if (error) {
        return <p className="error">{error.message}</p>;
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
            <div className="page-header">
                <h2>Exercises</h2>
                <Link to="/exercises/new" className="button">Create New Exercise</Link>
            </div>

            <div className="search">
                <input
                type="text"
                placeholder="Search exercises..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)} />
            </div>

            {filteredExercises.length === 0 ? (
                <p className="muted">No exercises found.</p>
            ) : (
                <ul className="card-list">
                    {filteredExercises.map((exercise) => (
                    <li key={exercise.id}>
                        <h3>
                            <Link to={`/exercises/${toSlug(exercise.id, exercise.name)}`}>{exercise.name}</Link>
                        </h3>
                        <p>{exercise.description}</p>
                    </li>
                    ))}
                </ul>
            )}

        </section>
    );


}