// TS shape for an exercise returned by the backend
export type Exercise = {
    id: number;
    name: string;
    url: string | null;
    description: string | null;
    createdAt: string;
    updatedAt: string;
};

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

export async function getExercisesById(id: number): Promise<Exercise> {
    const response = await fetch(`http://localhost:8080/api/exercises/${id}`)   //have to use `` instead of "" to get the id param to work

    if(!response.ok) {
        throw new Error("Failed to fetch exercises");
    }

    return response.json();
}

