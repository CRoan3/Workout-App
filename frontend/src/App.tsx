import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExerciseList from '@/features/exercises/pages/ExerciseList';
import ExerciseDetail from '@/features/exercises/pages/ExerciseDetail';
import ExerciseCreateForm from "@/features/exercises/pages/ExerciseCreateForm";
import ExerciseEditForm from "@/features/exercises/pages/ExerciseEditForm";
import Layout from "@/components/Layout";
import NotFound from "@/pages/NotFound";
import WorkoutPlanList from "@/features/workout-plans/pages/WorkoutPlanList";
import WorkoutPlanCreateForm from "@/features/workout-plans/pages/WorkoutPlanCreateForm";
import WorkoutPlanDetail from "@/features/workout-plans/pages/WorkoutPlanDetail";
import Home from "@/pages/Home";
import OnboardingWizard from "@/features/onboarding/pages/OnboardingWizard";
import ProfilePage from "@/features/onboarding/pages/ProfilePage";

// Main app component
// Route element=Layout means that Layout is the shared page shell for all routes, and the current route renders in <Outlet> (placeholder) in Layout
function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route element={<Layout />}>  
            <Route path="/" element={<Home />} />
            <Route path="/onboarding" element={<OnboardingWizard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/exercises" element={<ExerciseList />} />
            <Route path="/exercises/new" element={<ExerciseCreateForm />} />
            {/* :slug is "<id>-<name>", e.g. /exercises/1-flat-bench-press (see lib/slug.ts) */}
            <Route path="/exercises/:slug" element={<ExerciseDetail />} />
            <Route path="/exercises/:slug/edit" element={<ExerciseEditForm />} />
            <Route path="/workout-plans" element={<WorkoutPlanList />} />
            <Route path="/workout-plans/new" element={<WorkoutPlanCreateForm />} />
            <Route path="/workout-plans/:id" element={<WorkoutPlanDetail />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    </Routes>
</BrowserRouter>

  );
}

export default App
