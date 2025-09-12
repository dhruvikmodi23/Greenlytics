package com.example.backend.service;

import com.example.backend.models.ActivityCategory;
import org.springframework.data.mongodb.core.aggregation.ConditionalOperators;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CarbonCalculationService {

    private static final Map<String, Double> TRANSPORTATION_FACTORS = Map.of(
            "petrol_car", 0.17,
            "electric_car", 0.05,
            "bus", 0.10,
            "train", 0.04
    );

    private static final Map<String, Double> DIET_FACTORS = Map.of(
            "beef_meal", 2.5,
            "chicken_meal", 0.7,
            "vegetarian_meal", 0.4,
            "vegan_meal", 0.2
    );

    private static final double ENERGY_FACTORS = 0.23;
    private static final double SHOPPING_FACTORS = 5.0;

    public double calculateFootprint(ActivityCategory category, double value, String subType){
        return switch (category){
            case TRANSPORTATION -> TRANSPORTATION_FACTORS.getOrDefault(subType,0.0) * value;
            case DIET -> DIET_FACTORS.getOrDefault(subType,0.0) * value;
            case ENERGY -> ENERGY_FACTORS * value;
            case SHOPPING -> SHOPPING_FACTORS * value;
        };
    }
}
