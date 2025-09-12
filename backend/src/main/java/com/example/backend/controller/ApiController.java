package com.example.backend.controller;

import com.example.backend.payload.ActivityRequest;
import com.example.backend.payload.DashboardDataResponse;
import com.example.backend.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ApiController {

    private final ActivityService activityService;

    @PostMapping("/activities")
    public ResponseEntity<?> logActivity(
            @RequestBody ActivityRequest activityRequest,
            @AuthenticationPrincipal UserDetails userDetails
            ){
        activityService.logActivity(userDetails.getUsername(), activityRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardDataResponse> getDashboardData(
            @AuthenticationPrincipal UserDetails userDetails) {
        DashboardDataResponse data = activityService.getDashboardData(userDetails.getUsername());
        return ResponseEntity.ok(data);
    }

}
