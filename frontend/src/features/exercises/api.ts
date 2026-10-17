import { apiRequest } from '../../lib/apiClient';

// represents one coaching tip from the backend
export type ExerciseTip = {
    tip: string;
    sortOrder: number;
};

// TS shape for an exercise returned by the backend (mirrors ExerciseResponseDTO)
export type Exercise = {
    id: number;
    name: string;
    url: string | null;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    tags : string[];
    tips: ExerciseTip[];
};

// data sent to the backend when creating or updating an exercise (mirrors ExerciseRequestDTO)
export type ExerciseRequest = {
    name: string;
    description: string;
    url: string;
};

export function getExercises(): Promise<Exercise[]> {
    return apiRequest<Exercise[]>('/api/exercises');
}

export function getExerciseById(id: number): Promise<Exercise> {
    return apiRequest<Exercise>(`/api/exercises/${id}`);
}

export function createExercise(exercise: ExerciseRequest): Promise<Exercise> {
    return apiRequest<Exercise>('/api/exercises', {
        method: 'POST',
        body: JSON.stringify(exercise),
    });
}

export function updateExercise(id: number, exercise: ExerciseRequest): Promise<Exercise> {
    return apiRequest<Exercise>(`/api/exercises/${id}`, {
        method: 'PUT',
        body: JSON.stringify(exercise),
    });
}