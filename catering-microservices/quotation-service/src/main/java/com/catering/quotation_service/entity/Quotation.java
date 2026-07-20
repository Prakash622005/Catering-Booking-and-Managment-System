package com.catering.quotation_service.entity;

import jakarta.persistence.*;

import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "quotations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Quotation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long quotationId;

    private Long bookingId;

    private Long customerId;

    // =====================================
    // SESSION PRICES
    // =====================================

    @OneToMany(
            mappedBy = "quotation",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<QuotationSessionPrice> sessionPrices =
            new ArrayList<>();

    // =====================================
    // TOTALS
    // =====================================

    private Double foodAmount;

    private Double transportationCharge;

    private Double laborCharge;

    private Double vesselCharge;

    private Double decorationCharge;

    private Double gstAmount;

    private Double discountAmount;

    private Double totalAmount;

    @Column(length = 2000)
    private String remarks;

    private LocalDateTime quotationDate;

    @PrePersist
    public void prePersist() {
        quotationDate = LocalDateTime.now();
    }
}