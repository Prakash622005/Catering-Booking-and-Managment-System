package com.catering.booking_service.dto;

import com.catering.booking_service.enums.MealType;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class MealSessionRequest {

    private MealType mealType;

    private LocalDate mealDate;

    private Integer guestCount;

    private List<Long> foodIds;
}