package com.chrisroan.workout.service;


import com.chrisroan.workout.domain.WorkoutPlan;
import com.chrisroan.workout.dto.WorkoutPlanCreateRequestDTO;
import com.chrisroan.workout.dto.WorkoutPlanResponseDTO;
import com.chrisroan.workout.repository.WorkoutPlanRepository;
import org.springframework.stereotype.Service;

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
    private WorkoutPlanResponseDTO mapToDTO (
            WorkoutPlan workoutPlan
    ) {
        return new WorkoutPlanResponseDTO(
            workoutPlan.getId(), workoutPlan.getName(),
            workoutPlan.getDescription(), workoutPlan.getCreatedAt(),
            workoutPlan.getUpdatedAt());
    }

}
