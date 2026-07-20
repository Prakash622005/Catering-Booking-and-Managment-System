package com.catering.booking_service.service;

import com.catering.booking_service.dto.BookingRequest;
import com.catering.booking_service.dto.BookingResponse;
import com.catering.booking_service.dto.MealSessionRequest;
import com.catering.booking_service.dto.MealSessionResponse;
import com.catering.booking_service.entity.Booking;
import com.catering.booking_service.entity.MealSession;
import com.catering.booking_service.entity.MealSessionFood;
import com.catering.booking_service.enums.BookingStatus;
import com.catering.booking_service.exception.ResourceNotFoundException;
import com.catering.booking_service.repository.BookingRepository;
//import com.catering.booking_service.repository.MealSessionFoodRepository;
import com.catering.booking_service.repository.MealSessionRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;

    private final MealSessionRepository mealSessionRepository;

//    private final MealSessionFoodRepository mealSessionFoodRepository;

    /*
     * CREATE BOOKING
     */

    public BookingResponse createBooking(
            BookingRequest request) {

        Booking booking = new Booking();

        booking.setCustomerId(
                request.getCustomerId()
        );

        booking.setEventType(
                request.getEventType()
        );

        booking.setEventLocation(
                request.getEventLocation()
        );

        booking.setSpecialInstructions(
                request.getSpecialInstructions()
        );

        booking.setBookingStatus(
                BookingStatus.NEW
        );

        booking.setQuotationApproved(
                false
        );

        Booking savedBooking =
                bookingRepository.save(
                        booking
                );

        List<MealSession> sessions =
                new ArrayList<>();

        for (MealSessionRequest sessionRequest :
                request.getMealSessions()) {

            MealSession session =
                    new MealSession();

            session.setBooking(
                    savedBooking
            );

            session.setMealType(
                    sessionRequest.getMealType()
            );

            session.setMealDate(
                    sessionRequest.getMealDate()
            );

            session.setGuestCount(
                    sessionRequest.getGuestCount()
            );

            /*
             * ADD FOODS DIRECTLY TO SESSION
             */

            for (Long foodId :
                    sessionRequest.getFoodIds()) {

                MealSessionFood food =
                        new MealSessionFood();

                food.setMealSession(
                        session
                );

                food.setFoodId(
                        foodId
                );

                session.getFoods()
                        .add(food);
            }

            MealSession savedSession =
                    mealSessionRepository.save(
                            session
                    );

            sessions.add(
                    savedSession
            );
        }

        savedBooking.setMealSessions(
                sessions
        );

        return mapToResponse(
                savedBooking
        );
    }
    /*
     * GET ALL BOOKINGS
     */

    public List<BookingResponse>
    getAllBookings() {

        return bookingRepository
                .findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    /*
     * GET BOOKING BY ID
     */

    public BookingResponse getBookingById(
            Long id) {

        Booking booking =
                bookingRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Booking Not Found"
                                ));

        return mapToResponse(
                booking
        );
    }

    /*
     * GET CUSTOMER BOOKINGS
     */

    public List<BookingResponse>
    getCustomerBookings(
            Long customerId) {

        return bookingRepository
                .findByCustomerId(
                        customerId
                )
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    /*
     * QUOTATION SENT
     */

    public String quotationSent(
            Long id) {

        Booking booking =
                getBookingEntity(id);

        booking.setBookingStatus(
                BookingStatus.QUOTATION_SENT
        );

        bookingRepository.save(
                booking
        );

        return "Quotation Sent";
    }

    /*
     * CONFIRM BOOKING
     */

    public String confirmBooking(
            Long id) {

        Booking booking =
                getBookingEntity(id);

        booking.setBookingStatus(
                BookingStatus.CONFIRMED
        );

        booking.setQuotationApproved(
                true
        );

        bookingRepository.save(
                booking
        );

        return "Booking Confirmed";
    }

    /*
     * REJECT BOOKING
     */

    public String rejectBooking(
            Long id) {

        Booking booking =
                getBookingEntity(id);

        booking.setBookingStatus(
                BookingStatus.REJECTED
        );

        bookingRepository.save(
                booking
        );

        return "Booking Rejected";
    }

    /*
     * PAYMENT COMPLETED
     */

    public String paymentCompleted(
            Long id) {

        Booking booking =
                getBookingEntity(id);

        booking.setBookingStatus(
                BookingStatus.PAID
        );

        booking.setPaymentCompleted(
                true
        );

        bookingRepository.save(
                booking
        );

        return "Payment Successful";
    }

    /*
     * COMMON BOOKING FETCH
     */

    private Booking getBookingEntity(
            Long id) {

        return bookingRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Booking Not Found"
                        ));
    }

    /*
     * RESPONSE MAPPING
     */

    private BookingResponse mapToResponse(
            Booking booking) {

        Integer breakfast = 0;
        Integer lunch = 0;
        Integer evening = 0;
        Integer dinner = 0;

        String eventDate = null;

        List<Long> menuItemIds =
                new ArrayList<>();

        List<MealSessionResponse> mealSessionResponses =
                new ArrayList<>();

        for (MealSession session :
                booking.getMealSessions()) {

            List<Long> foodIds =
                    session.getFoods()
                            .stream()
                            .map(MealSessionFood::getFoodId)
                            .toList();

            menuItemIds.addAll(foodIds);

            switch (session.getMealType()) {

                case BREAKFAST -> breakfast += session.getGuestCount();

                case LUNCH -> lunch += session.getGuestCount();

                case EVENING_SNACKS-> evening += session.getGuestCount();

                case DINNER -> dinner += session.getGuestCount();
            }

            if (eventDate == null) {

                eventDate =
                        session.getMealDate()
                                .toString();
            }

            mealSessionResponses.add(

                    new MealSessionResponse(

                            session.getSessionId(),

                            session.getMealType()
                                    .name(),

                            session.getMealDate(),

                            session.getGuestCount(),

                            foodIds
                    )
            );
        }

        return new BookingResponse(

                booking.getBookingId(),

                booking.getCustomerId(),

                booking.getEventType()
                        .name(),

                booking.getEventLocation(),

                booking.getSpecialInstructions(),

                booking.getBookingStatus()
                        .name(),

                eventDate,

                breakfast,

                lunch,

                evening,

                dinner,

                menuItemIds,

                mealSessionResponses
        );
    }
}