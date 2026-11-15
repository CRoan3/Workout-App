import type { Dispatch } from "react";
import { STEPS } from "./steps";
import { EMPTY_ANSWERS, type OnboardingAnswers, type UnitSystem } from "./types";
import { hasErrors, validateStep, type StepErrors } from "./validation";
import { loadDraft, loadProfile } from "./storage";

// Why useReducer instead of several useState calls?
// The questionnaire has one big piece of state (current step + all answers) and several ways
// to change it: update an answer, toggle a checkbox, switch units, go to next/previous step.
// A reducer puts all those rules in one pure function:
//
//     (current state, action) => new state
//
// Components don't change state themselves; they "dispatch" an action describing what happened,
// e.g. dispatch({ type: "nextStep" }), and the reducer decides what the new state is.
// Because it's a plain function, it's easy to read top to bottom and easy to test.

export type OnboardingState = {
    stepIndex: number;
    answers: OnboardingAnswers;
    showErrors: boolean;   // only show errors after the user has tried to continue
};

// Every way the state can change. The "type" field tells the reducer which one it is,
// and TypeScript knows which other fields each type has (a "discriminated union").
export type OnboardingAction =
    | { type: "updateAnswers"; changes: Partial<OnboardingAnswers> }
    | { type: "toggleListItem"; field: "injuries" | "equipment"; item: string }
    | { type: "changeUnits"; units: UnitSystem }
    | { type: "nextStep" }
    | { type: "prevStep" }
    | { type: "goToStep"; stepIndex: number; showErrors?: boolean };

// The props every step component receives
export type StepProps = {
    answers: OnboardingAnswers;
    dispatch: Dispatch<OnboardingAction>;
    errors: StepErrors;
};

const LB_PER_KG = 2.20462;
const CM_PER_INCH = 2.54;

function roundTo1Decimal(value: number): number {
    return Math.round(value * 10) / 10;
}

// Important rule for reducers: never modify the old state, always return a new object.
// React compares old and new state by reference to decide whether to re-render,
// so "state.answers.goal = x" would silently do nothing. The "..." spread copies instead.
export function onboardingReducer(state: OnboardingState, action: OnboardingAction): OnboardingState {
    switch (action.type) {
        case "updateAnswers":
            return { ...state, answers: { ...state.answers, ...action.changes } };

        case "toggleListItem": {
            const list = state.answers[action.field];
            const newList = list.includes(action.item)
                ? list.filter((item) => item !== action.item)   // already selected -> remove it
                : [...list, action.item];                        // not selected -> add it
            return { ...state, answers: { ...state.answers, [action.field]: newList } };
        }

        case "changeUnits": {
            const answers = state.answers;
            if (action.units === answers.units) {
                return state;
            }

            // Convert what's already been typed so switching units doesn't lose it
            let bodyWeight = answers.bodyWeight;
            let height = answers.height;
            if (action.units === "metric") {
                if (bodyWeight !== null) bodyWeight = roundTo1Decimal(bodyWeight / LB_PER_KG);
                if (height !== null) height = Math.round(height * CM_PER_INCH);
            } else {
                if (bodyWeight !== null) bodyWeight = roundTo1Decimal(bodyWeight * LB_PER_KG);
                if (height !== null) height = Math.round(height / CM_PER_INCH);
            }

            return { ...state, answers: { ...answers, units: action.units, bodyWeight, height } };
        }

        case "nextStep": {
            // Don't move on until the current step is valid; instead, turn on the error messages
            const errors = validateStep(STEPS[state.stepIndex].id, state.answers);
            if (hasErrors(errors)) {
                return { ...state, showErrors: true };
            }
            return { ...state, stepIndex: Math.min(state.stepIndex + 1, STEPS.length - 1), showErrors: false };
        }

        case "prevStep":
            return { ...state, stepIndex: Math.max(state.stepIndex - 1, 0), showErrors: false };

        case "goToStep":
            return { ...state, stepIndex: action.stepIndex, showErrors: action.showErrors ?? false };
    }
}

// Runs once when the wizard opens (passed as useReducer's third argument).
// Resume an unfinished draft if there is one; otherwise start from the saved profile
// (so "Edit answers" starts pre-filled), or from scratch.
export function createInitialState(): OnboardingState {
    const draft = loadDraft();
    if (draft) {
        const stepIndex = Math.min(Math.max(draft.stepIndex, 0), STEPS.length - 1);
        return { stepIndex, answers: draft.answers, showErrors: false };
    }

    const profile = loadProfile();
    return { stepIndex: 0, answers: profile?.answers ?? EMPTY_ANSWERS, showErrors: false };
}
