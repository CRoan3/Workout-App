package com.chrisroan.workout.repository;

import com.chrisroan.workout.domain.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExerciseRepository                 //repo must be an interface for Spring Data JPA, it will generate everything at run time
        extends JpaRepository<Exercise, Long> {
}
