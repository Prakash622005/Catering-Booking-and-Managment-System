package com.catering.booking_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class MealSessionResponse {

    private Long sessionId;

    private String mealType;

    private LocalDate mealDate;

    private Integer guestCount;

    private List<Long> foodIds;
}