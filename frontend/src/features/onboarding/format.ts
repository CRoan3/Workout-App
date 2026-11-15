import type { OnboardingAnswers } from "./types";

// Turns the text from an <input type="number"> into a number, or null if it's empty.
// Inputs always give you a string, even type="number" ones.
export function toNumberOrNull(text: string): number | null {
    if (text.trim() === "") return null;
    const value = Number(text);
    return Number.isFinite(value) ? value : null;
}

export function formatWeight(answers: OnboardingAnswers): string {
    if (answers.bodyWeight === null) return "Not answered";
    return `${answers.bodyWeight} ${answers.units === "imperial" ? "lb" : "kg"}`;
}

export function formatHeight(answers: OnboardingAnswers): string {
    if (answers.height === null) return "Not answered";
    if (answers.units === "metric") return `${answers.height} cm`;

    const feet = Math.floor(answers.height / 12);
    const inches = answers.height % 12;
    return `${feet} ft ${inches} in`;
}
