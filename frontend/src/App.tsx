import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ExerciseList from './components/ExerciseList';
import ExerciseDetail from './components/ExerciseDetail';
import './App.css';

// Main app component
function App() {
  return (
    <BrowserRouter>
      <main>
        <h1>Workout App</h1>
          <Routes>
            <Route path="/" element={<Navigate to="/exercises" />} />
            <Route path="/exercises" element={<ExerciseList/>} />
            <Route path="/exercises/:id" element={<ExerciseDetail />} />
          </Routes>

        </main>
      </BrowserRouter>
  );
}

export default App
