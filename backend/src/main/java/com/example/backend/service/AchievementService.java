package com.example.backend.service;

import com.example.backend.models.ActivityLog;
import com.example.backend.models.User;

import com.example.backend.repository.ActivityLogRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.HashSet;
import java.util.List;


enum Achievement {
    FIRST_LOG("First Log!", "You've started your journey by logging your first activity."),
    GREEN_COMMUTER("Green Commuter", "You logged over 50km of public transport usage."),
    VEGGIE_ENTHUSIAST("Veggie Enthusiast", "You've logged 5 vegetarian or vegan meals."),
    CONSISTENT_LOGGER("Consistent Logger", "You logged an activity on three different days.");

    public final String title;
    public final String description;

    Achievement(String title, String description) {
        this.title = title;
        this.description = description;
    }
}

@Service
public class AchievementService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ActivityLogRepository activityLogRepository;

    public void checkAndAwardAchievements(User user, ActivityLog newActivity) {
        if (user.getAchievements() == null) {
            user.setAchievements(new HashSet<>());
        }

        // 1. First Log Achievement
        if (!user.getAchievements().contains(Achievement.FIRST_LOG.name())) {
            user.getAchievements().add(Achievement.FIRST_LOG.name());
        }

        // Fetch all user activities to check for other achievements
        List<ActivityLog> allActivities = activityLogRepository.findByuserId(user.getId());

        // 2. Green Commuter
        if (!user.getAchievements().contains(Achievement.GREEN_COMMUTER.name())) {
            double publicTransportKm = allActivities.stream()
                    .filter(a -> "TRANSPORTATION".equals(a.getCategory()) && ("bus".equals(a.getSubType()) || "train".equals(a.getSubType())))
                    .mapToDouble(ActivityLog::getValue)
                    .sum();
            if (publicTransportKm >= 50) {
                user.getAchievements().add(Achievement.GREEN_COMMUTER.name());
            }
        }

        // 3. Veggie Enthusiast
        if (!user.getAchievements().contains(Achievement.VEGGIE_ENTHUSIAST.name())) {
            long veggieMeals = allActivities.stream()
                    .filter(a -> "DIET".equals(a.getCategory()) && ("vegetarian_meal".equals(a.getSubType()) || "vegan_meal".equals(a.getSubType())))
                    .count();
            if (veggieMeals >= 5) {
                user.getAchievements().add(Achievement.VEGGIE_ENTHUSIAST.name());
            }
        }

        userRepository.save(user); // Save any new achievements
    }
}
