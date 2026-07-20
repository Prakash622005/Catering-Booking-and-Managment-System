package com.catering.quotation_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuotationResponse {

    private Long quotationId;

    private Long bookingId;

    private Long customerId;

    private List<SessionPriceRequest> sessionPrices;

    private Double foodAmount;

    private Double transportationCharge;

    private Double laborCharge;

    private Double vesselCharge;

    private Double decorationCharge;

    private Double gstAmount;

    private Double discountAmount;

    private Double totalAmount;

    private String remarks;
}