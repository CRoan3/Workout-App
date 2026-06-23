package com.chrisroan.workout.dto;

import java.time.Instant;
import java.util.List;


// Data shape sent from frontend to backend for an exercise
public class ExerciseResponseDTO {
    private long id;
    private String name;
    private String url;
    private String description;
    private Instant createdAt;
    private Instant updatedAt;

    private List<String> tags;
    private List<ExerciseTipDTO> tips;

    public ExerciseResponseDTO(Long id, String name, String url, String description, Instant createdAt, Instant updatedAt, List<String> tags, List<ExerciseTipDTO> tips) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.tags = tags;
        this.tips = tips;
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

    public List<String> getTags() {
        return tags;
    }

    public List<ExerciseTipDTO> getTips() {
        return tips;
    }
}
