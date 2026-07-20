package com.catering.quotation_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SessionPriceResponse {

    private Long sessionId;

    private String mealType;

    private String mealDate;

    private Integer guestCount;

    private Double pricePerPlate;

    private Double amount;
}