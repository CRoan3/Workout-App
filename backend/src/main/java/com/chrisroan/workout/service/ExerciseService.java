package com.chrisroan.workout.service;

import com.chrisroan.workout.domain.Exercise;
import com.chrisroan.workout.dto.ExerciseCreateRequestDTO;
import com.chrisroan.workout.dto.ExerciseResponseDTO;
import com.chrisroan.workout.dto.ExerciseTipDTO;
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

        //Convert Tag entities into a list of tag names
        List<String> tags = exercise.getTags() == null
                ? List.of()
                : exercise.getTags()
                .stream()
                .map(tag -> tag.getName())
                .toList();

        // Convert ExerciseTip entities into tip DTOs
        List<ExerciseTipDTO> tips = exercise.getTips() == null
                ? List.of()
                : exercise.getTips()
                .stream()
                .map(tip -> new ExerciseTipDTO(
                        tip.getTip(),
                        tip.getSortOrder()
                ))
                .toList();


        return new ExerciseResponseDTO(
                exercise.getId(),
                exercise.getName(),
                exercise.getUrl(),
                exercise.getDescription(),
                exercise.getCreatedAt(),
                exercise.getUpdatedAt(),
                tags,
                tips
        );
    }

    // creates an exercise and returns the DTO
    public ExerciseResponseDTO createExercise(ExerciseCreateRequestDTO request) {
        //Create a new exercise entity
        Exercise exercise = new Exercise();

        //copy request data into the entity
        exercise.setName(request.getName());
        exercise.setDescription(request.getDescription());
        exercise.setUrl(request.getUrl());

        // save the entity to the database
        Exercise savedExercise = exerciseRepository.save(exercise);

        // convert saved entity into response DTO
        return new ExerciseResponseDTO(
                savedExercise.getId(),
                savedExercise.getName(),
                savedExercise.getUrl(),
                savedExercise.getDescription(),
                savedExercise.getCreatedAt(),
                savedExercise.getUpdatedAt(),
                List.of(),
                List.of()
        );
    }

    public ExerciseResponseDTO updateExercise(Long id, ExerciseCreateRequestDTO request) {
        //Find existing exercise first
        Exercise exercise = exerciseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exercise not found with id: " + id));

        //copy updated request data onto the existing entity
        exercise.setName(request.getName());
        exercise.setDescription(request.getDescription());
        exercise.setUrl(request.getUrl());

        //save the updated entity
        Exercise savedExercise = exerciseRepository.save(exercise);

        // re-fetch the exercise so db-triggered fields like updated_at are current
        Exercise refreshedExercise = exerciseRepository.findById(savedExercise.getId())
                .orElseThrow(() -> new RuntimeException("Exercise not found after update."));

        //return updated exercise as a DTO
        return mapToDTO(savedExercise);
    }
}