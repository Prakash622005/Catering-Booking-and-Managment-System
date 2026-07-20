package com.catering.quotation_service.dto;

import lombok.Data;

import java.util.List;

@Data
public class QuotationRequest {

    private Long bookingId;

    private Long customerId;

    // ==================================
    // SESSION WISE PRICING
    // ==================================

    private List<SessionPriceRequest> sessionPrices;

    // ==================================
    // EXTRA CHARGES
    // ==================================

    private Double transportationCharge;

    private Double laborCharge;

    private Double vesselCharge;

    private Double decorationCharge;

    private Double gstAmount;

    private Double discountAmount;

    private String remarks;

    // ==================================
    // TOTALS
    // ==================================

    private Double foodAmount;

    private Double totalAmount;
}