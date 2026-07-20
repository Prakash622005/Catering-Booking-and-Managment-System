package com.catering.auth_service.controller;

import com.catering.auth_service.dto.AuthResponse;
import com.catering.auth_service.dto.LoginRequest;
import com.catering.auth_service.dto.RegisterRequest;
import com.catering.auth_service.dto.UserResponse;

import com.catering.auth_service.service.AuthService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody RegisterRequest request
    ) {

        return ResponseEntity.ok(
                authService.register(request)
        );
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody LoginRequest request
    ) {

        return ResponseEntity.ok(
                authService.login(request)
        );
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserResponse> getUserById(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                authService.getUserById(id)
        );
    }

    @GetMapping("/test")
    public String test() {

        return "AUTH SERVICE RUNNING";
    }
}