import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { createInitialState, onboardingReducer } from "../onboardingReducer";
import { STEPS, stepIndexOf } from "../steps";
import { hasErrors, validateStep } from "../validation";
import { clearDraft, saveDraft, saveProfile } from "../storage";
import GoalStep from "../components/GoalStep";
import AboutYouStep from "../components/AboutYouStep";
import InjuriesStep from "../components/InjuriesStep";
import ScheduleStep from "../components/ScheduleStep";
import EquipmentStep from "../components/EquipmentStep";
import NotesStep from "../components/NotesStep";
import AnswersSummary from "../components/AnswersSummary";

// Multi-step onboarding questionnaire: one question topic per screen, with Back / Next.
export default function OnboardingWizard() {
    const navigate = useNavigate();

    // useReducer(reducer, initialArg, init): React calls init(initialArg) once to build the
    // starting state. Passing the function (not calling it) means localStorage is only read once,
    // not on every re-render.
    const [state, dispatch] = useReducer(onboardingReducer, undefined, createInitialState);

    const step = STEPS[state.stepIndex];
    const isFirstStep = state.stepIndex === 0;
    const isLastStep = state.stepIndex === STEPS.length - 1;

    // Errors are recalculated from the answers on every render (no separate error state to keep in sync),
    // but only shown once the user has tried to continue.
    const errors = state.showErrors ? validateStep(step.id, state.answers) : {};

    // Effects run *after* React renders. Their job is to sync with things outside React:
    // here, save progress to localStorage whenever the step or answers change,
    // so a refresh or accidental tab close doesn't lose anything.
    useEffect(() => {
        saveDraft({ stepIndex: state.stepIndex, answers: state.answers });
    }, [state.stepIndex, state.answers]);

    // Start each step at the top of the page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [state.stepIndex]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!isLastStep) {
            dispatch({ type: "nextStep" });
            return;
        }

        // On "Finish", double-check every step (the user may have jumped around using "Edit")
        // and send them to the first one with a problem
        const firstInvalidStep = STEPS.findIndex((s) => hasErrors(validateStep(s.id, state.answers)));
        if (firstInvalidStep !== -1) {
            dispatch({ type: "goToStep", stepIndex: firstInvalidStep, showErrors: true });
            return;
        }

        saveProfile(state.answers);
        clearDraft();
        navigate("/profile");
    }

    // Picks the component for the current step. A switch on the step id keeps this easy to follow.
    function renderStep() {
        const stepProps = { answers: state.answers, dispatch, errors };

        switch (step.id) {
            case "goal":
                return <GoalStep {...stepProps} />;
            case "about":
                return <AboutYouStep {...stepProps} />;
            case "injuries":
                return <InjuriesStep {...stepProps} />;
            case "schedule":
                return <ScheduleStep {...stepProps} />;
            case "equipment":
                return <EquipmentStep {...stepProps} />;
            case "notes":
                return <NotesStep {...stepProps} />;
            case "review":
                return (
                    <AnswersSummary
                        answers={state.answers}
                        onEdit={(stepId) => dispatch({ type: "goToStep", stepIndex: stepIndexOf(stepId) })}
                    />
                );
        }
    }

    const progressPercent = Math.round(((state.stepIndex + 1) / STEPS.length) * 100);

    return (
        <section className="onboarding">
            <p className="step-count muted">
                Step {state.stepIndex + 1} of {STEPS.length}
            </p>
            <div
                className="progress"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progressPercent}
                aria-label="Questionnaire progress">
                <div className="progress-bar" style={{ width: `${progressPercent}%` }} />
            </div>

            <h2>
                {step.title} {step.optional && <span className="optional-tag">Optional</span>}
            </h2>

            {/* noValidate turns off the browser's own pop-up validation, so our messages are the only ones */}
            <form noValidate onSubmit={handleSubmit} className="panel">
                {renderStep()}

                <div className="step-nav">
                    {!isFirstStep && (
                        <button type="button" className="button secondary" onClick={() => dispatch({ type: "prevStep" })}>
                            Back
                        </button>
                    )}
                    <button type="submit" className="step-next">
                        {isLastStep ? "Finish" : "Next"}
                    </button>
                </div>
            </form>
        </section>
    );
}
