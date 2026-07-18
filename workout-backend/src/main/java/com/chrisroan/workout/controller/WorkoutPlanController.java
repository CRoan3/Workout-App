package com.chrisroan.workout.controller;

import com.chrisroan.workout.dto.WorkoutPlanCreateRequestDTO;
import com.chrisroan.workout.dto.WorkoutPlanResponseDTO;
import com.chrisroan.workout.service.WorkoutPlanService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/workout-plans")
@CrossOrigin(origins = "http://localhost:5173/")
public class WorkoutPlanController {

    private final WorkoutPlanService workoutPlanService;

    // Constructor injection of the service layer
    public WorkoutPlanController(WorkoutPlanService workoutPlanService) {
        this.workoutPlanService = workoutPlanService;
    }

    //creates new workout plan
    @PostMapping
    public WorkoutPlanResponseDTO createWorkoutPlan(@RequestBody WorkoutPlanCreateRequestDTO request) {
        return workoutPlanService.createWorkoutPlan(request);
    }

}
