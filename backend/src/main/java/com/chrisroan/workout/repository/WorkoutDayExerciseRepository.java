package com.chrisroan.workout.repository;

import com.chrisroan.workout.domain.WorkoutDayExercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutDayExerciseRepository extends JpaRepository<WorkoutDayExercise, Long>{
}
