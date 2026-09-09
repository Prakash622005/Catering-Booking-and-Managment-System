package com.catering.quotation_service.service;

import com.catering.quotation_service.dto.QuotationRequest;
import com.catering.quotation_service.dto.QuotationResponse;
import com.catering.quotation_service.dto.SessionPriceRequest;
import com.catering.quotation_service.entity.Quotation;
import com.catering.quotation_service.entity.QuotationSessionPrice;
import com.catering.quotation_service.exception.ResourceNotFoundException;
import com.catering.quotation_service.repository.QuotationRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuotationService {

    private final QuotationRepository quotationRepository;

    // =====================================
    // CREATE QUOTATION
    // =====================================
    public QuotationResponse createQuotation(


            QuotationRequest request
    ) {
        System.out.println("================================");
        System.out.println("SESSION PRICES FROM FRONTEND");
        System.out.println(request.getSessionPrices());
        System.out.println("================================");

        System.out.println("REQUEST RECEIVED");
        System.out.println(request);
        System.out.println(request.getSessionPrices());

        Quotation quotation = new Quotation();

        quotation.setBookingId(
                request.getBookingId()
        );

        quotation.setCustomerId(
                request.getCustomerId()
        );

        quotation.setTransportationCharge(
                safe(request.getTransportationCharge())
        );

        quotation.setLaborCharge(
                safe(request.getLaborCharge())
        );

        quotation.setVesselCharge(
                safe(request.getVesselCharge())
        );

        quotation.setDecorationCharge(
                safe(request.getDecorationCharge())
        );

        quotation.setGstAmount(
                safe(request.getGstAmount())
        );

        quotation.setDiscountAmount(
                safe(request.getDiscountAmount())
        );

        quotation.setRemarks(
                request.getRemarks()
        );

        double foodAmount = 0.0;

        if (request.getSessionPrices() != null) {

            for (SessionPriceRequest session :
                    request.getSessionPrices()) {

                QuotationSessionPrice row =
                        new QuotationSessionPrice();

                row.setSessionId(
                        session.getSessionId()
                );

                row.setMealType(
                        session.getMealType()
                );

                row.setMealDate(
                        session.getMealDate()
                );

                row.setGuestCount(
                        session.getGuestCount()
                );

                row.setPricePerPlate(
                        safe(session.getPricePerPlate())
                );

                row.setAmount(
                        safe(session.getAmount())
                );

                row.setQuotation(
                        quotation
                );

                quotation.getSessionPrices().add(
                        row
                );

                foodAmount += safe(
                        session.getAmount()
                );
            }
        }

        quotation.setFoodAmount(
                foodAmount
        );

        double totalAmount =
                foodAmount
                        + quotation.getTransportationCharge()
                        + quotation.getLaborCharge()
                        + quotation.getVesselCharge()
                        + quotation.getDecorationCharge()
                        + quotation.getGstAmount()
                        - quotation.getDiscountAmount();

        quotation.setTotalAmount(
                totalAmount
        );

        Quotation savedQuotation =
                quotationRepository.save(
                        quotation
                );

        // =====================================
        // UPDATE BOOKING STATUS
        // =====================================

        try {

            RestTemplate restTemplate =
                    new RestTemplate();

            restTemplate.put(
                    "http://catering-booking-service:8083/bookings/"
                            + quotation.getBookingId()
                            + "/quotation-sent",
                    null
            );

            System.out.println(
                    "Booking status updated to QUOTATION_SENT"
            );

        } catch (Exception e) {

            System.out.println(
                    "Booking status update failed: "
                            + e.getMessage()
            );

        }

        return mapToResponse(
                savedQuotation
        );
    }

    // =====================================
    // GET ALL QUOTATIONS
    // =====================================

    public List<QuotationResponse>
    getAllQuotations() {

        return quotationRepository
                .findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // =====================================
    // GET BY ID
    // =====================================

    public QuotationResponse getQuotationById(
            Long id
    ) {

        Quotation quotation =
                quotationRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Quotation Not Found"
                                )
                        );

        return mapToResponse(
                quotation
        );
    }

    // =====================================
    // GET BY BOOKING ID
    // =====================================

    public QuotationResponse getQuotationByBookingId(
            Long bookingId
    ) {

        Quotation quotation =
                quotationRepository
                        .findTopByBookingIdOrderByQuotationIdDesc(
                                bookingId
                        )
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Quotation Not Found"
                                )
                        );

        return mapToResponse(
                quotation
        );
    }

    public QuotationResponse getQuotationByBooking(
            Long bookingId
    ) {

        return getQuotationByBookingId(
                bookingId
        );
    }

    // =====================================
    // APPROVE
    // =====================================

    public String approveQuotation(
            Long id
    ) {

        return "Quotation Approved";
    }

    // =====================================
    // REJECT
    // =====================================

    public String rejectQuotation(
            Long id
    ) {

        return "Quotation Rejected";
    }

    // =====================================
    // MAP ENTITY -> RESPONSE
    // =====================================

    private QuotationResponse mapToResponse(
            Quotation quotation
    ) {

        List<SessionPriceRequest> sessionPrices =
                quotation.getSessionPrices()
                        .stream()
                        .map(session -> {

                            SessionPriceRequest dto =
                                    new SessionPriceRequest();

                            dto.setSessionId(
                                    session.getSessionId()
                            );

                            dto.setMealType(
                                    session.getMealType()
                            );

                            dto.setMealDate(
                                    session.getMealDate()
                            );

                            dto.setGuestCount(
                                    session.getGuestCount()
                            );

                            dto.setPricePerPlate(
                                    session.getPricePerPlate()
                            );

                            dto.setAmount(
                                    session.getAmount()
                            );

                            return dto;

                        })
                        .collect(Collectors.toList());

        return new QuotationResponse(

                quotation.getQuotationId(),

                quotation.getBookingId(),

                quotation.getCustomerId(),

                sessionPrices,

                quotation.getFoodAmount(),

                quotation.getTransportationCharge(),

                quotation.getLaborCharge(),

                quotation.getVesselCharge(),

                quotation.getDecorationCharge(),

                quotation.getGstAmount(),

                quotation.getDiscountAmount(),

                quotation.getTotalAmount(),

                quotation.getRemarks()
        );
    }

    // =====================================
    // SAFE NULL HANDLER
    // =====================================

    private Double safe(
            Double value
    ) {

        return value == null
                ? 0.0
                : value;
    }
}