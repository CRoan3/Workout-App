package com.chrisroan.workout.dto;

// Data received from the frontend when creating a new exercise
public class ExerciseCreateRequestDTO {
    private String name;
    private String description;
    private String url;

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getUrl() {
        return url;
    }
}
