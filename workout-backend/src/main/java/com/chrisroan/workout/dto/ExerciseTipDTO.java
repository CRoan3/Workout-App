package com.chrisroan.workout.dto;

// represents on exercise tip in the API response to display in frontend
public class ExerciseTipDTO {
    private String tip;
    private Integer sortOrder;

    // creates a DTO from tip text and display order
    public ExerciseTipDTO(String tip, Integer sortOrder) {
        this.tip = tip;
        this.sortOrder = sortOrder;
    }

    public String getTip() {
        return tip;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }
}
