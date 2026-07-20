package com.catering.booking_service.repository;

import com.catering.booking_service.entity.MealSessionFood;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MealSessionFoodRepository
        extends JpaRepository<MealSessionFood, Long> {
}