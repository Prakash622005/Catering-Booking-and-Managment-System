import React from "react";

function FoodCard({

  food,

  selectedFoods,

  onSelectFood

}) {

  const isSelected =

    selectedFoods.some(

      (item) =>

        item.itemId ===
        food.itemId
    );

  // DYNAMIC STYLE ADJUSTMENTS BASED ON STATE OVERRIDE MATRIX
  const dynamicCardBorder = isSelected
    ? { border: "1px solid #A855F7", boxShadow: "0 0 20px rgba(168, 85, 247, 0.25)" }
    : { border: "1px solid rgba(255, 255, 255, 0.06)", boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)" };

  const dynamicButtonStyles = isSelected
    ? { backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.35)", color: "#FCA5A5" }
    : { background: "linear-gradient(135deg, #7C3AED, #5B21B6)", border: "none", color: "#FFFFFF" };

  return (

    <div style={{ ...styles.cardContainer, ...dynamicCardBorder }}>

      <img
        src={food.imageUrl}
        alt={food.itemName}
        style={styles.foodThumbnailImage}
      />

      <h2 style={styles.foodTitleHeading}>

        {food.itemName}

      </h2>

      <p style={styles.foodDescriptionText}>

        {food.description}

      </p>

      <button
        onClick={() =>
          onSelectFood(food)
        }
        style={{ ...styles.actionBtnBase, ...dynamicButtonStyles }}
        onMouseOver={(e) => {
          if (isSelected) {
            e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.2)";
          } else {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(124, 58, 237, 0.4)";
          }
        }}
        onMouseOut={(e) => {
          if (isSelected) {
            e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
          } else {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }
        }}
      >

        {isSelected

          ? "Remove"

          : "Select Food"}
      </button>
    </div>
  );
}

// LUXURY INTERFACE DISPLAY MATRIX STYLING SPECIFICATIONS
const styles = {
  cardContainer: {
    backgroundColor: "rgba(19, 22, 34, 0.35)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    borderRadius: "20px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.25s cubic-bezier(0.25, 1, 0.5, 1)",
    fontFamily: "system-ui, -apple-system, sans-serif",
    boxSizing: "border-box",
  },
  foodThumbnailImage: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "14px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
  },
  foodTitleHeading: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: "16px",
    marginBottom: "0px",
    letterSpacing: "-0.01em",
  },
  foodDescriptionText: {
    color: "#9CA3AF",
    fontSize: "14px",
    lineHeight: "1.6",
    marginTop: "8px",
    marginBottom: "24px",
    flexGrow: 1,
  },
  actionBtnBase: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    letterSpacing: "0.02em",
    transition: "all 0.2s ease",
    outline: "none",
    boxSizing: "border-box",
  },
};

export default FoodCard;