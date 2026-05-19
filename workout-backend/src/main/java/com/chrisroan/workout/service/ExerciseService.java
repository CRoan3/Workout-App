package com.chrisroan.workout.service;

import com.chrisroan.workout.domain.Exercise;
import com.chrisroan.workout.repository.ExerciseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

// Marks this class as a Spring service component
@Service
public class ExerciseService {

    // Repository used to interact with the database
    private final ExerciseRepository exerciseRepository;

    // Constructor injection of the repository
    public ExerciseService(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    // Returns all exercises from the database
    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }

    // Returns a single exercise by ID
    public Exercise getExerciseById(Long id) {

        // Find exercise or throw exception if not found
        return exerciseRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Exercise not found with id: " + id));
    }
}