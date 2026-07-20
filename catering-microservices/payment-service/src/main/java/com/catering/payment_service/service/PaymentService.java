package com.catering.payment_service.service;

import com.catering.payment_service.dto.PaymentRequest;
import com.catering.payment_service.dto.PaymentResponse;
import com.catering.payment_service.entity.Payment;
import com.catering.payment_service.enums.PaymentStatus;
import com.catering.payment_service.exception.ResourceNotFoundException;
import com.catering.payment_service.repository.PaymentRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;

    // CREATE OR UPDATE PAYMENT RECEIPT

    public PaymentResponse makePayment(
            PaymentRequest request
    ) {

        // CHECK EXISTING PAYMENT FOR BOOKING

        Payment payment =

                paymentRepository
                        .findFirstByBookingId(
                                request.getBookingId()
                        )
                        .orElse(new Payment());

        // SET VALUES

        payment.setBookingId(
                request.getBookingId()
        );

        payment.setQuotationId(
                request.getQuotationId()
        );

        payment.setCustomerId(
                request.getCustomerId()
        );

        payment.setAmount(
                request.getAmount()
        );

        payment.setRemainingAmount(
                request.getRemainingAmount()
        );

        payment.setPaymentType(
                request.getPaymentType()
        );

        payment.setPaymentMethod(
                request.getPaymentMethod()
        );

        payment.setRemarks(
                request.getRemarks()
        );

        // KEEP SAME TRANSACTION ID IF UPDATE

        if (
                payment.getTransactionId()
                        == null
        ) {

            payment.setTransactionId(
                    UUID.randomUUID()
                            .toString()
            );
        }

        payment.setPaymentStatus(
                PaymentStatus.SUCCESS
        );

        // SAVE

        Payment savedPayment =

                paymentRepository
                        .save(payment);

        return mapToResponse(
                savedPayment
        );
    }

    // GET ALL PAYMENTS

    public List<PaymentResponse>
    getAllPayments() {

        return paymentRepository
                .findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // GET PAYMENT BY ID

    public PaymentResponse
    getPaymentById(
            Long id
    ) {

        Payment payment =

                paymentRepository
                        .findById(id)
                        .orElseThrow(() ->

                                new ResourceNotFoundException(
                                        "Payment Not Found"
                                )
                        );

        return mapToResponse(
                payment
        );
    }

    // GET PAYMENT BY BOOKING ID

    public PaymentResponse
    getPaymentByBooking(
            Long bookingId
    ) {

        Payment payment =

                paymentRepository
                        .findFirstByBookingId(
                                bookingId
                        )
                        .orElseThrow(() ->

                                new ResourceNotFoundException(
                                        "Payment Not Found"
                                )
                        );

        return mapToResponse(
                payment
        );
    }

    // MAP ENTITY TO RESPONSE

    private PaymentResponse
    mapToResponse(
            Payment payment
    ) {

        PaymentResponse response =
                new PaymentResponse();

        response.setPaymentId(
                payment.getPaymentId()
        );

        response.setBookingId(
                payment.getBookingId()
        );

        response.setQuotationId(
                payment.getQuotationId()
        );

        response.setCustomerId(
                payment.getCustomerId()
        );

        response.setAmount(
                payment.getAmount()
        );

        response.setRemainingAmount(
                payment.getRemainingAmount()
        );

        response.setPaymentType(
                payment.getPaymentType()
        );

        response.setPaymentMethod(
                payment.getPaymentMethod()
        );

        response.setPaymentStatus(
                payment.getPaymentStatus()
        );

        response.setTransactionId(
                payment.getTransactionId()
        );

        response.setRemarks(
                payment.getRemarks()
        );

        return response;
    }
}