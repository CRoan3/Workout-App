import type { StepId } from "../steps";
import type { OnboardingAnswers } from "../types";
import {
    EXPERIENCE_OPTIONS,
    GOAL_OPTIONS,
    LOCATION_OPTIONS,
    SESSION_MINUTES_OPTIONS,
    TRAINING_STATUS_OPTIONS,
    labelFor,
} from "../options";
import { formatHeight, formatWeight } from "../format";

type AnswersSummaryProps = {
    answers: OnboardingAnswers;
    onEdit?: (stepId: StepId) => void;   // when given, each section gets an "Edit" button
};

type SummarySection = {
    stepId: StepId;
    title: string;
    rows: [label: string, value: string][];   // a "tuple": an array of exactly two strings
};

// Read-only view of the answers. Used on the questionnaire's Review step and on the Profile page.
export default function AnswersSummary({ answers, onEdit }: AnswersSummaryProps) {
    const sections: SummarySection[] = [
        {
            stepId: "goal",
            title: "Goal",
            rows: [["Main goal", labelFor(GOAL_OPTIONS, answers.goal)]],
        },
        {
            stepId: "about",
            title: "About you",
            rows: [
                ["Age", answers.age === null ? "Not answered" : String(answers.age)],
                ["Experience", labelFor(EXPERIENCE_OPTIONS, answers.experience)],
                ["Right now", labelFor(TRAINING_STATUS_OPTIONS, answers.trainingStatus)],
                ["Weight", formatWeight(answers)],
                ["Height", formatHeight(answers)],
            ],
        },
        {
            stepId: "injuries",
            title: "Injuries",
            rows: [
                ["Areas", answers.injuries.length ? answers.injuries.join(", ") : "None"],
                ...(answers.injuryNotes ? [["Details", answers.injuryNotes] as [string, string]] : []),
            ],
        },
        {
            stepId: "schedule",
            title: "Schedule",
            rows: [
                ["Days per week", answers.daysPerWeek === null ? "Not answered" : String(answers.daysPerWeek)],
                ["Session length", labelFor(SESSION_MINUTES_OPTIONS, answers.sessionMinutes)],
            ],
        },
        {
            stepId: "equipment",
            title: "Equipment",
            rows: [
                ["Where", labelFor(LOCATION_OPTIONS, answers.location)],
                ["Equipment", answers.equipment.length ? answers.equipment.join(", ") : "None selected"],
            ],
        },
        {
            stepId: "notes",
            title: "Other details",
            rows: [["Notes", answers.notes || "None"]],
        },
    ];

    return (
        <div className="summary">
            {sections.map((section) => (
                <section key={section.stepId} className="summary-section">
                    <div className="summary-header">
                        <h3>{section.title}</h3>
                        {onEdit && (
                            <button type="button" className="link-button" onClick={() => onEdit(section.stepId)}>
                                Edit
                            </button>
                        )}
                    </div>
                    <dl>
                        {section.rows.map(([label, value]) => (
                            <div key={label} className="summary-row">
                                <dt>{label}</dt>
                                <dd>{value}</dd>
                            </div>
                        ))}
                    </dl>
                </section>
            ))}
        </div>
    );
}
