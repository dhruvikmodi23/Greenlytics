package com.example.backend.models;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Collection;
import java.util.Set;

@Builder
@Data
@Document(collection = "users")
public class User {

    @Id
    private String id;

    @Field("username")
    private  String username;

    @Field("email")
    private String email;

    @Field("password")
    private String password;

    @Field("zip_code")
    private String zipCode;

    @Field("household_size")
    private int householdSize;

    @Field("diet_preference")
    private String dietPreference;

    @Field("roles")
    private Set<String> roles;

    @Field("achievements")
    private Set<String> achievements;
}
