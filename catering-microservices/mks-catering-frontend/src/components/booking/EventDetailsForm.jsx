import React from "react";

function EventDetailsForm({
  eventDetails,
  setEventDetails
}) {

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setEventDetails({
      ...eventDetails,
      [name]: value
    });
  };

  return (

    <div style={styles.card}>

      <h2 style={styles.title}>
        Event Information
      </h2>

      <div style={styles.divider} />

      {/* EVENT TYPE */}

      <div style={styles.formGroup}>

        <label style={styles.label}>
          Event Type *
        </label>

        <select
          name="eventType"
          value={eventDetails.eventType}
          onChange={handleChange}
          style={styles.input}
          required
        >

          <option value="">
            Select Event Type
          </option>

          <option value="WEDDING">
            Wedding
          </option>

          <option value="ENGAGEMENT">
            Engagement
          </option>

          <option value="BIRTHDAY">
            Birthday
          </option>

          <option value="CORPORATE">
            Corporate Event
          </option>

          <option value="HOUSE_WARMING">
            House Warming
          </option>

        </select>

      </div>

      {/* EVENT LOCATION */}

      <div style={styles.formGroup}>

        <label style={styles.label}>
          Event Location *
        </label>

        <input
          type="text"
          name="eventLocation"
          value={eventDetails.eventLocation}
          onChange={handleChange}
          placeholder="Enter Event Location"
          style={styles.input}
          required
        />

      </div>

      {/* SPECIAL INSTRUCTIONS */}

      <div style={styles.formGroup}>

        <label style={styles.label}>
          Special Instructions
        </label>

        <textarea
          rows="4"
          name="specialInstructions"
          value={
            eventDetails.specialInstructions
          }
          onChange={handleChange}
          placeholder="Optional Instructions"
          style={styles.textarea}
        />

      </div>

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

    backdropFilter: "blur(12px)"
  },

  title: {
    fontSize: "28px",

    fontWeight: "700",

    marginBottom: "12px",

    textAlign: "center"
  },

  divider: {
    height: "1px",

    background:
      "rgba(255,255,255,0.08)",

    marginBottom: "24px"
  },

  formGroup: {
    display: "flex",

    flexDirection: "column",

    gap: "8px",

    marginBottom: "20px"
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

    backgroundColor:
      "#FFFFFF",

    fontSize: "15px",

    outline: "none"
  },

  textarea: {
    padding: "14px",

    borderRadius: "12px",

    border:
      "1px solid rgba(255,255,255,0.1)",

    backgroundColor:
      "#FFFFFF",

    fontSize: "15px",

    resize: "vertical",

    outline: "none"
  }
};

export default EventDetailsForm;