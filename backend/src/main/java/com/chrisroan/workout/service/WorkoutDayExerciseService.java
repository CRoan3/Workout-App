package com.chrisroan.workout.service;

import com.chrisroan.workout.domain.Exercise;
import com.chrisroan.workout.domain.WorkoutDay;
import com.chrisroan.workout.domain.WorkoutDayExercise;
import com.chrisroan.workout.dto.WorkoutDayExerciseCreateRequestDTO;
import com.chrisroan.workout.dto.WorkoutDayExerciseResponseDTO;
import com.chrisroan.workout.repository.ExerciseRepository;
import com.chrisroan.workout.repository.WorkoutDayExerciseRepository;
import com.chrisroan.workout.repository.WorkoutDayRepository;
import org.springframework.stereotype.Service;


//Request DTO gives the service instructions. Entity is what the service creates and saves. Response DTO is what the service builds afterward to send back out.
@Service
public class WorkoutDayExerciseService {

    private final WorkoutDayRepository workoutDayRepository;     //retrieves parent day

    private final ExerciseRepository exerciseRepository;         //retrieves the library exercise

    private final WorkoutDayExerciseRepository workoutDayExerciseRepository;     //saves the new relationship assignment

    public WorkoutDayExerciseService(
            WorkoutDayExerciseRepository workoutDayExerciseRepository,
            WorkoutDayRepository workoutDayRepository,
            ExerciseRepository exerciseRepository
    ) {
        this.workoutDayExerciseRepository = workoutDayExerciseRepository;
        this.workoutDayRepository = workoutDayRepository;
        this.exerciseRepository = exerciseRepository;
    }

    public WorkoutDayExerciseResponseDTO addExerciseToWorkoutDay(
            Long workoutDayId,
            WorkoutDayExerciseCreateRequestDTO request
    ) {
        WorkoutDay workoutDay = workoutDayRepository.findById(workoutDayId)
                .orElseThrow(() ->
                        new RuntimeException("Workout day not found with id: " + workoutDayId)
                );
        Exercise exercise = exerciseRepository.findById(request.getExerciseId())
                .orElseThrow(() ->
                        new RuntimeException("Exercise not found with id: " + request.getExerciseId())
                );

        WorkoutDayExercise assignment = new WorkoutDayExercise();

        assignment.setWorkoutDay(workoutDay);
        assignment.setExercise(exercise);
        assignment.setExerciseOrder(request.getExerciseOrder());
        assignment.setSets(request.getSets());
        assignment.setReps(request.getReps());
        assignment.setRestSeconds(request.getRestSeconds());
        assignment.setNotes(request.getNotes());

        WorkoutDayExercise savedAssignment = workoutDayExerciseRepository.save(assignment);

        return mapToDTO(savedAssignment);
    }

    private WorkoutDayExerciseResponseDTO mapToDTO(
            WorkoutDayExercise assignment
    ) {
        return new WorkoutDayExerciseResponseDTO(
                assignment.getId(),
                assignment.getWorkoutDay().getId(),
                assignment.getExercise().getId(),
                assignment.getExercise().getName(),
                assignment.getExerciseOrder(),
                assignment.getSets(),
                assignment.getReps(),
                assignment.getRestSeconds(),
                assignment.getNotes()
        );
    }
}
