package com.chrisroan.workout.domain;
import jakarta.persistence.*;

// represents a row in the tags table
@Entity
@Table(name = "tags")
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // tag name(e.g. "chest", "barbell", or "compound")
    @Column(nullable = false, unique = true)
    private String name;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
