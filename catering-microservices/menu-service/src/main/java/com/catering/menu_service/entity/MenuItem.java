package com.catering.menu_service.entity;

import com.catering.menu_service.enums.FoodTiming;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name = "menu_items")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MenuItem {

    @Id
    @GeneratedValue(
            strategy =
                    GenerationType.IDENTITY
    )
    private Long id;

    @Column(name = "food_name")
    private String foodName;

    @Enumerated(
            EnumType.STRING
    )
    @Column(name = "food_timing")
    private FoodTiming foodTiming;
}