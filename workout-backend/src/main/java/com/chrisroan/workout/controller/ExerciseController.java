package com.chrisroan.workout.controller;

import com.chrisroan.workout.domain.Exercise;
import com.chrisroan.workout.dto.ExerciseResponseDTO;
import com.chrisroan.workout.service.ExerciseService;
import com.chrisroan.workout.dto.ExerciseCreateRequestDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Marks this class as a REST API controller
@RestController
// Base route for all exercise endpoints
@RequestMapping("/api/exercises")
//CORS issue fix, origin is where the request is from (frontend port)
@CrossOrigin(origins = "http://localhost:5173/")
public class ExerciseController {

    // Service layer used for exercise business logic
    private final ExerciseService exerciseService;

    // Constructor injection of the service layer
    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    // GET /api/exercises
    // Returns all exercises
    @GetMapping
    public List<ExerciseResponseDTO> getAllExercises() {
        return exerciseService.getAllExercises();
    }

    // GET /api/exercises/{id}
    // Returns a single exercise by ID
    @GetMapping("/{id}")
    public ExerciseResponseDTO getExerciseById(@PathVariable Long id) {
        return exerciseService.getExerciseById(id);
    }

    // POST /api/exercises
    // Creates a new exercise
    @PostMapping
    public ExerciseResponseDTO createExercise(@RequestBody ExerciseCreateRequestDTO request) {
        return exerciseService.createExercise(request);
    }

    // PUT /api/exercises/{id}
    // updates an existing exercise
    @PutMapping("/{id}")
    public ExerciseResponseDTO updateExercise(@PathVariable Long id, @RequestBody ExerciseCreateRequestDTO request) {
        return exerciseService.updateExercise(id, request);
    }
}