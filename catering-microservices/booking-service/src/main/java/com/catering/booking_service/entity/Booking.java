package com.catering.booking_service.entity;

import com.catering.booking_service.enums.BookingStatus;
import com.catering.booking_service.enums.EventType;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    // CUSTOMER

    private Long customerId;

    // EVENT

    @Enumerated(EnumType.STRING)
    private EventType eventType;

    private String eventLocation;

    @Column(length = 2000)
    private String specialInstructions;

    // STATUS

    @Enumerated(EnumType.STRING)
    private BookingStatus bookingStatus;

    // QUOTATION

    private Boolean quotationApproved = false;

    private BigDecimal quotationAmount;

    @Column(length = 2000)
    private String ownerRemarks;

    // PAYMENT

    private Boolean paymentCompleted = false;

    private String receiptUrl;

    // MEAL SESSIONS

    @OneToMany(
            mappedBy = "booking",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<MealSession> mealSessions = new ArrayList<>();

    // TIMESTAMP

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {

        createdAt = LocalDateTime.now();

        if (bookingStatus == null) {
            bookingStatus = BookingStatus.NEW;
        }
    }

    @PreUpdate
    public void preUpdate() {

        updatedAt = LocalDateTime.now();
    }
}