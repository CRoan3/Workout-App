import type { StepProps } from "../onboardingReducer";
import { EXPERIENCE_OPTIONS, TRAINING_STATUS_OPTIONS } from "../options";
import { toNumberOrNull } from "../format";
import ChoiceGroup from "./ChoiceGroup";

export default function AboutYouStep({ answers, dispatch, errors }: StepProps) {
    const imperial = answers.units === "imperial";

    // Imperial height is typed as feet + inches but stored as one number (total inches).
    // These are "derived values": calculated from state on every render rather than stored separately,
    // so they can never disagree with the stored height.
    const feet = answers.height === null ? "" : Math.floor(answers.height / 12);
    const inches = answers.height === null ? "" : answers.height % 12;

    function setImperialHeight(feetText: string, inchesText: string) {
        const ft = toNumberOrNull(feetText);
        const inch = toNumberOrNull(inchesText);
        const height = ft === null && inch === null ? null : (ft ?? 0) * 12 + (inch ?? 0);
        dispatch({ type: "updateAnswers", changes: { height } });
    }

    return (
        <>
            <div className="question">
                <label htmlFor="age">Age</label>
                <input
                    id="age"
                    type="number"
                    inputMode="numeric"
                    className="input-short"
                    value={answers.age ?? ""}
                    onChange={(event) => dispatch({ type: "updateAnswers", changes: { age: toNumberOrNull(event.target.value) } })}
                />
                {errors.age && <p className="field-error">{errors.age}</p>}
            </div>

            <fieldset className="question">
                <legend>Training experience</legend>
                <ChoiceGroup
                    name="experience"
                    options={EXPERIENCE_OPTIONS}
                    selected={answers.experience ? [answers.experience] : []}
                    onToggle={(experience) => dispatch({ type: "updateAnswers", changes: { experience } })}
                />
                {errors.experience && <p className="field-error">{errors.experience}</p>}
            </fieldset>

            <fieldset className="question">
                <legend>Which best describes you right now?</legend>
                <ChoiceGroup
                    name="trainingStatus"
                    options={TRAINING_STATUS_OPTIONS}
                    selected={answers.trainingStatus ? [answers.trainingStatus] : []}
                    onToggle={(trainingStatus) => dispatch({ type: "updateAnswers", changes: { trainingStatus } })}
                />
                {errors.trainingStatus && <p className="field-error">{errors.trainingStatus}</p>}
            </fieldset>

            <fieldset className="question">
                <legend>Body weight and height <span className="muted">(optional)</span></legend>

                {/* A segmented toggle. Switching converts any numbers already typed (see "changeUnits" in the reducer). */}
                <div className="segmented" role="group" aria-label="Units">
                    <button
                        type="button"
                        className={imperial ? "active" : ""}
                        aria-pressed={imperial}
                        onClick={() => dispatch({ type: "changeUnits", units: "imperial" })}>
                        lb / ft
                    </button>
                    <button
                        type="button"
                        className={!imperial ? "active" : ""}
                        aria-pressed={!imperial}
                        onClick={() => dispatch({ type: "changeUnits", units: "metric" })}>
                        kg / cm
                    </button>
                </div>

                <div className="inline-fields">
                    <div>
                        <label htmlFor="bodyWeight">Weight</label>
                        <div className="input-with-unit">
                            <input
                                id="bodyWeight"
                                type="number"
                                inputMode="decimal"
                                value={answers.bodyWeight ?? ""}
                                onChange={(event) =>
                                    dispatch({ type: "updateAnswers", changes: { bodyWeight: toNumberOrNull(event.target.value) } })
                                }
                            />
                            <span>{imperial ? "lb" : "kg"}</span>
                        </div>
                    </div>

                    {imperial ? (
                        <div>
                            <label htmlFor="heightFeet">Height</label>
                            <div className="inline-fields tight">
                                <div className="input-with-unit">
                                    <input
                                        id="heightFeet"
                                        type="number"
                                        inputMode="numeric"
                                        aria-label="Height, feet"
                                        value={feet}
                                        onChange={(event) => setImperialHeight(event.target.value, String(inches))}
                                    />
                                    <span>ft</span>
                                </div>
                                <div className="input-with-unit">
                                    <input
                                        type="number"
                                        inputMode="numeric"
                                        aria-label="Height, inches"
                                        value={inches}
                                        onChange={(event) => setImperialHeight(String(feet), event.target.value)}
                                    />
                                    <span>in</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <label htmlFor="heightCm">Height</label>
                            <div className="input-with-unit">
                                <input
                                    id="heightCm"
                                    type="number"
                                    inputMode="numeric"
                                    value={answers.height ?? ""}
                                    onChange={(event) =>
                                        dispatch({ type: "updateAnswers", changes: { height: toNumberOrNull(event.target.value) } })
                                    }
                                />
                                <span>cm</span>
                            </div>
                        </div>
                    )}
                </div>

                {errors.bodyWeight && <p className="field-error">{errors.bodyWeight}</p>}
                {errors.height && <p className="field-error">{errors.height}</p>}
                <p className="hint">Your starting weight becomes the first point on your progress chart later.</p>
            </fieldset>
        </>
    );
}
