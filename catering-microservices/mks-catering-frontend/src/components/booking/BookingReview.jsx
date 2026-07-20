import React from "react";

function BookingReview({
  eventDetails,
  sessions,
  foods,
  onSubmit,
  submitting
}) {

  const getFoodNames = (
    foodIds
  ) => {

    return foods
      .filter(
        (food) =>
          foodIds?.includes(
            food.id
          )
      )
      .map(
        (food) =>
          food.foodName
      );
  };

  const getMealLabel = (
    mealType
  ) => {

    switch (
      mealType
    ) {

      case "BREAKFAST":
        return "Breakfast";

      case "LUNCH":
        return "Lunch";

      case "DINNER":
        return "Dinner";

      case "EVENING_SNACKS":
        return "Evening Snacks";

      default:
        return mealType;
    }
  };

  const totalGuests =
    sessions.reduce(
      (
        total,
        session
      ) =>
        total +
        Number(
          session.guestCount ||
          0
        ),
      0
    );

  return (

    <div style={styles.card}>

      <h2 style={styles.title}>
        Booking Review
      </h2>

      <div style={styles.divider} />

      {/* EVENT DETAILS */}

      <div style={styles.section}>

        <h3 style={styles.sectionTitle}>
          Event Details
        </h3>

        <div style={styles.infoRow}>
          <span>
            Event Type
          </span>

          <strong>
            {
              eventDetails.eventType
            }
          </strong>
        </div>

        <div style={styles.infoRow}>
          <span>
            Event Location
          </span>

          <strong>
            {
              eventDetails.eventLocation
            }
          </strong>
        </div>

        <div style={styles.infoRow}>
          <span>
            Total Sessions
          </span>

          <strong>
            {
              sessions.length
            }
          </strong>
        </div>

        <div style={styles.infoRow}>
          <span>
            Total Guests
          </span>

          <strong>
            {totalGuests}
          </strong>
        </div>

      </div>

      {/* SPECIAL INSTRUCTIONS */}

      {

        eventDetails
          .specialInstructions && (

          <div
            style={
              styles.section
            }
          >

            <h3
              style={
                styles.sectionTitle
              }
            >
              Special Instructions
            </h3>

            <div
              style={
                styles.instructions
              }
            >

              {
                eventDetails.specialInstructions
              }

            </div>

          </div>
        )
      }

      {/* SESSION REVIEW */}

      <div style={styles.section}>

        <h3 style={styles.sectionTitle}>
          Meal Sessions
        </h3>

        {

          sessions.map(
            (
              session,
              index
            ) => {

              const foodNames =
                getFoodNames(
                  session.foodIds
                );

              return (

                <div
                  key={index}
                  style={
                    styles.sessionCard
                  }
                >

                  <div
                    style={
                      styles.sessionHeader
                    }
                  >

                    <div>

                      <div
                        style={
                          styles.sessionMeal
                        }
                      >

                        {
                          getMealLabel(
                            session.mealType
                          )
                        }

                      </div>

                      <div
                        style={
                          styles.sessionDate
                        }
                      >

                        {
                          session.mealDate
                        }

                      </div>

                    </div>

                    <div
                      style={
                        styles.guestBadge
                      }
                    >

                      {
                        session.guestCount
                      }

                      {" Guests"}

                    </div>

                  </div>

                  <div
                    style={
                      styles.foodList
                    }
                  >

                    {

                      foodNames
                        .length === 0

                        ? (

                          <span
                            style={
                              styles.emptyFood
                            }
                          >

                            No Foods Selected

                          </span>

                        )

                        : foodNames.map(
                            (
                              food,
                              idx
                            ) => (

                              <span
                                key={idx}
                                style={
                                  styles.foodTag
                                }
                              >

                                {food}

                              </span>
                            )
                          )
                    }

                  </div>

                </div>
              );
            }
          )
        }

      </div>

      {/* SUBMIT BUTTON */}

      <button
        type="button"
        onClick={onSubmit}
        disabled={
          submitting
        }
        style={

          submitting

            ? {
                ...styles.submitButton,
                opacity: 0.6
              }

            : styles.submitButton
        }
      >

        {

          submitting

            ? "Submitting Booking..."

            : "Confirm Booking"

        }

      </button>

    </div>
  );
}

const styles = {

  card: {
    backgroundColor:
      "rgba(19,22,34,0.45)",

    border:
      "1px solid rgba(255,255,255,0.08)",

    borderRadius: "24px",

    padding: "32px",

    color: "#FFFFFF",

    marginTop: "30px"
  },

  title: {
    fontSize: "28px",

    fontWeight: "700",

    textAlign: "center",

    marginBottom: "20px"
  },

  divider: {
    height: "1px",

    background:
      "rgba(255,255,255,0.08)",

    marginBottom: "25px"
  },

  section: {
    marginBottom: "25px"
  },

  sectionTitle: {
    color: "#D4AF37",

    marginBottom: "15px"
  },

  infoRow: {
    display: "flex",

    justifyContent:
      "space-between",

    marginBottom: "10px",

    color: "#D1D5DB"
  },

  instructions: {
    background:
      "rgba(255,255,255,0.04)",

    borderRadius: "10px",

    padding: "15px",

    color: "#D1D5DB"
  },

  sessionCard: {
    border:
      "1px solid rgba(255,255,255,0.08)",

    borderRadius: "16px",

    padding: "18px",

    marginBottom: "15px",

    background:
      "rgba(255,255,255,0.02)"
  },

  sessionHeader: {
    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    marginBottom: "15px"
  },

  sessionMeal: {
    color: "#D4AF37",

    fontWeight: "700",

    fontSize: "18px"
  },

  sessionDate: {
    color: "#9CA3AF",

    fontSize: "14px",

    marginTop: "5px"
  },

  guestBadge: {
    background:
      "rgba(124,58,237,0.15)",

    color: "#C4B5FD",

    padding:
      "8px 12px",

    borderRadius: "20px",

    fontWeight: "600"
  },

  foodList: {
    display: "flex",

    flexWrap: "wrap",

    gap: "10px"
  },

  foodTag: {
    background:
      "rgba(124,58,237,0.12)",

    border:
      "1px solid rgba(124,58,237,0.25)",

    padding:
      "6px 12px",

    borderRadius: "20px",

    color: "#E5E7EB",

    fontSize: "14px"
  },

  emptyFood: {
    color: "#9CA3AF"
  },

  submitButton: {
    width: "100%",

    padding: "16px",

    border: "none",

    borderRadius: "14px",

    background:
      "#7C3AED",

    color: "#FFFFFF",

    fontSize: "16px",

    fontWeight: "600",

    cursor: "pointer"
  }
};

export default BookingReview;