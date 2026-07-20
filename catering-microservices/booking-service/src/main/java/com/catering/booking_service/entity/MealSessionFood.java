package com.catering.booking_service.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "meal_session_foods")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MealSessionFood {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id")
    private MealSession mealSession;

    private Long foodId;
}