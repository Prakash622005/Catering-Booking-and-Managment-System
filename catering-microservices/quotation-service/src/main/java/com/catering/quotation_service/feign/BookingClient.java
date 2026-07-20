package com.catering.quotation_service.feign;

import org.springframework.cloud.openfeign.FeignClient;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@FeignClient(name = "BOOKING-SERVICE")
public interface BookingClient {

    @PutMapping("/bookings/{id}/confirm")
    String confirmBooking(
            @PathVariable Long id
    );
}