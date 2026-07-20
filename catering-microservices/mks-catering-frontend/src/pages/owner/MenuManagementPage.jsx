import {
  useEffect,
  useState
} from "react";

import menuService
from "../../services/menuService";

function MenuManagementPage() {

  const [foods, setFoods] =
    useState([]);

  const [selectedIds,
    setSelectedIds] =
    useState([]);

  const [foodName,
    setFoodName] =
    useState("");

  const [foodTiming,
    setFoodTiming] =
    useState("BREAKFAST");

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
          error
        );
      }
    };

  // ADD FOOD

  const handleAddFood =
    async () => {

      try {

        await menuService
          .addFood({

            foodName,

            foodTiming
          });

        setFoodName("");

        fetchFoods();

        alert(
          "Food Added"
        );

      } catch (error) {

        console.error(
          error
        );
      }
    };

  // CHECKBOX

  const toggleFood =
    (id) => {

      setSelectedIds(

        (prev) =>

          prev.includes(id)

            ? prev.filter(
                (x) =>
                  x !== id
              )

            : [
                ...prev,
                id
              ]
      );
    };

  // DELETE

  const deleteSelected =
    async () => {

      try {

        await Promise.all(

          selectedIds.map(
            (id) =>

              menuService
                .deleteFood(
                  id
                )
          )
        );

        setSelectedIds([]);

        fetchFoods();

      } catch (error) {

        console.error(
          error
        );
      }
    };

  const timings = [

    "BREAKFAST",
    "LUNCH",
    "EVENING",
    "DINNER"
  ];

  return (
    <div style={styles.pageOuterWrapper}>
      <div style={styles.constrainedContentBox}>

        {/* CONTAINER HEADER BANNER */}
        <div style={styles.dashboardHeaderBlock}>
          <h1 style={styles.premiumBrandTitleHeading}>
            Menu Management
          </h1>
          <p style={styles.brandSubtitleSupportText}>
            Establish backend master database catalogue frameworks for meal course divisions
          </p>
        </div>

        {/* INTERACTIVE ASSET ENTRY COMPONENT */}
        <div style={styles.glassmorphicEntryFormCard}>
          <h2 style={styles.panelBlockSubtitleHeading}>Append Course Asset</h2>

          <div style={styles.formSplitGridRow}>
            <div style={styles.inputControlGroup}>
              <label style={styles.formFieldLabelText}>Dish Nomenclature</label>
              <input
                type="text"
                placeholder="e.g. Ghee Pongal with Medu Vada"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                style={styles.premiumTextInputField}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#A78BFA")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)")}
              />
            </div>

            <div style={styles.inputControlGroup}>
              <label style={styles.formFieldLabelText}>Service Category Scheduling</label>
              <select
                value={foodTiming}
                onChange={(e) => setFoodTiming(e.target.value)}
                style={styles.premiumDropdownSelectionBox}
              >
                {timings.map((timing) => (
                  <option key={timing} value={timing} style={styles.nativeOptionElement}>
                    {timing}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleAddFood}
            style={styles.submitCateringActionBtn}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(16, 185, 129, 0.25)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(16, 185, 129, 0.15)";
            }}
          >
            Add Food Item
          </button>
        </div>

        {/* DYNAMIC MASTER TIMING GROUPS DISPATCH ARCHITECTURE */}
        <div style={styles.masterMenuVerticalStack}>
          {timings.map((timing) => {
            const items = foods.filter((food) => food.foodTiming === timing);

            return (
              <div key={timing} style={styles.timingSectionAccordionCard}>
                <div style={styles.timingSectionHeaderStrip}>
                  <h2 style={styles.timingCategoryBadgeHeading}>{timing}</h2>
                  <span style={styles.itemsCounterLabelBadge}>
                    {items.length} {items.length === 1 ? 'Item' : 'Items'} Listed
                  </span>
                </div>

                <div style={styles.itemsGridDisplayCanvas}>
                  {items.length > 0 ? (
                    items.map((food) => {
                      const isChecked = selectedIds.includes(food.id);
                      return (
                        <div
                          key={food.id}
                          onClick={() => toggleFood(food.id)}
                          style={isChecked ? { ...styles.foodSelectionCardRow, ...styles.activeSelectedCardRow } : styles.foodSelectionCardRow}
                        >
                          <div style={styles.checkboxWrapperAlignment}>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}} // Controlled by the parent row card element click event execution safely
                              style={styles.customStructuredCheckboxInput}
                            />
                          </div>
                          <span style={isChecked ? { ...styles.dishRecordTextName, ...styles.activeDishRecordTextName } : styles.dishRecordTextName}>
                            {food.foodName}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <div style={styles.emptyGroupFallbackBox}>
                      No registry assets allocated to this specific service module.
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* BULK ACTION MANAGEMENT CONTROLLER PANEL */}
        {selectedIds.length > 0 && (
          <div style={styles.bulkActionBarAnchorSticky}>
            <div style={styles.bulkActionContextMessage}>
              <span style={styles.bulkCountNumberHighlight}>{selectedIds.length}</span> items queued inside selection payload cache.
            </div>
            <button
              onClick={deleteSelected}
              style={styles.deleteInventoryActionBtn}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(239, 68, 68, 0.3)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 14px rgba(239, 68, 68, 0.15)";
              }}
            >
              Purge Selected Assets
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

// =========================================================================
// PREMIUM OBSIDIAN GLASSMORPHIC & VIOLET STYLING SPECIFICATIONS MATRIX
// =========================================================================
const styles = {
  pageOuterWrapper: {
    minHeight: "100vh",
    backgroundColor: "#0A0B12",
    backgroundImage: "radial-gradient(circle at 80% 15%, rgba(124, 58, 237, 0.06) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(167, 139, 250, 0.03) 0%, transparent 40%)",
    color: "#FFFFFF",
    fontFamily: "system-ui, -apple-system, sans-serif",
    paddingTop: "40px",
    paddingBottom: "80px",
    boxSizing: "border-box",
  },
  constrainedContentBox: {
    maxWidth: "1000px",
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: "24px",
    paddingRight: "24px",
    boxSizing: "border-box",
  },
  dashboardHeaderBlock: {
    marginBottom: "36px",
  },
  premiumBrandTitleHeading: {
    fontSize: "32px",
    fontWeight: "800",
    letterSpacing: "-0.02em",
    margin: "0 0 8px 0",
    background: "linear-gradient(135deg, #FFFFFF 20%, #C084FC 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  brandSubtitleSupportText: {
    color: "#9CA3AF",
    fontSize: "14.5px",
    lineHeight: "1.5",
    margin: 0,
  },
  glassmorphicEntryFormCard: {
    backgroundColor: "rgba(19, 22, 34, 0.45)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: "20px",
    padding: "32px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
    marginBottom: "40px",
    boxSizing: "border-box",
  },
  panelBlockSubtitleHeading: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#A78BFA",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    margin: "0 0 24px 0",
    paddingBottom: "6px",
    borderBottom: "1px solid rgba(167, 139, 250, 0.15)",
  },
  formSplitGridRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
    marginBottom: "24px",
  },
  inputControlGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  formFieldLabelText: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#9CA3AF",
    letterSpacing: "0.01em",
  },
  premiumTextInputField: {
    width: "100%",
    backgroundColor: "rgba(10, 11, 18, 0.5)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    padding: "14px 16px",
    fontSize: "15px",
    color: "#FFFFFF",
    outline: "none",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
  },
  premiumDropdownSelectionBox: {
    width: "100%",
    backgroundColor: "rgba(10, 11, 18, 0.5)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    padding: "14px 16px",
    fontSize: "15px",
    color: "#FFFFFF",
    outline: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
    appearance: "none",
    WebkitAppearance: "none",
  },
  nativeOptionElement: {
    backgroundColor: "#111322",
    color: "#FFFFFF",
  },
  submitCateringActionBtn: {
    background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
    color: "#FFFFFF",
    padding: "14px 28px",
    border: "none",
    borderRadius: "12px",
    fontSize: "14.5px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.15)",
    outline: "none",
  },
  masterMenuVerticalStack: {
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  },
  timingSectionAccordionCard: {
    backgroundColor: "rgba(19, 22, 34, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.04)",
    borderRadius: "20px",
    padding: "24px",
    boxSizing: "border-box",
  },
  timingSectionHeaderStrip: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },
  timingCategoryBadgeHeading: {
    fontSize: "16px",
    fontWeight: "800",
    color: "#FBBF24",
    letterSpacing: "0.03em",
    margin: 0,
    background: "rgba(251, 191, 36, 0.06)",
    padding: "6px 14px",
    borderRadius: "10px",
    border: "1px solid rgba(251, 191, 36, 0.15)",
  },
  itemsCounterLabelBadge: {
    fontSize: "13px",
    color: "#9CA3AF",
    fontWeight: "500",
  },
  itemsGridDisplayCanvas: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "12px",
  },
  foodSelectionCardRow: {
    backgroundColor: "rgba(10, 11, 18, 0.4)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "14px",
    padding: "14px 18px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    userSelect: "none",
  },
  activeSelectedCardRow: {
    backgroundColor: "rgba(124, 58, 237, 0.08)",
    borderColor: "rgba(167, 139, 250, 0.4)",
    boxShadow: "0 4px 15px rgba(124, 58, 237, 0.1)",
  },
  checkboxWrapperAlignment: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  customStructuredCheckboxInput: {
    width: "18px",
    height: "18px",
    borderRadius: "6px",
    accentColor: "#A78BFA",
    cursor: "pointer",
  },
  dishRecordTextName: {
    fontSize: "14.5px",
    fontWeight: "500",
    color: "#E5E7EB",
    transition: "color 0.2s ease",
  },
  activeDishRecordTextName: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  emptyGroupFallbackBox: {
    gridColumn: "1 / -1",
    padding: "20px",
    textAlign: "center",
    color: "#6B7280",
    fontSize: "14px",
    fontStyle: "italic",
    backgroundColor: "rgba(10, 11, 18, 0.15)",
    borderRadius: "12px",
    border: "1px dashed rgba(255, 255, 255, 0.03)",
  },
  bulkActionBarAnchorSticky: {
    position: "fixed",
    bottom: "28px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "rgba(17, 12, 28, 0.8)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(167, 139, 250, 0.25)",
    borderRadius: "18px",
    padding: "16px 28px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    gap: "32px",
    zIndex: 100,
    animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  bulkActionContextMessage: {
    fontSize: "14.5px",
    color: "#D1D5DB",
  },
  bulkCountNumberHighlight: {
    color: "#C084FC",
    fontWeight: "800",
    fontSize: "16px",
  },
  deleteInventoryActionBtn: {
    background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
    color: "#FFFFFF",
    padding: "12px 22px",
    border: "none",
    borderRadius: "12px",
    fontSize: "13.5px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 14px rgba(239, 68, 68, 0.15)",
    outline: "none",
  }
};

export default MenuManagementPage;