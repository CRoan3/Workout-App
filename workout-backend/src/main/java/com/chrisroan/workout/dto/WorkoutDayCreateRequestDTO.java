package com.chrisroan.workout.dto;

import java.time.DayOfWeek;

public class WorkoutDayCreateRequestDTO {
    private String name;
    private Integer dayOrder;
    private DayOfWeek dayOfWeek;

    public String getName() {
        return name;
    }

    public Integer getDayOrder() {
        return dayOrder;
    }

    public DayOfWeek getDayOfWeek() {
        return dayOfWeek;
    }

    //need setters to populate the object from the incoming JSON
    public void setName(String name) {
        this.name = name;
    }

    public void setDayOrder(Integer dayOrder) {
        this.dayOrder = dayOrder;
    }

    public void setDayOfWeek(DayOfWeek dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }
}
