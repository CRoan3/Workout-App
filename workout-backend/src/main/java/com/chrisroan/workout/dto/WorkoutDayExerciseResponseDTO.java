package com.chrisroan.workout.dto;

public class WorkoutDayExerciseCreateRequestDTO {
    private Long id;
    private Long workoutDayId;
    private Long exerciseId;
    private String exerciseName;
    private Integer exerciseOrder;
    private Integer sets;
    private String reps;
    private Integer restSeconds;
    private String notes;

    public Long getId() {
        return id;
    }

    public Long getWorkoutDayId() {
        return workoutDayId;
    }

    public Long getExerciseId() {
        return exerciseId;
    }

    public String getExerciseName() {
        return exerciseName;
    }

    public Integer getExerciseOrder() {
        return exerciseOrder;
    }

    public Integer getSets() {
        return sets;
    }

    public String getReps() {
        return reps;
    }
    public Integer getRestSeconds() {
        return restSeconds;
    }

    public String getNotes() {
        return notes;
    }


}
