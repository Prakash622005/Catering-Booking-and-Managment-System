import React from "react";

function FoodDetailsModal({

  food,
  onClose

}) {

  if (!food) return null;

  return (

    <div style={styles.modalOverlay}>

      <div style={styles.modalWindowCard}>

        {/* IMAGE */}

        <img
          src={food.imageUrl}
          alt={food.foodName}
          style={styles.modalImageHero}
        />

        {/* CONTENT */}

        <div style={styles.modalBodyContent}>

          <h2 style={styles.itemTitleHeading}>

            {food.foodName}

          </h2>

          <p style={styles.itemDescriptionText}>

            {food.description}

          </p>

          {/* CLOSE BUTTON */}

          <button
            onClick={onClose}
            style={styles.closeBtnAction}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.25)")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.1)")}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// LUXURY THEME SPEC MATRIX FOR EXPERIENTIAL MODALS
const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(4, 5, 9, 0.82)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5000,
    padding: "16px",
    boxSizing: "border-box",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  modalWindowCard: {
    backgroundColor: "rgba(19, 22, 34, 0.85)",
    backdropFilter: "blur(25px)",
    WebkitBackdropFilter: "blur(25px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "24px",
    width: "100%",
    maxWidth: "600px",
    overflow: "hidden",
    boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(124, 58, 237, 0.05)",
    boxSizing: "border-box",
  },
  modalImageHero: {
    width: "100%",
    height: "280px",
    objectFit: "cover",
    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
  },
  modalBodyContent: {
    padding: "32px",
    boxSizing: "border-box",
  },
  itemTitleHeading: {
    fontSize: "28px",
    fontWeight: "800",
    letterSpacing: "-0.01em",
    margin: "0 0 16px 0",
    background: "linear-gradient(135deg, #FFFFFF, #C084FC)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  itemDescriptionText: {
    color: "#9CA3AF",
    fontSize: "15px",
    lineHeight: "1.7",
    fontWeight: "400",
    margin: "0 0 32px 0",
  },
  closeBtnAction: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    color: "#FCA5A5",
    padding: "12px 28px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.25s ease",
    letterSpacing: "0.02em",
    outline: "none",
  }
};

export default FoodDetailsModal;