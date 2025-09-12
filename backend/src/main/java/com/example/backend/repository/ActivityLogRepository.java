package com.example.backend.repository;

import com.example.backend.models.ActivityLog;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;

public interface ActivityLogRepository extends MongoRepository<ActivityLog,String> {

    List<ActivityLog> findByuserId(String userId);

    List<ActivityLog> findByUserIdAndDateBetween(String userId, LocalDate startDate, LocalDate endDate);

    List<ActivityLog> findByUsername(String username);

}
