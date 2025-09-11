package com.example.backend.models;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;

@Builder
@Data
@Document(collection = "activity_logs")
public class ActivityLog {

    @Id
    private String id;

    @Field("user_id")
    private String userId;

    @Field("date")
    private LocalDate date;

    @Field("category")
    private ActivityCategory category;

    @Field("description")
    private String description;

    @Field("value")
    private double value;

    @Field("unit")
    private String unit;

    @Field("carbon_footprint_kg_co2e")
    private double carbonFootprintKgCO2e;

}
