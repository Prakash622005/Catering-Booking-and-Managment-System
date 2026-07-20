import React from "react";

function SessionFoodSelector({
  sessions,
  setSessions,
  foods
}) {

  const getFoodsByMealType = (
    mealType
  ) => {

    if (
      mealType ===
      "EVENING_SNACKS"
    ) {

      return foods.filter(
        (food) =>
          food.foodTiming ===
          "EVENING"
      );
    }

    return foods.filter(
      (food) =>
        food.foodTiming ===
        mealType
    );
  };

  const handleFoodSelection = (
    sessionIndex,
    foodId
  ) => {

    const updatedSessions =
      [...sessions];

    const currentFoodIds =
      updatedSessions[
        sessionIndex
      ].foodIds || [];

    const alreadySelected =
      currentFoodIds.includes(
        foodId
      );

    if (alreadySelected) {

      updatedSessions[
        sessionIndex
      ].foodIds =
        currentFoodIds.filter(
          (id) =>
            id !== foodId
        );

    } else {

      updatedSessions[
        sessionIndex
      ].foodIds = [
        ...currentFoodIds,
        foodId
      ];
    }

    setSessions(
      updatedSessions
    );
  };

  const getMealDisplayName =
    (mealType) => {

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

  return (

    <div style={styles.container}>

      <h2 style={styles.title}>
        Select Menu For Each Session
      </h2>

      {

        sessions.length === 0 && (

          <div
            style={
              styles.emptyState
            }
          >

            Please add meal
            sessions first.

          </div>
        )
      }

      {

        sessions.map(
          (
            session,
            sessionIndex
          ) => {

            const availableFoods =
              getFoodsByMealType(
                session.mealType
              );

            return (

              <div
                key={sessionIndex}
                style={
                  styles.sessionCard
                }
              >

                <div
                  style={
                    styles.sessionHeader
                  }
                >

                  <h3
                    style={
                      styles.sessionTitle
                    }
                  >

                    {
                      getMealDisplayName(
                        session.mealType
                      )
                    }

                  </h3>

                  <div
                    style={
                      styles.dateBadge
                    }
                  >

                    {
                      session.mealDate ||
                      "Select Date"
                    }

                  </div>

                </div>

                <div
                  style={
                    styles.guestInfo
                  }
                >

                  Guests :
                  {" "}
                  {
                    session.guestCount ||
                    0
                  }

                </div>

                {

                  availableFoods.length ===
                    0 && (

                    <div
                      style={
                        styles.noFoods
                      }
                    >

                      No menu items
                      available

                    </div>
                  )
                }

                <div
                  style={
                    styles.foodGrid
                  }
                >

                  {

                    availableFoods.map(
                      (
                        food
                      ) => {

                        const isSelected =
                          session.foodIds?.includes(
                            food.id
                          );

                        return (

                          <label
                            key={
                              food.id
                            }
                            style={

                              isSelected

                                ? {
                                    ...styles.foodCard,
                                    ...styles.foodCardSelected
                                  }

                                : styles.foodCard
                            }
                          >

                            <input
                              type="checkbox"
                              checked={
                                isSelected
                              }
                              onChange={() =>
                                handleFoodSelection(
                                  sessionIndex,
                                  food.id
                                )
                              }
                            />

                            <span
                              style={
                                styles.foodName
                              }
                            >

                              {
                                food.foodName
                              }

                            </span>

                          </label>
                        );
                      }
                    )
                  }

                </div>

                <div
                  style={
                    styles.selectedCount
                  }
                >

                  Selected Foods :
                  {" "}
                  {

                    session
                      .foodIds
                      ?.length || 0

                  }

                </div>

              </div>
            );
          }
        )
      }

    </div>
  );
}

const styles = {

  container: {
    marginTop: "30px",

    backgroundColor:
      "rgba(19,22,34,0.45)",

    border:
      "1px solid rgba(255,255,255,0.08)",

    borderRadius: "24px",

    padding: "32px",

    color: "#FFFFFF"
  },

  title: {
    fontSize: "28px",

    fontWeight: "700",

    marginBottom: "25px",

    textAlign: "center"
  },

  emptyState: {
    textAlign: "center",

    color: "#9CA3AF",

    padding: "40px"
  },

  sessionCard: {
    border:
      "1px solid rgba(255,255,255,0.08)",

    borderRadius: "16px",

    padding: "20px",

    marginBottom: "25px",

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

  sessionTitle: {
    color: "#D4AF37",

    margin: 0
  },

  dateBadge: {
    background:
      "rgba(124,58,237,0.15)",

    color: "#C4B5FD",

    padding:
      "6px 12px",

    borderRadius: "20px",

    fontSize: "14px"
  },

  guestInfo: {
    color: "#9CA3AF",

    marginBottom: "20px"
  },

  foodGrid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(180px,1fr))",

    gap: "15px"
  },

  foodCard: {
    display: "flex",

    alignItems: "center",

    gap: "10px",

    padding: "12px",

    borderRadius: "12px",

    border:
      "1px solid rgba(255,255,255,0.08)",

    cursor: "pointer",

    transition:
      "all 0.2s ease"
  },

  foodCardSelected: {
    background:
      "rgba(124,58,237,0.15)",

    border:
      "1px solid rgba(124,58,237,0.4)"
  },

  foodName: {
    fontWeight: "500"
  },

  noFoods: {
    color: "#9CA3AF",

    padding: "20px"
  },

  selectedCount: {
    marginTop: "15px",

    color: "#D4AF37",

    fontWeight: "600"
  }
};

export default SessionFoodSelector;