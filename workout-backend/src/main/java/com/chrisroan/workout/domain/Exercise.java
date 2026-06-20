package com.chrisroan.workout.domain;

import jakarta.persistence.*;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.List;

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

    // one exercise can have many coaching tips
    @OneToMany(mappedBy = "exercise", fetch  = FetchType.LAZY)
    @OrderBy("sortOrder ASC")
    private List<ExerciseTip> tips;

    // one exercise can have many tags, and each tag can belong to many exercises
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "exercise_tags",
            joinColumns = @JoinColumn(name = "exercise_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<Tag> tags;

    public List<ExerciseTip> getTips() {
        return tips;
    }

    public List<Tag> getTags() {
        return tags;
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

}
