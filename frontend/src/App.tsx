import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ExerciseList from './components/ExerciseList';
import ExerciseDetail from './components/ExerciseDetail';
import './App.css';
import ExerciseCreateForm from "./components/ExerciseCreateForm";
import ExerciseEditForm from "./components/ExerciseEditForm";

// Main app component
function App() {
  return (
    <BrowserRouter>
      <main>
        <h1>Workout App</h1>
          <Routes>
            <Route path="/" element={<Navigate to="/exercises" />} />
            <Route path="/exercises" element={<ExerciseList/>} />
            <Route path="/exercises/new" element={<ExerciseCreateForm/>} />
            <Route path="/exercises/:id" element={<ExerciseDetail />} />
            <Route path="/exercises/:id/edit" element={<ExerciseEditForm />} />
          </Routes>

        </main>
      </BrowserRouter>
  );
}

export default App
