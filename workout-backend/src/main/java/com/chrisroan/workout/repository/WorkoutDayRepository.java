package com.chrisroan.workout.repository;

import com.chrisroan.workout.domain.WorkoutDay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutDayRepository extends JpaRepository<WorkoutDay, Long>{
}
