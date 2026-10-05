package com.chrisroan.workout.domain;
import jakarta.persistence.*;

// Represents one coaching tip for an exercise
@Entity
@Table(name = "exercise_tips")
public class ExerciseTip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // the actual tip text
    @Column(nullable = false)
    private String tip;

    // Determines the display order in the UI
    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder;

    // many tips belong to one exercise
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_id", nullable = false)
    private Exercise exercise;

    public Long getId() {
        return id;
    }

    public String getTip() {
        return tip;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }

}
