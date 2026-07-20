package com.catering.menu_service.repository;

import com.catering.menu_service.entity.MenuItem;
import com.catering.menu_service.enums.FoodTiming;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuRepository
        extends JpaRepository<MenuItem, Long> {

    List<MenuItem>
    findByFoodTiming(
            FoodTiming foodTiming
    );
}