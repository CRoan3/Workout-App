package com.chrisroan.workout.service;

import com.chrisroan.workout.domain.Exercise;
import com.chrisroan.workout.dto.ExerciseCreateRequestDTO;
import com.chrisroan.workout.domain.WorkoutPlan;
import com.chrisroan.workout.dto.ExerciseResponseDTO;
import com.chrisroan.workout.dto.WorkoutPlanCreateRequestDTO;
import com.chrisroan.workout.dto.WorkoutPlanResponseDTO;
import com.chrisroan.workout.dto.ExerciseTipDTO;
import com.chrisroan.workout.repository.ExerciseRepository;
import com.chrisroan.workout.repository.WorkoutPlanRepository;
import com.chrisroan.workout.repository.WorkoutDayRepository;
import com.chrisroan.workout.repository.WorkoutDayExerciseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutPlanService {

    private final WorkoutPlanRepository workoutPlanRepository;

    public WorkoutPlanService(WorkoutPlanRepository workoutPlanRepository) {
        this.workoutPlanRepository = workoutPlanRepository;
    }

    //constructor for the workout plan
    public WorkoutPlanResponseDTO createWorkoutPlan (
            WorkoutPlanCreateRequestDTO request
    ) {
        //create a new domain entity
        WorkoutPlan workoutPlan = new WorkoutPlan();

        //copy request data into the entity
        workoutPlan.setName(request.getName());
        workoutPlan.setDescription(request.getDescription());

        //save the entity to PostgreSQL
        WorkoutPlan savedWorkoutPlan =
                workoutPlanRepository.save(workoutPlan);

        return mapToDTO(savedWorkoutPlan);
    }

    //mapping workout plan response to DTO
    public WorkoutPlanResponseDTO mapToDTO (
            WorkoutPlan workoutPlan
    ) {
        return new WorkoutPlanResponseDTO(
            workoutPlan.getId(), workoutPlan.getName(),
            workoutPlan.getDescription(), workoutPlan.getCreatedAt(),
            workoutPlan.getUpdatedAt());
    }

}
