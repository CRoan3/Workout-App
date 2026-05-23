package com.chrisroan.workout.service;

import com.chrisroan.workout.domain.Exercise;
import com.chrisroan.workout.dto.ExerciseResponseDTO;
import com.chrisroan.workout.repository.ExerciseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

// Marks this class as a Spring service component. Handles business logic for exercises ("what needs to be done")
@Service
public class ExerciseService {

    // Repository used to interact with the database
    private final ExerciseRepository exerciseRepository;

    // Constructor injection of the repository
    public ExerciseService(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    // Returns all exercises as DTOs instead of raw entities
    public List<ExerciseResponseDTO> getAllExercises() {
        return exerciseRepository.findAll().stream().map(this::mapToDTO).toList();
    }

    // Returns a single exercise by ID as a DTO
    public ExerciseResponseDTO getExerciseById(Long id) {
        Exercise exercise = exerciseRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Exercise not found with id: " + id));

        return mapToDTO(exercise);
    }

    //helper method: converts an Exercise entity into a frontend-friendly DTO
    private ExerciseResponseDTO mapToDTO(Exercise exercise) {
        return new ExerciseResponseDTO(
                exercise.getId(),
                exercise.getName(),
                exercise.getUrl(),
                exercise.getDescription(),
                exercise.getCreatedAt().toInstant(),
                exercise.getUpdatedAt().toInstant()
        );
    }
}