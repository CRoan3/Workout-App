import type { StepProps } from "../onboardingReducer";

const MAX_NOTES_LENGTH = 2000;

export default function NotesStep({ answers, dispatch }: StepProps) {
    return (
        <div className="question">
            <label htmlFor="notes">Tell us anything else that would help tailor your program</label>
            <p className="hint">
                Favourite or least favourite exercises, sports you play, an event you're training for,
                what's worked (or hasn't) before...
            </p>
            <textarea
                id="notes"
                rows={7}
                maxLength={MAX_NOTES_LENGTH}
                value={answers.notes}
                onChange={(event) => dispatch({ type: "updateAnswers", changes: { notes: event.target.value } })}
            />
            <p className="hint align-right">
                {answers.notes.length} / {MAX_NOTES_LENGTH}
            </p>
        </div>
    );
}
