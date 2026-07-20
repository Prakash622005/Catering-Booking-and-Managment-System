package com.catering.booking_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class BookingResponse {

    private Long bookingId;

    private Long customerId;

    private String eventType;

    private String eventLocation;

    private String specialInstructions;

    private String bookingStatus;

    private String eventDate;

    private Integer breakfastGuestCount;

    private Integer lunchGuestCount;

    private Integer eveningGuestCount;

    private Integer dinnerGuestCount;

    private List<Long> menuItemIds;

    private List<MealSessionResponse> mealSessions;
}