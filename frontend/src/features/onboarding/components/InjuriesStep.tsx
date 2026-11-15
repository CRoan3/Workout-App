import type { StepProps } from "../onboardingReducer";
import { INJURY_AREA_OPTIONS } from "../options";
import ChoiceGroup from "./ChoiceGroup";

export default function InjuriesStep({ answers, dispatch }: StepProps) {
    return (
        <>
            <fieldset className="question">
                <legend>Any areas we should be careful with? Select all that apply, or leave blank if none.</legend>
                <ChoiceGroup
                    name="injuries"
                    multiple
                    compact
                    options={INJURY_AREA_OPTIONS}
                    selected={answers.injuries}
                    onToggle={(area) => dispatch({ type: "toggleListItem", field: "injuries", item: area })}
                />
            </fieldset>

            <div className="question">
                <label htmlFor="injuryNotes">Details <span className="muted">(optional)</span></label>
                <textarea
                    id="injuryNotes"
                    placeholder="e.g. Left knee pain on deep squats, recovering from a rotator cuff strain"
                    value={answers.injuryNotes}
                    onChange={(event) => dispatch({ type: "updateAnswers", changes: { injuryNotes: event.target.value } })}
                />
            </div>
        </>
    );
}
