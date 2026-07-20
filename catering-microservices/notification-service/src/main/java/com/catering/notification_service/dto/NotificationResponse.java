package com.catering.notification_service.dto;

import com.catering.notification_service.enums.*;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationResponse {

    private Long notificationId;

    private Long customerId;

    private Long bookingId;

    private Long quotationId;

    private Long paymentId;

    private String recipient;

    private String subject;

    private String message;

    private NotificationType notificationType;

    private NotificationStatus notificationStatus;
}