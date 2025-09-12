package com.example.backend.service;


import com.example.backend.models.ActivityCategory;
import com.example.backend.models.ActivityLog;
import com.example.backend.models.User;

import com.example.backend.payload.DashboardDataResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class RecommendationService {
    
    private static final double HIGH_FOOTPRINT_THRESHOLD = 50.0; // kg CO2e

    public List<String> generateRecommendations(User user, DashboardDataResponse dashboardData) {
        List<String> recommendations = new ArrayList<>();
        Map<ActivityCategory, Double> breakdown = dashboardData.getCategoryBreakdown();

        // Find the category with the highest contribution
        ActivityCategory highestCategory = breakdown.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse(null);

        if (highestCategory == null || dashboardData.getThisWeekFootprint() <= 0) {
            recommendations.add("Log your first activity to get personalized recommendations!");
            return recommendations;
        }

        // Rule-based recommendations
        if (dashboardData.getThisWeekFootprint() > HIGH_FOOTPRINT_THRESHOLD) {
            recommendations.add("Your weekly footprint is a bit high. Look for small changes you can make each day!");
        }

        switch (highestCategory) {
            case TRANSPORTATION:
                recommendations.add("Your biggest impact is from transportation. Could you swap one car trip for a bus or train ride this week?");
                break;
            case DIET:
                recommendations.add("Diet is your main footprint source. Swapping one red meat meal for a vegetarian option can make a big difference.");
                break;
            case ENERGY:
                recommendations.add("Energy usage is your top category. Remember to unplug electronics when not in use to reduce your passive consumption.");
                break;
            case SHOPPING:
                recommendations.add("Shopping contributes significantly to your footprint. Considering second-hand options for items like electronics or clothing can help.");
                break;
        }

        if(user.getAchievements() != null && user.getAchievements().contains("FIRST_LOG")) {
            recommendations.add("Great job on logging your first activity! Consistency is key to understanding your impact.");
        }

        return recommendations;
    }
}
