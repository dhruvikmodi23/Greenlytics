package com.example.backend.service;

import com.example.backend.models.ActivityCategory;
import com.example.backend.models.ActivityLog;
import com.example.backend.models.User;
import com.example.backend.payload.ActivityRequest;
import com.example.backend.payload.DashboardDataResponse;
import com.example.backend.repository.ActivityLogRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityLogRepository activityLogRepository;
    private final UserRepository userRepository;
    private final CarbonCalculationService carbonCalculationService;

    public void logActivity(String userEmail , ActivityRequest request){
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        double carbonFootprint = carbonCalculationService.calculateFootprint(request.getCategory() , request.getValue(), request.getSubType());

        ActivityLog activityLog = ActivityLog.builder()
                .userId(user.getId())
                .category(request.getCategory())
                .value(request.getValue())
                .subType(request.getSubType())
                .carbonFootprintKgCO2e(carbonFootprint)
                .date(LocalDate.now(ZoneId.of("UTC")))
                .build();

        activityLogRepository.save(activityLog);
    }

    public DashboardDataResponse getDashboardData(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        LocalDate today = LocalDate.now(ZoneId.of("UTC"));
        LocalDate startOfThisWeek = today.minusDays(today.getDayOfWeek().getValue() - 1);
        LocalDate startOfLastWeek = startOfThisWeek.minusWeeks(1);

        List<ActivityLog> thisWeekLogs = activityLogRepository.findByUserIdAndDateBetween(user.getId(), startOfThisWeek, today);
        List<ActivityLog> lastWeekLogs = activityLogRepository.findByUserIdAndDateBetween(user.getId(), startOfLastWeek, startOfThisWeek.minusDays(1));

        double thisWeekFootprint = thisWeekLogs.stream().mapToDouble(ActivityLog::getCarbonFootprintKgCO2e).sum();
        double lastWeekFootprint = lastWeekLogs.stream().mapToDouble(ActivityLog::getCarbonFootprintKgCO2e).sum();

        Map<ActivityCategory, Double> categoryBreakdown = thisWeekLogs.stream()
                .collect(Collectors.groupingBy(
                        ActivityLog::getCategory,
                        Collectors.summingDouble(ActivityLog::getCarbonFootprintKgCO2e)
                ));

        return DashboardDataResponse.builder()
                .thisWeekFootprint(thisWeekFootprint)
                .lastWeekFootprint(lastWeekFootprint)
                .categoryBreakdown(categoryBreakdown)
                .build();
    }
}
