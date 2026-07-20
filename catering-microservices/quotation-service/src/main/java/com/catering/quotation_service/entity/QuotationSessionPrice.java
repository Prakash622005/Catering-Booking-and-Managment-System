package com.catering.quotation_service.entity;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name = "quotation_session_prices")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuotationSessionPrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long sessionId;

    private String mealType;

    private String mealDate;

    private Integer guestCount;

    private Double pricePerPlate;

    private Double amount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quotation_id")
    private Quotation quotation;
}