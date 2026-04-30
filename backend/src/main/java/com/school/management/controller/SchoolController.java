package com.school.management.controller;

import com.school.management.model.Student;
import com.school.management.repository.StudentRepository;
import com.school.management.repository.LessonRepository;
import com.school.management.service.PerformanceService;
import com.school.management.service.CampusMapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class SchoolController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private PerformanceService performanceService;

    @Autowired
    private CampusMapService campusMapService;

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("students", studentRepository.count());
        stats.put("teachers", 24); // Constant or fetch from teacherRepo if it existed
        stats.put("lessons", lessonRepository.count());
        stats.put("avgAttendance", 94.2);
        return stats;
    }

    @GetMapping("/students")
    public List<Student> getStudents(@RequestParam(defaultValue = "") String search) {
        if (search.isEmpty()) {
            return studentRepository.findAll();
        } else {
            return studentRepository.searchStudents(search);
        }
    }

    @GetMapping("/grades/predict")
    public List<Map<String, Object>> predictGrades() {
        String[] subjects = {"Mathematics", "Physics", "Chemistry", "English", "Computer Science", "Biology"};
        String[] colors = {"#f5c842", "#2dd4bf", "#a78bfa", "#fb7185", "#4ade80", "#f59e0b"};
        
        List<Map<String, Object>> results = new ArrayList<>();
        for (int i = 0; i < subjects.length; i++) {
            Map<String, Object> prediction = performanceService.predictPerformance(subjects[i]);
            prediction.put("color", colors[i]);
            results.add(prediction);
        }
        return results;
    }

    @GetMapping("/learning-path/{subject}")
    public List<String> getLearningPath(@PathVariable String subject) {
        return performanceService.getLearningPath(subject);
    }

    @GetMapping("/campus/shortest-path")
    public Map<String, Object> getShortestPath(@RequestParam String start, @RequestParam String end) {
        return campusMapService.getShortestPath(start, end);
    }
}
