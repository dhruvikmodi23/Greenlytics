package com.example.backend.payload;

import com.example.backend.models.ActivityCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ActivityRequest {
    private ActivityCategory category;
    private double value;
    private String subType;

}
