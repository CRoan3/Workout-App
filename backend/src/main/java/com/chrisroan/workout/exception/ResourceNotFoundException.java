package com.chrisroan.workout.exception;

//thrown when a requested entity (exercise, plan, day, etc.) is not found in the database
// GlobalExceptionHandler turns this into a 404 response.
//extends RuntimeException so that it can be thrown without being declared in a method signature
public class ResourceNotFoundException extends RuntimeException {    
    public ResourceNotFoundException(String resourceName, Long id) {
        super(resourceName + " not found with id: " + id);
    }
}