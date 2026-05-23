package com.chrisroan.workout.dto;

import java.time.Instant;

public class ExerciseResponseDTO {
    private long id;
    private String name;
    private String url;
    private String description;
    private Instant createdAt;
    private Instant updatedAt;

    public ExerciseResponseDTO(Long id, String name, String url, String description, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public long getId() {
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

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }
}
