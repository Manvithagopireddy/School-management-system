package com.school.management.repository;

import com.school.management.model.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Map;

public interface GradeRepository extends JpaRepository<Grade, Long> {
    List<Grade> findBySubjectOrderByTermAsc(String subject);
    
    @Query("SELECT g.subject as subject, g.term as term, AVG(g.score) as avgScore FROM Grade g GROUP BY g.subject, g.term ORDER BY g.subject, g.term")
    List<Map<String, Object>> getAverageScoresPerSubjectAndTerm();
}
