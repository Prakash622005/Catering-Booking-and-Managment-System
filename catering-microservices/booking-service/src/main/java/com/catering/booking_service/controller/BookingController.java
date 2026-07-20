package com.catering.booking_service.controller;

import com.catering.booking_service.dto.BookingRequest;
import com.catering.booking_service.dto.BookingResponse;
import com.catering.booking_service.service.BookingService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public BookingResponse createBooking(
            @Valid @RequestBody BookingRequest request) {

        return bookingService.createBooking(request);
    }

    @GetMapping
    public List<BookingResponse> getAllBookings() {

        return bookingService.getAllBookings();
    }

    @GetMapping("/{id}")
    public BookingResponse getBookingById(
            @PathVariable Long id) {

        return bookingService.getBookingById(id);
    }

    @GetMapping("/customer/{customerId}")
    public List<BookingResponse> getCustomerBookings(
            @PathVariable Long customerId) {

        return bookingService.getCustomerBookings(customerId);
    }

    @PutMapping("/{id}/confirm")
    public ResponseEntity<String> confirmBooking(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                bookingService.confirmBooking(id)
        );
    }

    @PutMapping("/{id}/quotation-sent")
    public ResponseEntity<String> quotationSent(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                bookingService.quotationSent(id)
        );
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<String> rejectBooking(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                bookingService.rejectBooking(id)
        );
    }

    @PutMapping("/{id}/payment-completed")
    public ResponseEntity<String> paymentCompleted(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                bookingService.paymentCompleted(id)
        );
    }

    @GetMapping("/test")
    public String test() {

        return "Booking Service Running";
    }
}