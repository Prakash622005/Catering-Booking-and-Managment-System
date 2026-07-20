package com.catering.auth_service.service;

import com.catering.auth_service.dto.AuthResponse;
import com.catering.auth_service.dto.LoginRequest;
import com.catering.auth_service.dto.RegisterRequest;
import com.catering.auth_service.dto.UserResponse;
import com.catering.auth_service.entity.User;
import com.catering.auth_service.enums.Role;
import com.catering.auth_service.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    // REGISTER CUSTOMER
    public String register(RegisterRequest request) {

        // CHECK EMAIL EXISTS
        if (userRepository.findByEmail(
                request.getEmail()
        ).isPresent()) {

            throw new RuntimeException(
                    "Email Already Exists"
            );
        }

        User user = new User();

        user.setFullName(
                request.getFullName()
        );

        user.setEmail(
                request.getEmail()
        );

        user.setPhone(
                request.getPhone()
        );

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        // ALWAYS CUSTOMER
        user.setRole(
                Role.CUSTOMER
        );

        userRepository.save(user);

        return "Customer Registered Successfully";
    }

    // LOGIN
    public AuthResponse login(
            LoginRequest request) {

        User user = userRepository
                .findByEmail(
                        request.getEmail()
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "User Not Found"
                        )
                );

        // PASSWORD CHECK
        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {

            throw new RuntimeException(
                    "Invalid Password"
            );
        }

        // GENERATE JWT
        String token =
                jwtService.generateToken(
                        user.getEmail()
                );

        // RETURN TOKEN + ROLE
        return new AuthResponse(

                token,

                user.getRole().name(),

                user.getUserId()
        );
    }
    public UserResponse getUserById(
        Long id
) {

    User user =
            userRepository.findById(id)
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "User Not Found"
                            )
                    );

    return new UserResponse(

            user.getUserId(),

            user.getFullName(),

            user.getEmail(),

            user.getPhone()
    );
}
}