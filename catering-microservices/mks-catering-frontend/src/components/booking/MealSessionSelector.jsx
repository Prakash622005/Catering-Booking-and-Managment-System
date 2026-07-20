import React from "react";

function MealSessionSelector({
  sessions,
  setSessions
}) {

  const addSession = () => {

    setSessions([
      ...sessions,
      {
        mealDate: "",
        mealType: "BREAKFAST",
        guestCount: "",
        foodIds: []
      }
    ]);
  };

  const updateSession = (
    index,
    field,
    value
  ) => {

    const updatedSessions =
      [...sessions];

    updatedSessions[index] = {
      ...updatedSessions[index],
      [field]: value
    };

    setSessions(
      updatedSessions
    );
  };

  const removeSession = (
    index
  ) => {

    const updatedSessions =
      sessions.filter(
        (_, i) =>
          i !== index
      );

    setSessions(
      updatedSessions
    );
  };

  return (

    <div style={styles.card}>

      <div style={styles.header}>

        <h2 style={styles.title}>
          Meal Sessions
        </h2>

        <button
          type="button"
          onClick={addSession}
          style={styles.addButton}
        >
          + Add Session
        </button>

      </div>

      {

        sessions.length === 0 && (

          <div style={styles.emptyBox}>

            No meal sessions added.

            <br />

            Click
            {" "}
            <strong>
              Add Session
            </strong>
            {" "}
            to continue.

          </div>
        )
      }

      {

        sessions.map(
          (
            session,
            index
          ) => (

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

                <h3
                  style={
                    styles.sessionTitle
                  }
                >

                  Session
                  {" "}
                  {index + 1}

                </h3>

                <button
                  type="button"
                  onClick={() =>
                    removeSession(
                      index
                    )
                  }
                  style={
                    styles.removeButton
                  }
                >
                  Remove
                </button>

              </div>

              {/* DATE */}

              <div
                style={
                  styles.formGroup
                }
              >

                <label
                  style={
                    styles.label
                  }
                >
                  Meal Date *
                </label>

                <input
                  type="date"
                  value={
                    session.mealDate
                  }
                  onChange={(e) =>
                    updateSession(
                      index,
                      "mealDate",
                      e.target.value
                    )
                  }
                  style={
                    styles.input
                  }
                  required
                />

              </div>

              {/* MEAL TYPE */}

              <div
                style={
                  styles.formGroup
                }
              >

                <label
                  style={
                    styles.label
                  }
                >
                  Meal Type *
                </label>

                <select
                  value={
                    session.mealType
                  }
                  onChange={(e) =>
                    updateSession(
                      index,
                      "mealType",
                      e.target.value
                    )
                  }
                  style={
                    styles.input
                  }
                >

                  <option value="BREAKFAST">
                    Breakfast
                  </option>

                  <option value="LUNCH">
                    Lunch
                  </option>

                  <option value="EVENING_SNACKS">
                    Evening Snacks
                  </option>

                  <option value="DINNER">
                    Dinner
                  </option>

                </select>

              </div>

              {/* GUEST COUNT */}

              <div
                style={
                  styles.formGroup
                }
              >

                <label
                  style={
                    styles.label
                  }
                >
                  Guest Count *
                </label>

                <input
                  type="number"
                  min="10"
                  value={
                    session.guestCount
                  }
                  onChange={(e) =>
                    updateSession(
                      index,
                      "guestCount",
                      e.target.value
                    )
                  }
                  placeholder="Minimum 10 Guests"
                  style={
                    styles.input
                  }
                  required
                />

              </div>

              {/* SUMMARY */}

              <div
                style={
                  styles.summaryBox
                }
              >

                <strong>
                  Preview:
                </strong>

                <br />

                {session.mealDate ||
                  "Select Date"}

                {" • "}

                {

                  session.mealType ===
                    "BREAKFAST"
                    ? "Breakfast"

                    : session.mealType ===
                        "LUNCH"
                      ? "Lunch"

                      : session.mealType ===
                          "DINNER"
                        ? "Dinner"

                        : "Evening Snacks"
                }

                {" • "}

                {

                  session.guestCount ||
                  0

                }

                {" Guests"}

              </div>

            </div>
          )
        )
      }

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

  header: {
    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    marginBottom: "25px"
  },

  title: {
    margin: 0,

    fontSize: "28px",

    fontWeight: "700"
  },

  addButton: {
    background:
      "#7C3AED",

    color: "#FFFFFF",

    border: "none",

    borderRadius: "12px",

    padding:
      "12px 18px",

    cursor: "pointer",

    fontWeight: "600"
  },

  emptyBox: {
    textAlign: "center",

    padding: "40px",

    border:
      "1px dashed rgba(255,255,255,0.15)",

    borderRadius: "12px",

    color: "#9CA3AF"
  },

  sessionCard: {
    border:
      "1px solid rgba(255,255,255,0.08)",

    borderRadius: "16px",

    padding: "20px",

    marginBottom: "20px",

    background:
      "rgba(255,255,255,0.02)"
  },

  sessionHeader: {
    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    marginBottom: "20px"
  },

  sessionTitle: {
    margin: 0,

    color: "#D4AF37"
  },

  removeButton: {
    background:
      "#DC2626",

    color: "#FFFFFF",

    border: "none",

    borderRadius: "8px",

    padding:
      "8px 12px",

    cursor: "pointer"
  },

  formGroup: {
    display: "flex",

    flexDirection:
      "column",

    gap: "8px",

    marginBottom: "16px"
  },

  label: {
    color: "#D4AF37",

    fontWeight: "600"
  },

  input: {
    padding: "14px",

    borderRadius: "12px",

    border:
      "1px solid rgba(255,255,255,0.1)",

    background:
      "#FFFFFF",

    outline: "none"
  },

  summaryBox: {
    marginTop: "15px",

    padding: "14px",

    borderRadius: "10px",

    background:
      "rgba(124,58,237,0.1)",

    border:
      "1px solid rgba(124,58,237,0.2)",

    color: "#D1D5DB"
  }
};

export default MealSessionSelector;