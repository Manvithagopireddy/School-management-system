package com.school.management.repository;

import com.school.management.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, String> {
    List<Lesson> findAllByOrderByDayAscTimeAsc();
}
