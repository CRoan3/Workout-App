package com.chrisroan.workout.dto;

import java.time.OffsetDateTime;
import java.util.List;


// Data shape sent from backend to frontend for an exercise
public class ExerciseResponseDTO {
    private Long id;
    private String name;
    private String url;
    private String description;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

    private List<String> tags;
    private List<ExerciseTipDTO> tips;

    public ExerciseResponseDTO(Long id, String name, String url, String description, OffsetDateTime createdAt, OffsetDateTime updatedAt, List<String> tags, List<ExerciseTipDTO> tips) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.tags = tags;
        this.tips = tips;
    }

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

    public List<String> getTags() {
        return tags;
    }

    public List<ExerciseTipDTO> getTips() {
        return tips;
    }
}
