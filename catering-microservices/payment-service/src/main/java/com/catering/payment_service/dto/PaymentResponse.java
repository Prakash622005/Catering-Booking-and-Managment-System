package com.catering.payment_service.dto;

import com.catering.payment_service.enums.*;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentResponse {

    private Long paymentId;

    private Long bookingId;

    private Long quotationId;

    private Long customerId;

    private Double amount;
    private String paymentType;

    private Double remainingAmount;

    private PaymentMethod paymentMethod;

    private PaymentStatus paymentStatus;

    private String transactionId;

    private String remarks;
}