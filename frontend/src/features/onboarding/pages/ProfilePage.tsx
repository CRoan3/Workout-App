import { Link } from "react-router-dom";
import { loadProfile } from "../storage";
import AnswersSummary from "../components/AnswersSummary";

// Shows the completed questionnaire. Later this is where the generated program and metrics can live.
export default function ProfilePage() {
    const profile = loadProfile();

    if (!profile) {
        return (
            <section>
                <h2>Your Profile</h2>
                <div className="panel">
                    <p>You haven't filled in the questionnaire yet. It takes about 2 minutes.</p>
                    <Link to="/onboarding" className="button">Start questionnaire</Link>
                </div>
            </section>
        );
    }

    return (
        <section>
            <div className="page-header">
                <h2>Your Profile</h2>
                <Link to="/onboarding" className="button secondary">Edit answers</Link>
            </div>

            <p className="muted">Last updated {new Date(profile.completedAt).toLocaleDateString()}</p>

            <div className="panel">
                <AnswersSummary answers={profile.answers} />
            </div>

            <div className="panel">
                <h3>Your tailored program</h3>
                <p className="muted">Coming soon: a workout plan built from these answers.</p>
            </div>
        </section>
    );
}
