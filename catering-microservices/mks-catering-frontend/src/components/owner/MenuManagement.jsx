import { useState } from "react";

function MenuManagement({

  foods,
  onAddFood,
  onDeleteFood

}) {

  const [foodData, setFoodData] = useState({

    foodName: "",

    description: "",

    imageUrl: ""
  });

  const handleChange = (e) => {

    setFoodData({

      ...foodData,

      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    onAddFood(foodData);

    setFoodData({

      foodName: "",

      description: "",

      imageUrl: ""
    });
  };

  return (
    <div style={styles.containerLayout}>

      {/* ADD FOOD CONTAINER */}
      <div style={styles.glassFormCard}>
        <h2 style={styles.sectionHeaderTitle}>
          Add Food Item
        </h2>

        <form
          onSubmit={handleSubmit}
          style={styles.formStructure}
        >
          <div style={styles.inputControlGroup}>
            <label style={styles.fieldLabel}>Food Reference Title</label>
            <input
              type="text"
              name="foodName"
              placeholder="e.g. Traditional Mini Idli Combo"
              value={foodData.foodName}
              onChange={handleChange}
              required
              style={styles.textInputBox}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#A78BFA")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)")}
            />
          </div>

          <div style={styles.inputControlGroup}>
            <label style={styles.fieldLabel}>Menu Description & Culinary Details</label>
            <textarea
              rows="4"
              name="description"
              placeholder="Provide information regarding key ingredients, course pairings, or dietary specifics..."
              value={foodData.description}
              onChange={handleChange}
              required
              style={styles.textAreaBox}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#A78BFA")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)")}
            />
          </div>

          <div style={styles.inputControlGroup}>
            <label style={styles.fieldLabel}>Display Showcase Asset URL</label>
            <input
              type="text"
              name="imageUrl"
              placeholder="Enter local path (/images/filename.jpg) or valid network asset URL"
              value={foodData.imageUrl}
              onChange={handleChange}
              required
              style={styles.textInputBox}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#A78BFA")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)")}
            />
          </div>

          <button
            type="submit"
            style={styles.submitBtnAction}
            onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            Append Item to Master Catalogue
          </button>
        </form>
      </div>

      {/* FOOD LIST SECTION */}
      <div style={styles.listSectionWrapper}>
        <h2 style={styles.sectionHeaderTitle}>
          Existing Food Items
        </h2>

        <div style={styles.menuItemsGridStructure}>
          {foods.map((food) => (
            <div
              key={food.menuId}
              style={styles.menuDisplayCard}
            >
              <div style={styles.imageCardContainer}>
                <img
                  src={food.imageUrl}
                  alt={food.foodName}
                  style={styles.cardPreviewImage}
                />
              </div>

              <div style={styles.cardContentWrapper}>
                <h3 style={styles.foodItemHeadingText}>
                  {food.foodName}
                </h3>

                <p style={styles.foodItemParagraphDescription}>
                  {food.description}
                </p>

                <button
                  onClick={() =>
                    onDeleteFood(food.menuId)
                  }
                  style={styles.deleteBtnAction}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.15)";
                    e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.4)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.04)";
                    e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.15)";
                  }}
                >
                  Remove from Inventory
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// PREMIUM DARK OBSIDIAN & ROYAL VIOLET ARCHITECTURAL STYLES
// =========================================================================
const styles = {
  containerLayout: {
    display: "flex",
    flexDirection: "column",
    gap: "48px",
    fontFamily: "system-ui, -apple-system, sans-serif",
    boxSizing: "border-box",
    width: "100%",
  },
  glassFormCard: {
    backgroundColor: "rgba(19, 22, 34, 0.45)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: "24px",
    padding: "40px",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.35)",
    boxSizing: "border-box",
    maxWidth: "850px",
    margin: "0 auto",
    width: "100%",
  },
  listSectionWrapper: {
    width: "100%",
    boxSizing: "border-box",
  },
  sectionHeaderTitle: {
    fontSize: "26px",
    fontWeight: "800",
    letterSpacing: "-0.02em",
    margin: "0 0 28px 0",
    background: "linear-gradient(135deg, #FFFFFF 30%, #C084FC 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  formStructure: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  inputControlGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  fieldLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#9CA3AF",
    letterSpacing: "0.01em",
  },
  textInputBox: {
    width: "100%",
    backgroundColor: "rgba(10, 11, 18, 0.5)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "14px",
    padding: "14px 16px",
    fontSize: "15px",
    color: "#FFFFFF",
    outline: "none",
    transition: "all 0.2s ease-in-out",
    boxSizing: "border-box",
  },
  textAreaBox: {
    width: "100%",
    backgroundColor: "rgba(10, 11, 18, 0.5)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "14px",
    padding: "14px 16px",
    fontSize: "15px",
    color: "#FFFFFF",
    outline: "none",
    transition: "all 0.2s ease-in-out",
    resize: "vertical",
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  submitBtnAction: {
    width: "100%",
    background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
    color: "#FFFFFF",
    padding: "16px 24px",
    border: "none",
    borderRadius: "14px",
    fontSize: "15.5px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 20px rgba(124, 58, 237, 0.25)",
    outline: "none",
    boxSizing: "border-box",
    marginTop: "8px",
  },
  menuItemsGridStructure: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "32px",
  },
  menuDisplayCard: {
    backgroundColor: "rgba(19, 22, 34, 0.35)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.25)",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    transition: "transform 0.2s ease",
  },
  imageCardContainer: {
    width: "100%",
    height: "200px",
    overflow: "hidden",
    position: "relative",
    backgroundColor: "rgba(10, 11, 18, 0.4)",
  },
  cardPreviewImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
  },
  cardContentWrapper: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    boxSizing: "border-box",
  },
  foodItemHeadingText: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#FFFFFF",
    margin: "0 0 10px 0",
    letterSpacing: "-0.01em",
  },
  foodItemParagraphDescription: {
    color: "#9CA3AF",
    fontSize: "14px",
    lineHeight: "1.6",
    margin: "0 0 24px 0",
    flexGrow: 1,
  },
  deleteBtnAction: {
    width: "100%",
    backgroundColor: "rgba(239, 68, 68, 0.04)",
    border: "1px solid rgba(239, 68, 68, 0.15)",
    color: "#F87171",
    padding: "12px 20px",
    borderRadius: "12px",
    fontSize: "13.5px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    letterSpacing: "0.01em",
    outline: "none",
    boxSizing: "border-box",
    marginTop: "auto",
  }
};

export default MenuManagement;