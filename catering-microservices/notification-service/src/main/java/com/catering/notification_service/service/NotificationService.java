package com.catering.notification_service.service;

import com.catering.notification_service.dto.*;
import com.catering.notification_service.entity.Notification;
import com.catering.notification_service.exception.ResourceNotFoundException;
import com.catering.notification_service.repository.NotificationRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationResponse sendNotification(
            NotificationRequest request) {

        Notification notification = new Notification();

        notification.setCustomerId(request.getCustomerId());
        notification.setBookingId(request.getBookingId());
        notification.setQuotationId(request.getQuotationId());
        notification.setPaymentId(request.getPaymentId());

        notification.setRecipient(request.getRecipient());
        notification.setSubject(request.getSubject());
        notification.setMessage(request.getMessage());

        notification.setNotificationType(
                request.getNotificationType()
        );

        return mapToResponse(
                notificationRepository.save(notification)
        );
    }

    public List<NotificationResponse> getAllNotifications() {

        return notificationRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public NotificationResponse getNotificationById(
            Long id) {

        Notification notification =
                notificationRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Notification Not Found"
                                ));

        return mapToResponse(notification);
    }

    public List<NotificationResponse>
    getNotificationsByCustomer(Long customerId) {

        return notificationRepository.findByCustomerId(
                        customerId
                )
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<NotificationResponse>
    getNotificationsByBooking(Long bookingId) {

        return notificationRepository.findByBookingId(
                        bookingId
                )
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private NotificationResponse mapToResponse(
            Notification notification) {

        return new NotificationResponse(

                notification.getNotificationId(),
                notification.getCustomerId(),
                notification.getBookingId(),
                notification.getQuotationId(),
                notification.getPaymentId(),
                notification.getRecipient(),
                notification.getSubject(),
                notification.getMessage(),
                notification.getNotificationType(),
                notification.getNotificationStatus()
        );
    }
}