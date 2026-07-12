package com.chrisroan.workout.domain;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name =  "workout_day_exercises")
public class WorkoutDayExercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many exercise assignments can belong to one workout day
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workout_day_id", nullable = false)
    private WorkoutDay workoutDay;

    //Many exercise assignments can reference one library exercise
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    // Position of the exercise inside the workout day (what exercise gets executed and when)
    @Column(name = "exercise_order", nullable = false)
    private Integer exerciseOrder;

    // Number of prescribed sets
    @Column
    private Integer sets;

    // Rep target
    @Column
    private String reps;

    // Rest period between sets, measured in seconds
    @Column(name = "rest_seconds")
    private Integer restSeconds;

    // Optional specific instructions for this exercise assignment
    @Column
    private String notes;

    public Long getId() {
        return id;
    }

    public WorkoutDay getWorkoutDay() {
        return workoutDay;
    }

    public Exercise getExercise() {
        return exercise;
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

    public void setWorkoutDay(WorkoutDay workoutDay) {
        this.workoutDay = workoutDay;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
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