package com.school.management.service;

import com.school.management.model.Grade;
import com.school.management.repository.GradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PerformanceService {

    @Autowired
    private GradeRepository gradeRepository;

    /**
     * Algorithm: Linear Regression
     * Predicts the next term score based on historical performance.
     */
    public Map<String, Object> predictPerformance(String subject) {
        List<Grade> grades = gradeRepository.findBySubjectOrderByTermAsc(subject);
        
        double sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
        int n = grades.size();
        double lastScore = 0;

        for (Grade g : grades) {
            int x = g.getTerm();
            double y = g.getScore();
            sumX += x;
            sumY += y;
            sumXY += (x * y);
            sumXX += (x * x);
            lastScore = y;
        }

        int predicted = (int) Math.round(lastScore);
        String trend = "stable";
        double slope = 0;

        if (n > 1) {
            double denominator = (n * sumXX - sumX * sumX);
            if (denominator != 0) {
                slope = (n * sumXY - sumX * sumY) / denominator;
                double intercept = (sumY - slope * sumX) / n;
                predicted = Math.min(100, Math.max(0, (int) Math.round(slope * (n + 1) + intercept)));
                if (slope > 1.5) trend = "up";
                else if (slope < -1.5) trend = "down";
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("subject", subject);
        result.put("currentScore", (int) Math.round(lastScore));
        result.put("predictedNextTerm", predicted);
        result.put("trend", trend);
        result.put("slope", slope);
        return result;
    }

    /**
     * Algorithm: Priority Queue / Heap
     * Returns top students based on GPA.
     */
    public List<Map<String, Object>> getTopPerformers(int limit) {
        // Mocking some data for demonstration if DB is empty, 
        // but normally would fetch from studentRepository
        return Collections.emptyList(); // Placeholder
    }

    /**
     * Algorithm: Graph-based Subject Dependency
     * This is a conceptual DSA implementation.
     * It builds a dependency graph of subjects and finds the "Learning Path" using BFS/DFS.
     */
    public List<String> getLearningPath(String targetSubject) {
        Map<String, List<String>> adj = new HashMap<>();
        adj.put("Mathematics", List.of("Physics", "Computer Science"));
        adj.put("Physics", List.of("Advanced Mechanics"));
        adj.put("Chemistry", List.of("Biology"));
        
        // BFS to find dependencies
        Queue<String> queue = new LinkedList<>();
        queue.add(targetSubject);
        List<String> path = new ArrayList<>();
        Set<String> visited = new HashSet<>();
        
        while (!queue.isEmpty()) {
            String curr = queue.poll();
            if (!visited.contains(curr)) {
                visited.add(curr);
                path.add(curr);
                List<String> deps = adj.getOrDefault(curr, Collections.emptyList());
                for (String d : deps) {
                    queue.add(d);
                }
            }
        }
        return path;
    }
}
