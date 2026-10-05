package com.chrisroan.workout.controller;

import com.chrisroan.workout.dto.WorkoutDayExerciseResponseDTO;
import com.chrisroan.workout.dto.WorkoutDayExerciseCreateRequestDTO;
import com.chrisroan.workout.service.WorkoutDayExerciseService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/workout-days")
@CrossOrigin(origins = "http://localhost:5173/")
public class WorkoutDayExerciseController {
    private final WorkoutDayExerciseService workoutDayExerciseService;

    public WorkoutDayExerciseController(WorkoutDayExerciseService workoutDayExerciseService) {
        this.workoutDayExerciseService = workoutDayExerciseService;
    }

    //URL gives us workoutDayId, request body gives us exerciseId + sets/reps/etc
    @PostMapping("/{workoutDayId}/exercises")
    public WorkoutDayExerciseResponseDTO addExerciseToWorkoutDay(@PathVariable Long workoutDayId, @RequestBody WorkoutDayExerciseCreateRequestDTO request) {
        return workoutDayExerciseService.addExerciseToWorkoutDay(workoutDayId, request);
    }
}
