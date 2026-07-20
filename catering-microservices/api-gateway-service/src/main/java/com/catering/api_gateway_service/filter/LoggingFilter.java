package com.catering.api_gateway_service.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
public class LoggingFilter {

    @Bean
    public GlobalFilter customFilter() {

        return (exchange, chain) -> {

            log.info(
                    "Incoming Request: {} {}",
                    exchange.getRequest().getMethod(),
                    exchange.getRequest().getURI()
            );

            return chain.filter(exchange);
        };
    }
}