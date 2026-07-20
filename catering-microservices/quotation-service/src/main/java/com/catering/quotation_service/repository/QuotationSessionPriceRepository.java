package com.catering.quotation_service.repository;

import com.catering.quotation_service.entity.QuotationSessionPrice;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuotationSessionPriceRepository
        extends JpaRepository<QuotationSessionPrice, Long> {

    List<QuotationSessionPrice> findByQuotation_QuotationId(
            Long quotationId
    );

    List<QuotationSessionPrice> findByQuotation_BookingId(
            Long bookingId
    );
}