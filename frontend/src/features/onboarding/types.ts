// The answers collected by the onboarding questionnaire.
//
// These "union of string literals" types (e.g. "lose-fat" | "build-muscle") mean TypeScript
// only accepts those exact values, so a typo like "loose-fat" is a compile error.

export type Goal =
    | "lose-fat"
    | "build-muscle"
    | "get-stronger"
    | "improve-cardio"
    | "mobility"
    | "general-health"
    | "athletic-performance";

export type ExperienceLevel = "new" | "beginner" | "intermediate" | "advanced";

export type TrainingStatus = "training-now" | "returning" | "not-training";

export type UnitSystem = "imperial" | "metric";

export type TrainingLocation = "gym" | "home" | "both";

export type OnboardingAnswers = {
    goal: Goal | null;               // null = "not answered yet" (different from a real value)

    age: number | null;
    experience: ExperienceLevel | null;
    trainingStatus: TrainingStatus | null;
    units: UnitSystem;
    bodyWeight: number | null;       // lb (imperial) or kg (metric)
    height: number | null;           // total inches (imperial) or cm (metric)

    injuries: string[];              // body areas, e.g. ["Knees", "Lower back"]; empty = no injuries
    injuryNotes: string;

    daysPerWeek: number | null;
    sessionMinutes: number | null;

    location: TrainingLocation | null;
    equipment: string[];             // equipment names, from the list or typed in by the user

    notes: string;                   // free text: "anything else we should know?"
};

// Starting point for a brand-new questionnaire
export const EMPTY_ANSWERS: OnboardingAnswers = {
    goal: null,
    age: null,
    experience: null,
    trainingStatus: null,
    units: "imperial",
    bodyWeight: null,
    height: null,
    injuries: [],
    injuryNotes: "",
    daysPerWeek: null,
    sessionMinutes: null,
    location: null,
    equipment: [],
    notes: "",
};
