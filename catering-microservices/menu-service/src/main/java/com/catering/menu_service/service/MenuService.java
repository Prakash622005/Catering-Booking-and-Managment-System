package com.catering.menu_service.service;

import com.catering.menu_service.dto.MenuRequest;
import com.catering.menu_service.dto.MenuResponse;
import com.catering.menu_service.entity.MenuItem;
import com.catering.menu_service.enums.FoodTiming;
import com.catering.menu_service.exception.ResourceNotFoundException;
import com.catering.menu_service.repository.MenuRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MenuService {

    private final MenuRepository menuRepository;

    // ADD FOOD

    public MenuResponse addMenu(
            MenuRequest request
    ) {

        MenuItem item =
                new MenuItem();

        item.setFoodName(
                request.getFoodName()
        );

        item.setFoodTiming(
                FoodTiming.valueOf(
                        request.getFoodTiming()
                                .toUpperCase()
                )
        );

        MenuItem savedItem =
                menuRepository.save(item);

        return mapToResponse(
                savedItem
        );
    }

    // GET ALL

    public List<MenuResponse> getAllMenu() {

        return menuRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // GET BY ID

    public MenuResponse getMenuById(
            Long id
    ) {

        MenuItem item =
                menuRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Food Not Found"
                                )
                        );

        return mapToResponse(item);
    }

    // GET BY TIMING

    public List<MenuResponse>
    getByFoodTiming(
            FoodTiming timing
    ) {

        return menuRepository
                .findByFoodTiming(
                        timing
                )
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // SEARCH

    public List<MenuResponse>
    searchMenu(
            String keyword
    ) {

        return menuRepository
                .findAll()
                .stream()
                .filter(food ->
                        food.getFoodName()
                                .toLowerCase()
                                .contains(
                                        keyword.toLowerCase()
                                )
                )
                .map(this::mapToResponse)
                .toList();
    }

    // DELETE

    public String deleteMenu(
            Long id
    ) {

        menuRepository.deleteById(
                id
        );

        return "Food Deleted";
    }

    // MAP RESPONSE

    private MenuResponse
    mapToResponse(
            MenuItem item
    ) {

        return new MenuResponse(

                item.getId(),

                item.getFoodName(),

                item.getFoodTiming()
                        .name()
        );
    }
}