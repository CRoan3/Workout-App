package com.chrisroan.workout.dto;

// Data received from frontend when creating a workout plan
public class WorkoutPlanCreateRequestDTO {
    private String name;
    private String description;

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }
}
