package com.chrisroan.workout.service;


import com.chrisroan.workout.domain.WorkoutPlan;
import com.chrisroan.workout.dto.WorkoutPlanCreateRequestDTO;
import com.chrisroan.workout.dto.WorkoutPlanResponseDTO;
import com.chrisroan.workout.repository.WorkoutPlanRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class WorkoutPlanService {

    private final WorkoutPlanRepository workoutPlanRepository;

    public WorkoutPlanService(WorkoutPlanRepository workoutPlanRepository) {
        this.workoutPlanRepository = workoutPlanRepository;
    }

    //service method that creates and saves a new workout plan (not a constructor per se, as it does not
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

    public List<WorkoutPlanResponseDTO> getAllWorkoutPlans() {
        return workoutPlanRepository.findAll()
                .stream()   //stream lets us process each item in the list
                .map(this::mapToDTO)
                .toList();
    }

    public WorkoutPlanResponseDTO getWorkoutPlanById(Long id) {
        WorkoutPlan workoutPlan = workoutPlanRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(HttpStatus.NOT_FOUND,
                                "Workout Plan not found with id: " + id));
        return mapToDTO(workoutPlan);
    }

    //mapping workout plan response to DTO. Should be private not public
    private WorkoutPlanResponseDTO mapToDTO (
            WorkoutPlan workoutPlan
    ) {
        return new WorkoutPlanResponseDTO(
                workoutPlan.getId(),
                workoutPlan.getName(),
                workoutPlan.getDescription(),
                workoutPlan.getCreatedAt(),
                workoutPlan.getUpdatedAt());
    }

}
