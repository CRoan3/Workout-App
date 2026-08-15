package com.chrisroan.workout.dto;

public class WorkoutDayExerciseCreateRequestDTO {
    private Long exerciseId;
    private Integer exerciseOrder;
    private Integer sets;
    private String reps;
    private Integer restSeconds;
    private String notes;

    public Long getExerciseId() {
        return exerciseId;
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

    public void setExerciseId(Long exerciseId) {
       this.exerciseId = exerciseId;
    }

    public void setExerciseOrder(Integer exerciseOrder) {
        this.exerciseOrder = exerciseOrder;
    }

    public void setSets(Integer sets) {
        this.sets = sets;
    }

    public void setReps(String reps) {
        this.reps = reps;
    }

    public void setRestSeconds(Integer restSeconds) {
       this.restSeconds = restSeconds;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

}
