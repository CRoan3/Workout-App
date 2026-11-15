// The questionnaire's steps, in order. To add, remove or reorder a step, change this list
// (and add a matching case in validation.ts and OnboardingWizard.tsx).
export const STEPS = [
    { id: "goal", title: "What's your main goal?", optional: false },
    { id: "about", title: "About you", optional: false },
    { id: "injuries", title: "Injuries or limitations", optional: true },
    { id: "schedule", title: "Your schedule", optional: false },
    { id: "equipment", title: "Equipment", optional: true },
    { id: "notes", title: "Anything else?", optional: true },
    { id: "review", title: "Review your answers", optional: false },
] as const;

// Derives the type "goal" | "about" | ... straight from the list above,
// so the type can never get out of sync with the actual steps
export type StepId = (typeof STEPS)[number]["id"];

export function stepIndexOf(stepId: StepId): number {
    return STEPS.findIndex((step) => step.id === stepId);
}
