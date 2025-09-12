package com.example.backend.payload;


import com.example.backend.models.ActivityCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardDataResponse {

    private double thisWeekFootprint;

    private double lastWeekFootprint;

    private Map<ActivityCategory, Double> categoryBreakdown;
}
