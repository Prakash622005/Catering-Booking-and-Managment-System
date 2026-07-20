package com.catering.auth_service.security;

import com.catering.auth_service.service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import org.springframework.stereotype.Component;

import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter
        extends OncePerRequestFilter {

    private final JwtService jwtService;

    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(

            HttpServletRequest request,

            HttpServletResponse response,

            FilterChain filterChain

    ) throws ServletException, IOException {

        String path =
                request.getServletPath();

        // SKIP LOGIN REGISTER

        if (

                path.equals("/auth/login")

                        ||

                        path.equals("/auth/register")

                        ||

                        path.equals("/auth/test")

        ) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }

        final String authHeader =
                request.getHeader(
                        "Authorization"
                );

        if (

                authHeader == null

                        ||

                        !authHeader.startsWith(
                                "Bearer "
                        )

        ) {

            filterChain.doFilter(
                    request,
                    response
            );

            return;
        }

        try {

            String jwt =
                    authHeader.substring(7);

            String email =
                    jwtService.extractEmail(jwt);

            if (

                    email != null

                            &&

                            SecurityContextHolder
                                    .getContext()
                                    .getAuthentication() == null

            ) {

                UserDetails userDetails =
                        userDetailsService
                                .loadUserByUsername(email);

                if (

                        jwtService.isTokenValid(
                                jwt,
                                userDetails.getUsername()
                        )

                ) {

                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(

                                    userDetails,

                                    null,

                                    userDetails.getAuthorities()
                            );

                    authToken.setDetails(

                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                    );

                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(authToken);
                }
            }

        } catch (Exception e) {

            System.out.println(
                    "JWT FILTER ERROR : "
                            + e.getMessage()
            );
        }

        filterChain.doFilter(
                request,
                response
        );
    }
}