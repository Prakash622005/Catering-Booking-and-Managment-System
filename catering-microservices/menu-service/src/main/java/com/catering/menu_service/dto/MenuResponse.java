package com.catering.menu_service.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class MenuResponse {

    private Long id;

    private String foodName;

    private String foodTiming;
}