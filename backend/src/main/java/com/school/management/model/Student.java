package com.school.management.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "students")
public class Student {
    @Id
    private String id;
    private String name;
    private String grade;
    private String roll;
    private Double gpa;
    private Integer att;
    private String status;
    private String color;
}
