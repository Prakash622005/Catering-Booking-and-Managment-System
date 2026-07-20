package com.catering.booking_service.dto;

import com.catering.booking_service.enums.EventType;

import lombok.Data;

import java.util.List;

@Data
public class BookingRequest {

    private Long customerId;

    private EventType eventType;

    private String eventLocation;

    private String specialInstructions;

    private List<MealSessionRequest> mealSessions;
}