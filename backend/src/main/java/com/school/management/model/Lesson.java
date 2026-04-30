package com.school.management.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "lessons")
public class Lesson {
    @Id
    private String id;
    private String day;
    private String time;
    private String subject;
    private String teacher;
    private String room;
    private String color;
}
