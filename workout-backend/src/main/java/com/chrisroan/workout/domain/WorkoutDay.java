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

    // getters & setters....
}
