import type { StepProps } from "../onboardingReducer";
import { DAYS_PER_WEEK_OPTIONS, SESSION_MINUTES_OPTIONS } from "../options";
import ChoiceGroup from "./ChoiceGroup";

export default function ScheduleStep({ answers, dispatch, errors }: StepProps) {
    return (
        <>
            <fieldset className="question">
                <legend>How many days a week can you realistically train?</legend>
                <ChoiceGroup
                    name="daysPerWeek"
                    compact
                    options={DAYS_PER_WEEK_OPTIONS}
                    selected={answers.daysPerWeek ? [answers.daysPerWeek] : []}
                    onToggle={(daysPerWeek) => dispatch({ type: "updateAnswers", changes: { daysPerWeek } })}
                />
                {errors.daysPerWeek && <p className="field-error">{errors.daysPerWeek}</p>}
            </fieldset>

            <fieldset className="question">
                <legend>How long can each session be?</legend>
                <ChoiceGroup
                    name="sessionMinutes"
                    compact
                    options={SESSION_MINUTES_OPTIONS}
                    selected={answers.sessionMinutes ? [answers.sessionMinutes] : []}
                    onToggle={(sessionMinutes) => dispatch({ type: "updateAnswers", changes: { sessionMinutes } })}
                />
                {errors.sessionMinutes && <p className="field-error">{errors.sessionMinutes}</p>}
            </fieldset>

            <p className="hint">Pick what you can stick to on a busy week. Consistency beats an ambitious plan you skip.</p>
        </>
    );
}
