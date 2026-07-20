package com.catering.payment_service.entity;

import com.catering.payment_service.enums.PaymentMethod;
import com.catering.payment_service.enums.PaymentStatus;

import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "payments")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Payment {

    @Id
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Long paymentId;

    private Long bookingId;

    private Long quotationId;

    private Long customerId;

    // ADVANCE / FULL PAYMENT

    private String paymentType;

    // AMOUNT PAID NOW

    private Double amount;

    // BALANCE AMOUNT

    private Double remainingAmount;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    private String transactionId;

    @Column(length = 2000)
    private String remarks;

    private LocalDateTime paymentDate;

    @PrePersist
    public void prePersist() {

        paymentDate =
                LocalDateTime.now();

        // OWNER VERIFIED ONLY

        paymentStatus =
                PaymentStatus.SUCCESS;
    }
}