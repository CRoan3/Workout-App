import { Navigate } from "react-router-dom";
import { loadProfile } from "@/features/onboarding/storage";

// "/" decides where to send you: new users go to the questionnaire, everyone else to the exercises.
// <Navigate> redirects as soon as it renders; "replace" keeps "/" out of the browser history.
export default function Home() {
    const hasProfile = loadProfile() !== null;
    return <Navigate to={hasProfile ? "/exercises" : "/onboarding"} replace />;
}
