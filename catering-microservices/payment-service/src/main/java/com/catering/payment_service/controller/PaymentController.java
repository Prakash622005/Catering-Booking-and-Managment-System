package com.catering.payment_service.controller;

import com.catering.payment_service.dto.PaymentRequest;
import com.catering.payment_service.dto.PaymentResponse;
import com.catering.payment_service.service.PaymentService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    // CREATE / UPDATE RECEIPT

    @PostMapping
    public PaymentResponse makePayment(
            @Valid
            @RequestBody
            PaymentRequest request
    ) {

        return paymentService.makePayment(
                request
        );
    }

    // GET ALL PAYMENTS

    @GetMapping
    public List<PaymentResponse>
    getAllPayments() {

        return paymentService
                .getAllPayments();
    }

    // GET PAYMENT BY ID

    @GetMapping("/{id}")
    public PaymentResponse
    getPaymentById(
            @PathVariable Long id
    ) {

        return paymentService
                .getPaymentById(id);
    }

    // GET PAYMENT BY BOOKING

    @GetMapping("/booking/{bookingId}")
    public PaymentResponse
    getPaymentByBooking(
            @PathVariable Long bookingId
    ) {

        return paymentService
                .getPaymentByBooking(
                        bookingId
                );
    }

    // TEST

    @GetMapping("/test")
    public String test() {

        return
                "PAYMENT SERVICE RUNNING";
    }
}