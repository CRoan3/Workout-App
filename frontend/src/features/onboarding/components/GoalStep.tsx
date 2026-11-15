import type { StepProps } from "../onboardingReducer";
import { GOAL_OPTIONS } from "../options";
import ChoiceGroup from "./ChoiceGroup";

export default function GoalStep({ answers, dispatch, errors }: StepProps) {
    return (
        <fieldset>
            <legend>Pick the one that matters most right now. Your program will be built around it.</legend>

            <ChoiceGroup
                name="goal"
                options={GOAL_OPTIONS}
                selected={answers.goal ? [answers.goal] : []}
                onToggle={(goal) => dispatch({ type: "updateAnswers", changes: { goal } })}
            />

            {errors.goal && <p className="field-error">{errors.goal}</p>}
        </fieldset>
    );
}
