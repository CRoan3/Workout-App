package com.chrisroan.workout.dto;

public class WorkoutDayExerciseResponseDTO {
    private Long id;
    private Long workoutDayId;
    private Long exerciseId;
    private String exerciseName;
    private Integer exerciseOrder;
    private Integer sets;
    private String reps;
    private Integer restSeconds;
    private String notes;

    public WorkoutDayExerciseResponseDTO(
            Long id,
            Long workoutDayId,
            Long exerciseId,
            String exerciseName,
            Integer exerciseOrder,
            Integer sets,
            String reps,
            Integer restSeconds,
            String notes
    ) {
        this.id = id;
        this.workoutDayId = workoutDayId;
        this.exerciseId = exerciseId;
        this.exerciseName = exerciseName;
        this.exerciseOrder = exerciseOrder;
        this.sets = sets;
        this.reps = reps;
        this.restSeconds = restSeconds;
        this.notes = notes;
    }

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
