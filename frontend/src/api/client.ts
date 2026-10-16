const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

// the shape of the RFC 9457 error body our backend's GlobalExceptionHandler returns
export type ProblemDetail = {
    type?: string;
    title?: string;
    status?: number;
    detail?: string;
    instance?: string;
};

// thrown for any non-2xx response from the backend (carries backend error details)
// essentially the backend equivalent to ResourceNotFundException
export class ApiError extends Error {
    status: number;
    problem: ProblemDetail | null;

    constructor(status: number, problem: ProblemDetail | null) {
        super(problem?.detail ?? problem?.title ?? `API request failed with status ${status}`);
        this.name = 'ApiError';
        this.status = status;
        this.problem = problem;
    }
}

// each backend call goes through here: builds the URL, sends JSON, checks for errors, and returns the parsed JSON response. Content Type is only sent when there is a body to send, this does nothing for GET requests
//await is needed here because the function has to inspect the response before deciding what to return
export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: options.body
            ? { "Content-Type": "application/json", ...options.headers }
            : options.headers,
    });

    if (!response.ok) { 
        // Error body may be missing or not JSON, so fall back to null
        const problem = await response.json().catch(() => null);
        throw new ApiError(response.status, problem);
    }

    // 204 No Content has no body to parse (we'll use this for DELETE later)
    if (response.status === 204) {
        return undefined as T;
    }

    return response.json() as Promise<T>;
}