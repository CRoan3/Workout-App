import type { StepId } from "./steps";
import type { OnboardingAnswers } from "./types";

// Error messages for one step, keyed by the answer they belong to, e.g. { age: "Enter your age." }
// Partial<Record<...>> = "an object that may have any of these keys"
export type StepErrors = Partial<Record<keyof OnboardingAnswers, string>>;

// Checks the answers for one step. An empty object means the step is valid.
// This is a plain function (no React), so it's easy to reuse: the reducer calls it on "Next",
// and the wizard calls it for every step before "Finish".
export function validateStep(stepId: StepId, answers: OnboardingAnswers): StepErrors {
    const errors: StepErrors = {};

    switch (stepId) {
        case "goal":
            if (!answers.goal) {
                errors.goal = "Pick the goal that matters most to you right now.";
            }
            break;

        case "about": {
            if (answers.age === null) {
                errors.age = "Enter your age.";
            } else if (answers.age < 13 || answers.age > 100) {
                errors.age = "Age must be between 13 and 100.";
            }

            if (!answers.experience) {
                errors.experience = "Choose your experience level.";
            }
            if (!answers.trainingStatus) {
                errors.trainingStatus = "Choose what best describes you right now.";
            }

            // Weight and height are optional, but if entered they should be realistic
            const imperial = answers.units === "imperial";
            const [minWeight, maxWeight] = imperial ? [60, 700] : [27, 320];
            if (answers.bodyWeight !== null && (answers.bodyWeight < minWeight || answers.bodyWeight > maxWeight)) {
                errors.bodyWeight = `Enter a weight between ${minWeight} and ${maxWeight} ${imperial ? "lb" : "kg"}.`;
            }

            const [minHeight, maxHeight] = imperial ? [36, 96] : [90, 245];
            if (answers.height !== null && (answers.height < minHeight || answers.height > maxHeight)) {
                errors.height = imperial
                    ? "Enter a height between 3 ft and 8 ft."
                    : `Enter a height between ${minHeight} and ${maxHeight} cm.`;
            }
            break;
        }

        case "schedule":
            if (answers.daysPerWeek === null) {
                errors.daysPerWeek = "Choose how many days a week you can train.";
            }
            if (answers.sessionMinutes === null) {
                errors.sessionMinutes = "Choose how long each session can be.";
            }
            break;

        // injuries, equipment, notes and review have nothing required
    }

    return errors;
}

export function hasErrors(errors: StepErrors): boolean {
    return Object.keys(errors).length > 0;
}
