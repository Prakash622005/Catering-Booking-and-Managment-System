package com.catering.booking_service.repository;

import com.catering.booking_service.entity.MealSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealSessionRepository
        extends JpaRepository<MealSession, Long> {
}