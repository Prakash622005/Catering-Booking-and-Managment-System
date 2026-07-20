package com.catering.menu_service.controller;

import com.catering.menu_service.dto.MenuRequest;
import com.catering.menu_service.dto.MenuResponse;
import com.catering.menu_service.enums.FoodTiming;
import com.catering.menu_service.service.MenuService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/menus")
@RequiredArgsConstructor
//@CrossOrigin("*")
public class MenuController {

    private final MenuService menuService;

    @PostMapping
    public MenuResponse addMenu(
            @Valid
            @RequestBody
            MenuRequest request
    ) {

        return menuService.addMenu(
                request
        );
    }

    @GetMapping
    public List<MenuResponse> getAllMenu() {

        return menuService.getAllMenu();
    }

    @GetMapping("/{id}")
    public MenuResponse getMenuById(
            @PathVariable Long id
    ) {

        return menuService.getMenuById(id);
    }

    @GetMapping("/timing/{timing}")
    public List<MenuResponse>
    getByFoodTiming(
            @PathVariable
            FoodTiming timing
    ) {

        return menuService
                .getByFoodTiming(
                        timing
                );
    }

    @DeleteMapping("/{id}")
    public String deleteMenu(
            @PathVariable Long id
    ) {

        return menuService
                .deleteMenu(id);
    }

    @GetMapping("/test")
    public String test() {

        return "Menu Service Running";
    }
}