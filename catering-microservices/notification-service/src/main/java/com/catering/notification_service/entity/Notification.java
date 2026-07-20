package com.catering.notification_service.entity;

import com.catering.notification_service.enums.*;

import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;

    private Long customerId;

    private Long bookingId;

    private Long quotationId;

    private Long paymentId;

    private String recipient;

    private String subject;

    @Column(length = 3000)
    private String message;

    @Enumerated(EnumType.STRING)
    private NotificationType notificationType;

    @Enumerated(EnumType.STRING)
    private NotificationStatus notificationStatus;

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {

        createdAt = LocalDateTime.now();

        notificationStatus = NotificationStatus.SENT;
    }
}