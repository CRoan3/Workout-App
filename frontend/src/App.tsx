import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ExerciseList from './features/exercises/pages/ExerciseList';
import ExerciseDetail from './features/exercises/pages/ExerciseDetail';
import './App.css';
import ExerciseCreateForm from "./features/exercises/pages/ExerciseCreateForm";
import ExerciseEditForm from "./features/exercises/pages/ExerciseEditForm";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";

// Main app component
// Route element=Layout means that Layout is the shared page shell for all routes, and the current route renders in <Outlet> (placeholder) in Layout
function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route element={<Layout />}>  
            <Route path="/" element={<Navigate to="/exercises" replace />} />
            <Route path="/exercises" element={<ExerciseList />} />
            <Route path="/exercises/new" element={<ExerciseCreateForm />} />
            <Route path="/exercises/:id" element={<ExerciseDetail />} />
            <Route path="/exercises/:id/edit" element={<ExerciseEditForm />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    </Routes>
</BrowserRouter>

  );
}

export default App
