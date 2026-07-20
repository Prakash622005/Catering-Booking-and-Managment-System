package com.catering.auth_service.config;

import com.catering.auth_service.entity.User;
import com.catering.auth_service.enums.Role;
import com.catering.auth_service.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer
        implements CommandLineRunner {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args)
            throws Exception {

        String ownerEmail =
                "owner@mkscatering.com";

        // CHECK OWNER EXISTS
        if (userRepository.findByEmail(ownerEmail)
                .isEmpty()) {

            User owner = new User();

            owner.setFullName(
                    "MKS Catering Owner"
            );

            owner.setEmail(
                    ownerEmail
            );

            owner.setPhone(
                    "9876543210"
            );

            owner.setPassword(
                    passwordEncoder.encode(
                            "mks@123"
                    )
            );

            owner.setRole(
                    Role.OWNER
            );

            userRepository.save(owner);

            System.out.println(
                    "Default Owner Created Successfully"
            );
        }
    }
}