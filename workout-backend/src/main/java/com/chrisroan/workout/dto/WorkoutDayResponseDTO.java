package com.chrisroan.workout.dto;

import java.time.DayOfWeek;
import java.time.OffsetDateTime;

public class WorkoutDayResponseDTO {
    private Long id;
    private Long workoutPlanId;
    private String name;
    private Integer dayOrder;
    private DayOfWeek dayOfWeek;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

    public WorkoutDayResponseDTO (
            Long id,
            Long workoutPlanId,
            String name,
            Integer dayOrder,
            DayOfWeek dayOfWeek,
            OffsetDateTime createdAt,
            OffsetDateTime updatedAt
    ) {
        this.id = id;
        this.workoutPlanId = workoutPlanId;
        this.name = name;
        this.dayOrder = dayOrder;
        this.dayOfWeek = dayOfWeek;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public Long getWorkoutPlanId() {
        return workoutPlanId;
    }

    public String getName() {
        return name;
    }

    public Integer getDayOrder() {
        return dayOrder;
    }

    public DayOfWeek getDayOfWeek() {
        return dayOfWeek;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public OffsetDateTime getUpdatedAt() {
        return updatedAt;
    }
}
