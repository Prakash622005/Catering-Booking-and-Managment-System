package com.catering.notification_service.controller;

import com.catering.notification_service.dto.*;
import com.catering.notification_service.service.NotificationService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping
    public NotificationResponse sendNotification(
            @Valid @RequestBody NotificationRequest request) {

        return notificationService.sendNotification(
                request
        );
    }

    @GetMapping
    public List<NotificationResponse> getAllNotifications() {

        return notificationService.getAllNotifications();
    }

    @GetMapping("/{id}")
    public NotificationResponse getNotificationById(
            @PathVariable Long id) {

        return notificationService.getNotificationById(id);
    }

    @GetMapping("/customer/{customerId}")
    public List<NotificationResponse>
    getNotificationsByCustomer(
            @PathVariable Long customerId) {

        return notificationService
                .getNotificationsByCustomer(customerId);
    }

    @GetMapping("/booking/{bookingId}")
    public List<NotificationResponse>
    getNotificationsByBooking(
            @PathVariable Long bookingId) {

        return notificationService
                .getNotificationsByBooking(bookingId);
    }

    @GetMapping("/test")
    public String test() {

        return "Notification Service Running";
    }
}