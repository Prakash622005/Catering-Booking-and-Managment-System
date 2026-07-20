package com.catering.quotation_service.dto;

import lombok.Data;

@Data
public class SessionPriceRequest {

    private Long sessionId;

    private String mealType;

    private String mealDate;

    private Integer guestCount;

    private Double pricePerPlate;

    private Double amount;
}