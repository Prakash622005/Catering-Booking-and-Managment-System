package com.catering.quotation_service.controller;

import com.catering.quotation_service.dto.QuotationRequest;
import com.catering.quotation_service.dto.QuotationResponse;
import com.catering.quotation_service.service.QuotationService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quotations")
@RequiredArgsConstructor
//@CrossOrigin(origins = "*")
public class QuotationController {

    private final QuotationService quotationService;

    @PostMapping
    public QuotationResponse createQuotation(
            @RequestBody QuotationRequest request
    ) {

        return quotationService
                .createQuotation(request);
    }

    @GetMapping
    public List<QuotationResponse>
    getAllQuotations() {

        return quotationService
                .getAllQuotations();
    }

    @GetMapping("/{id}")
    public QuotationResponse
    getQuotationById(
            @PathVariable Long id
    ) {

        return quotationService
                .getQuotationById(id);
    }

    @GetMapping("/booking/{bookingId}")
    public QuotationResponse
    getQuotationByBooking(
            @PathVariable Long bookingId
    ) {

        return quotationService
                .getQuotationByBookingId(
                        bookingId
                );
    }

    @PutMapping("/{id}/approve")
    public String approveQuotation(
            @PathVariable Long id
    ) {

        return quotationService
                .approveQuotation(id);
    }

    @PutMapping("/{id}/reject")
    public String rejectQuotation(
            @PathVariable Long id
    ) {

        return quotationService
                .rejectQuotation(id);
    }
}