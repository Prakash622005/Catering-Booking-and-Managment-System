import React from "react";

function OrderCard({

  order,

  onView

}) {

  // STATUS COLOR GRADIENT MATCHES

  const getStatusColor = () => {

    switch (
      order.bookingStatus
    ) {

      case "CONFIRMED":

        return "linear-gradient(90deg, #10B981, #059669)";

      case "REJECTED":

        return "linear-gradient(90deg, #EF4444, #DC2626)";

      case "REVIEWING":

        return "linear-gradient(90deg, #F59E0B, #D97706)";

      default:

        return "linear-gradient(90deg, #3B82F6, #2563EB)";
    }
  };

  return (

    <div style={styles.cardContainer}>

      {/* STATUS BAR */}

      <div
        style={{
          ...styles.statusBar,
          background: getStatusColor()
        }}
      />

      {/* CONTENT */}

      <div style={styles.cardPadding}>

        <div style={styles.headerGroup}>

          <h2 style={styles.orderTitle}>

            Order #{order.bookingId}

          </h2>

          <p style={styles.eventTypeSubtitle}>

            {order.eventType}
          </p>
        </div>

        {/* CUSTOMER */}

        <div style={styles.customerMetricsBlock}>

          <p style={styles.metricRow}>

            <span style={styles.metricLabel}>

              Customer:

            </span>

            {" "}

            {order.customer?.fullName}

          </p>

          <p style={styles.metricRow}>

            <span style={styles.metricLabel}>

              Phone:

            </span>

            {" "}

            {order.customer?.phone}

          </p>

          <p style={styles.metricRow}>
            <span style={styles.metricLabel}>
              Sessions:
            </span>

            <span style={styles.guestHighlightCount}>
              {order.mealSessions?.length || 0}
            </span>
          </p>
        </div>

        {/* FOODS */}

        <div style={styles.foodsSectionWrapper}>

          <h3 style={styles.foodsTitleHeading}>

            Foods
          </h3>

          <div style={styles.badgeFlexContainer}>

            {order.foods?.map(
              (food) => (

                <span
                  key={food.itemId}
                  style={styles.foodItemBadge}
                >

                  {food.itemName}

                </span>
              )
            )}
          </div>
        </div>

        {/* BUTTON */}

        <button
          onClick={() =>
            onView(order)
          }
          style={styles.actionBtnPrimary}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(168, 85, 247, 0.35)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 14px rgba(124, 58, 237, 0.2)";
          }}
        >

          View Order

        </button>
      </div>
    </div>
  );
}

// PREMIUM MATRICES DESIGN SYSTEM SPECIFICATIONS
const styles = {
  cardContainer: {
    backgroundColor: "rgba(19, 22, 34, 0.3)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column",
    fontFamily: "system-ui, -apple-system, sans-serif",
    boxSizing: "border-box",
  },
  statusBar: {
    height: "4px",
    width: "100%",
  },
  cardPadding: {
    padding: "28px",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    boxSizing: "border-box",
  },
  headerGroup: {
    marginBottom: "20px",
  },
  orderTitle: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#FFFFFF",
    margin: 0,
    letterSpacing: "-0.01em",
  },
  eventTypeSubtitle: {
    color: "#A855F7",
    fontSize: "14px",
    fontWeight: "600",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    margin: "6px 0 0 0",
  },
  customerMetricsBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    paddingBottom: "20px",
    marginBottom: "20px",
  },
  metricRow: {
    margin: 0,
    fontSize: "15px",
    color: "#E5E7EB",
    fontWeight: "400",
  },
  metricLabel: {
    color: "#9CA3AF",
    fontWeight: "500",
  },
  guestHighlightCount: {
    fontWeight: "700",
    color: "#FFFFFF",
  },
  foodsSectionWrapper: {
    flexGrow: 1,
    marginBottom: "28px",
  },
  foodsTitleHeading: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#9CA3AF",
    letterSpacing: "0.03em",
    textTransform: "uppercase",
    margin: "0 0 12px 0",
  },
  badgeFlexContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  foodItemBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    color: "#E5E7EB",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "500",
  },
  actionBtnPrimary: {
    width: "100%",
    background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
    color: "#FFFFFF",
    padding: "13px 24px",
    border: "none",
    borderRadius: "14px",
    fontSize: "15px",
    fontWeight: "700",
    letterSpacing: "0.01em",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 14px rgba(124, 58, 237, 0.2)",
    outline: "none",
    boxSizing: "border-box",
  },
};

export default OrderCard;