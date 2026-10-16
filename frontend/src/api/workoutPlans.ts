import { apiRequest } from './client';

export type WorkoutPlanCreateRequest = {   //this TS type mirrors WorkoutPlanCreateRequestDTO
    name: string;
    description: string;
};

export type WorkoutPlan = {
    id: number;
    name: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
}

//none of these functions need async/await because they are just returning the Promise from apiRequest, which is already async. They will hand the promise back to the caller, which can then await it if they want to
export function createWorkoutPlan(workoutPlan: WorkoutPlanCreateRequest): Promise<WorkoutPlan> {
    return apiRequest<WorkoutPlan>('/api/workout-plans', {
        method: 'POST',
        body: JSON.stringify(workoutPlan),
    });
}

export function getWorkoutPlans(): Promise<WorkoutPlan[]> {
    return apiRequest<WorkoutPlan[]>('/api/workout-plans');
}

export function getWorkoutPlanById(id: number): Promise<WorkoutPlan> {
    return apiRequest<WorkoutPlan>(`/api/workout-plans/${id}`);
}