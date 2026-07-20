import { useEffect, useState } from "react";

import EventDetailsForm from "../../components/booking/EventDetailsForm";
import MealSessionSelector from "../../components/booking/MealSessionSelector";
import SessionFoodSelector from "../../components/booking/SessionFoodSelector";
import BookingReview from "../../components/booking/BookingReview";

import menuService from "../../services/menuService";
import bookingService from "../../services/bookingService";

function FoodMenuPage() {

  const [foods, setFoods] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [submitting,
    setSubmitting] =
    useState(false);

  const [successMessage,
    setSuccessMessage] =
    useState("");

  const [eventDetails,
    setEventDetails] =
    useState({

      eventType: "",

      eventLocation: "",

      specialInstructions: ""
    });

  const [sessions,
    setSessions] =
    useState([]);

  // LOAD FOODS

  useEffect(() => {

    fetchFoods();

  }, []);

  const fetchFoods =
    async () => {

      try {

        const response =
          await menuService
            .getAllFoods();

        setFoods(
          response.data
        );

      } catch (error) {

        console.error(
          "Food Load Error",
          error
        );

      } finally {

        setLoading(false);
      }
    };

  // VALIDATION

  const validateBooking =
    () => {

      if (
        !eventDetails.eventType
      ) {

        alert(
          "Please Select Event Type"
        );

        return false;
      }

      if (
        !eventDetails.eventLocation
      ) {

        alert(
          "Please Enter Event Location"
        );

        return false;
      }

      if (
        sessions.length === 0
      ) {

        alert(
          "Please Add At Least One Meal Session"
        );

        return false;
      }

      for (
        const session
        of sessions
      ) {

        if (
          !session.mealDate
        ) {

          alert(
            "Please Select Meal Date"
          );

          return false;
        }

        if (
          !session.guestCount
        ) {

          alert(
            "Please Enter Guest Count"
          );

          return false;
        }

        if (
          !session.foodIds ||
          session.foodIds.length === 0
        ) {

          alert(
            "Please Select Foods For All Sessions"
          );

          return false;
        }
      }

      return true;
    };

  // SUBMIT BOOKING

  const handleBooking =
    async () => {

      if (
        !validateBooking()
      ) {

        return;
      }

      try {

        setSubmitting(
          true
        );

        const customerId =
          localStorage.getItem(
            "customerId"
          );

        const payload = {

          customerId:
            Number(
              customerId
            ),

          eventType:
            eventDetails.eventType,

          eventLocation:
            eventDetails.eventLocation,

          specialInstructions:
            eventDetails.specialInstructions,

          mealSessions:
            sessions.map(
              (
                session
              ) => ({

                mealType:
                  session.mealType,

                mealDate:
                  session.mealDate,

                guestCount:
                  Number(
                    session.guestCount
                  ),

                foodIds:
                  session.foodIds
              })
            )
        };

        console.log(
          "BOOKING PAYLOAD",
          payload
        );

        await bookingService
          .createBooking(
            payload
          );

        setSuccessMessage(
          "Booking Submitted Successfully"
        );

        // RESET

        setEventDetails({

          eventType: "",

          eventLocation: "",

          specialInstructions: ""
        });

        setSessions([]);

      } catch (error) {

        console.error(
          "Booking Error",
          error
        );

        alert(
          "Booking Failed"
        );

      } finally {

        setSubmitting(
          false
        );
      }
    };

  if (loading) {

    return (

      <div
        style={
          styles.loadingWrapper
        }
      >

        <div
          style={
            styles.loadingSpinner
          }
        />

        <h3>
          Loading Menu...
        </h3>

      </div>
    );
  }

  return (

    <div
      style={
        styles.pageWrapper
      }
    >

      <div
        style={
          styles.contentWrapper
        }
      >

        {/* HEADER */}

        <div
          style={
            styles.header
          }
        >

          <h1
            style={
              styles.title
            }
          >

            Catering Booking

          </h1>

          <p
            style={
              styles.subtitle
            }
          >

            Create Event,
            Add Meal Sessions,
            Select Foods &
            Confirm Booking

          </p>

        </div>

        {/* SUCCESS */}

        {

          successMessage && (

            <div
              style={
                styles.successBox
              }
            >

              {successMessage}

            </div>
          )
        }

        {/* EVENT DETAILS */}

        <EventDetailsForm
          eventDetails={
            eventDetails
          }
          setEventDetails={
            setEventDetails
          }
        />

        {/* MEAL SESSIONS */}

        <MealSessionSelector
          sessions={
            sessions
          }
          setSessions={
            setSessions
          }
        />

        {/* FOOD SELECTION */}

        {

          sessions.length > 0 && (

            <SessionFoodSelector
              sessions={
                sessions
              }
              setSessions={
                setSessions
              }
              foods={
                foods
              }
            />
          )
        }

        {/* REVIEW */}

        {

          sessions.length > 0 && (

            <BookingReview
              eventDetails={
                eventDetails
              }
              sessions={
                sessions
              }
              foods={
                foods
              }
              submitting={
                submitting
              }
              onSubmit={
                handleBooking
              }
            />
          )
        }

      </div>

    </div>
  );
}

const styles = {

  pageWrapper: {

    minHeight:
      "100vh",

    backgroundColor:
      "#090A0F",

    padding:
      "40px 20px",

    color: "#FFFFFF"
  },

  contentWrapper: {

    maxWidth:
      "1200px",

    margin:
      "0 auto",

    display: "flex",

    flexDirection:
      "column",

    gap: "30px"
  },

  header: {

    textAlign:
      "center",

    marginBottom:
      "10px"
  },

  title: {

    fontSize:
      "42px",

    fontWeight:
      "800",

    marginBottom:
      "10px"
  },

  subtitle: {

    color:
      "#9CA3AF"
  },

  successBox: {

    background:
      "rgba(16,185,129,0.12)",

    border:
      "1px solid rgba(16,185,129,0.2)",

    color:
      "#10B981",

    padding:
      "16px",

    borderRadius:
      "12px",

    textAlign:
      "center"
  },

  loadingWrapper: {

    minHeight:
      "100vh",

    display: "flex",

    flexDirection:
      "column",

    justifyContent:
      "center",

    alignItems:
      "center",

    backgroundColor:
      "#090A0F",

    color:
      "#FFFFFF"
  },

  loadingSpinner: {

    width: "50px",

    height: "50px",

    border:
      "3px solid rgba(255,255,255,0.1)",

    borderTop:
      "3px solid #7C3AED",

    borderRadius:
      "50%",

    marginBottom:
      "20px"
  }
};

export default FoodMenuPage;