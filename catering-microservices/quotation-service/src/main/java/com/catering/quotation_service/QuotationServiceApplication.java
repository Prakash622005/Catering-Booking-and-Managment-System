package com.catering.quotation_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class QuotationServiceApplication {

    public static void main(String[] args) {

        SpringApplication.run(
                QuotationServiceApplication.class,
                args
        );
    }
}