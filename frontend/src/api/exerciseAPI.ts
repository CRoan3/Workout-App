// represents one coaching tip from the backend
export type ExerciseTip = {
    tip: string;
    sortOrder: number;
}


// TS shape for an exercise returned by the backend
export type Exercise = {
    id: number;
    name: string;
    url: string | null;
    description: string | null;
    createdAt: string;
    updatedAt: string;

    tags: string[];
    tips: ExerciseTip[];
}

// Fetches all exercises from the Spring backend
export async function getExercises(): Promise<Exercise[]> {
    const response = await fetch("http://localhost:8080/api/exercises");

    // if the request fails, throw an error so the UI can handle it
    if(!response.ok) {
        throw new Error("Failed to fetch exercises");
    }

    // convert the JSON response to an array of exercises
    return response.json();
}

// fetches one exercise by ID from Spring boot backend]
export async function getExercisesById(id: number): Promise<Exercise> {
    const response = await fetch(`http://localhost:8080/api/exercises/${id}`)   //have to use `` instead of "" to get the id param to work

    if(!response.ok) {
        throw new Error("Failed to fetch exercises");
    }

    return response.json();
}

// Data sent to backend when creating an exercise
export type CreateExerciseRequest = {
    name: string;
    description: string;
    url: string;
}

// Sends a new exercise to the backend
export async function createExercise(exercise: CreateExerciseRequest): Promise<Exercise> {
    const response = await fetch("http://localhost:8080/api/exercises", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(exercise),
    });

    if (!response) {
        throw new Error("Failed to create exercise.");
    }
    
    return response.json();
}



