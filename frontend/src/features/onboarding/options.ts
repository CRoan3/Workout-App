import type { ExperienceLevel, Goal, TrainingLocation, TrainingStatus } from "./types";

// The choices shown for each question.
// Keeping them as data (instead of hard-coding them in the JSX) means the questionnaire
// and the summary page read labels from the same place.

export type Option<T> = {
    value: T;
    label: string;
    description?: string;   // "?" = optional property
};

export const GOAL_OPTIONS: Option<Goal>[] = [
    { value: "lose-fat", label: "Lose fat", description: "Lean out while keeping muscle" },
    { value: "build-muscle", label: "Build muscle", description: "Add size and shape" },
    { value: "get-stronger", label: "Get stronger", description: "Lift heavier on the big lifts" },
    { value: "improve-cardio", label: "Improve cardio", description: "Better endurance and conditioning" },
    { value: "mobility", label: "Mobility & flexibility", description: "Move better, feel less stiff" },
    { value: "general-health", label: "General health", description: "Feel good and stay consistent" },
    { value: "athletic-performance", label: "Athletic performance", description: "Speed, power and agility for sport" },
];

export const EXPERIENCE_OPTIONS: Option<ExperienceLevel>[] = [
    { value: "new", label: "Brand new", description: "Never trained consistently" },
    { value: "beginner", label: "Beginner", description: "Less than 1 year of training" },
    { value: "intermediate", label: "Intermediate", description: "1 to 3 years of training" },
    { value: "advanced", label: "Advanced", description: "3+ years of training" },
];

export const TRAINING_STATUS_OPTIONS: Option<TrainingStatus>[] = [
    { value: "training-now", label: "Training consistently right now" },
    { value: "returning", label: "Coming back after a break" },
    { value: "not-training", label: "Not training at the moment" },
];

export const INJURY_AREA_OPTIONS: Option<string>[] = [
    "Neck", "Shoulders", "Elbows", "Wrists", "Upper back", "Lower back", "Hips", "Knees", "Ankles",
].map((area) => ({ value: area, label: area }));

export const DAYS_PER_WEEK_OPTIONS: Option<number>[] = [1, 2, 3, 4, 5, 6, 7].map((days) => ({
    value: days,
    label: String(days),
}));

export const SESSION_MINUTES_OPTIONS: Option<number>[] = [20, 30, 45, 60, 75, 90].map((minutes) => ({
    value: minutes,
    label: minutes === 90 ? "90+ min" : `${minutes} min`,
}));

export const LOCATION_OPTIONS: Option<TrainingLocation>[] = [
    { value: "gym", label: "Gym", description: "A commercial or school gym" },
    { value: "home", label: "Home", description: "Whatever you have at home" },
    { value: "both", label: "Both", description: "Mix of gym and home sessions" },
];

// Finds the label for a stored value, e.g. "lose-fat" -> "Lose fat"
export function labelFor<T>(options: Option<T>[], value: T | null): string {
    return options.find((option) => option.value === value)?.label ?? "Not answered";
}
