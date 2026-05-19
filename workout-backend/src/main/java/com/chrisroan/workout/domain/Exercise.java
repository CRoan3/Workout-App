package com.chrisroan.workout.domain;

import jakarta.persistence.*;

import java.time.Instant;
import java.time.OffsetDateTime;

@Entity
@Table(name = "exercises")
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column
    private String url;

    @Column
    private String description;

    @Column(name = "created_at", insertable = false, nullable = false)  //took out updatable = false, we need to have a db trigger
    private OffsetDateTime createdAt;

    @Column(name = "updated_at", insertable = false, nullable = false)   //took out updatable = false, we need to have a db trigger
    private OffsetDateTime updatedAt;


    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getUrl() {
        return url;
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

}
