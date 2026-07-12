package com.chrisroan.workout.domain;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "workout_days")
public class WorkoutDay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "day_order", nullable = false)  // order to execute the workout days in the exercise program
    private Integer dayOrder;

    @Column(name = "day_of_week")    // User will be able to assign the workout day to a day of the week
    private String dayOfWeek;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workout_plan_id", nullable = false)
    private WorkoutPlan workoutPlan;

    @OneToMany(
            mappedBy = "workoutDay",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    @OrderBy("exerciseOrder ASC")
    private List<WorkoutDayExercise> exercises = new ArrayList<>();

    // We do not need a setter for Id because the database generates that for us, users should never need to do it
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Integer getDayOrder() {
        return dayOrder;
    }

    public String getDayOfWeek() {
        return dayOfWeek;
    }

    public WorkoutPlan getWorkoutPlan() {
        return workoutPlan;
    }

    public List<WorkoutDayExercise> getExercises() {
        return exercises;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDayOrder(Integer dayOrder) {
        this.dayOrder = dayOrder;
    }

    public void setDayOfWeek(String dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public void setWorkoutPlan(WorkoutPlan workoutPlan) {
        this.workoutPlan = workoutPlan;
    }

    public void setExercises(List<WorkoutDayExercise> exercises) {
        this.exercises = exercises;
    }
}
