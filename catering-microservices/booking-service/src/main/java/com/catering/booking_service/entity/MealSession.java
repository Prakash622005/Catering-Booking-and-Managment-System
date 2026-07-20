package com.catering.booking_service.entity;

import com.catering.booking_service.enums.MealType;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "meal_sessions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MealSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sessionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @Enumerated(EnumType.STRING)
    private MealType mealType;

    private LocalDate mealDate;

    private Integer guestCount;

    @OneToMany(
            mappedBy = "mealSession",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<MealSessionFood> foods =
            new ArrayList<>();
}