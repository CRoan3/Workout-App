import { EMPTY_ANSWERS, type OnboardingAnswers } from "./types";

// Saves questionnaire data in the browser's localStorage until the backend has a profile endpoint.
// When it does, only this file needs to change: swap these functions for API calls in an api.ts.
//
// localStorage only stores strings, so objects go through JSON.stringify / JSON.parse.
// Every read and write is wrapped in try/catch: storage can be full, disabled (private mode),
// or contain old data that no longer parses. The app should still work in all of those cases.

const DRAFT_KEY = "workoutApp.onboardingDraft";     // a questionnaire that's in progress
const PROFILE_KEY = "workoutApp.profile";           // a completed questionnaire

export type OnboardingDraft = {
    stepIndex: number;
    answers: OnboardingAnswers;
};

export type SavedProfile = {
    answers: OnboardingAnswers;
    completedAt: string;   // ISO date string, e.g. "2026-11-15T14:03:00.000Z"
};

function read<T>(key: string): T | null {
    try {
        const json = localStorage.getItem(key);
        return json ? (JSON.parse(json) as T) : null;
    } catch {
        return null;
    }
}

function write(key: string, value: unknown) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        // Ignore: losing a draft is annoying but shouldn't crash the page
    }
}

// Spreading EMPTY_ANSWERS first fills in any field that's missing from older saved data,
// e.g. if we add a new question later, old saves get its default value
function withDefaults(answers: Partial<OnboardingAnswers>): OnboardingAnswers {
    return { ...EMPTY_ANSWERS, ...answers };
}

export function loadDraft(): OnboardingDraft | null {
    const draft = read<OnboardingDraft>(DRAFT_KEY);
    return draft ? { stepIndex: draft.stepIndex ?? 0, answers: withDefaults(draft.answers) } : null;
}

export function saveDraft(draft: OnboardingDraft) {
    write(DRAFT_KEY, draft);
}

export function clearDraft() {
    try {
        localStorage.removeItem(DRAFT_KEY);
    } catch {
        // ignore
    }
}

export function loadProfile(): SavedProfile | null {
    const profile = read<SavedProfile>(PROFILE_KEY);
    return profile ? { ...profile, answers: withDefaults(profile.answers) } : null;
}

export function saveProfile(answers: OnboardingAnswers) {
    const profile: SavedProfile = { answers, completedAt: new Date().toISOString() };
    write(PROFILE_KEY, profile);
}
