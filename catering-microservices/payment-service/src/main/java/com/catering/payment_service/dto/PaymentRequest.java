package com.catering.payment_service.dto;

import com.catering.payment_service.enums.PaymentMethod;

import jakarta.validation.constraints.*;

import lombok.Data;

@Data
public class PaymentRequest {

    @NotNull
    private Long bookingId;

    @NotNull
    private Long quotationId;

    @NotNull
    private Long customerId;

    private String paymentType;

    private Double remainingAmount;

    @Positive
    private Double amount;

    @NotNull
    private PaymentMethod paymentMethod;

    private String remarks;
}