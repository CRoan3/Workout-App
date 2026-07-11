package com.chrisroan.workout.domain;

import jakarta.persistence.*;

import java.time.OffsetDateTime;
import  java.util.ArrayList;
import java.util.List;

// Represents an entire workout program, such as Push/PulL/Legs
@Entity
@Table(name = "workout_plans")
public class WorkoutPlan {
    // Primary key gen by PostgreSQL
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // User-facing name of the workout plan
    @Column(nullable = false)
    private String name;

    // Optional explanation or notes about the plan
    @Column
    private String description;

    // Set automatically by PostgreSQL when the plan is created
    @Column(name = "created_at", insertable = false, nullable = false)
    private OffsetDateTime createdAt;

    // Set automatically by PostgreSQL when the plan is created
    @Column(name = "updated_at", insertable = false, nullable = false)
    private OffsetDateTime updatedAt;

    // One workout plan contains multiple workout days
    @OneToMany(
            mappedBy = "workoutPlan",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY   //days are only loaded when getDays() is called. This avoids unnecessary database work
    )
    @OrderBy("dayOrder ASC")
    private List<WorkoutDay> days = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public OffsetDateTime getUpdatedAt() {
        return updatedAt;
    }

    public List<WorkoutDay> getDays() {
        return days;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
