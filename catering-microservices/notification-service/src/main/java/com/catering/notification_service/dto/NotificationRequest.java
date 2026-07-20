package com.catering.notification_service.dto;

import com.catering.notification_service.enums.NotificationType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.Data;

@Data
public class NotificationRequest {

    private Long customerId;

    private Long bookingId;

    private Long quotationId;

    private Long paymentId;

    @NotBlank
    private String recipient;

    @NotBlank
    private String subject;

    @NotBlank
    private String message;

    @NotNull
    private NotificationType notificationType;
}