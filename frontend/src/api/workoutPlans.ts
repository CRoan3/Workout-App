export type WorkoutPlanCreateRequest = {   //this TS type mirrors WorkoutPlanCreateRequestDTO
    name: string;
    description: string;
};

export type WorkoutPlan = {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export async function createWorkoutPlan(
    request: WorkoutPlanCreateRequest
): Promise<WorkoutPlan> {
    const response = await fetch("http://localhost:8080/api/workout-plans", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        throw new Error("Failed to create workout plan.")
    }

    return response.json();
}