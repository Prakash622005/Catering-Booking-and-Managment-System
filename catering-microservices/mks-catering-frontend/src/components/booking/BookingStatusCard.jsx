import React from "react";

function BookingStatusCard({ booking }) {

  // MAP ORIGINAL CONDITIONAL OUTPUTS TO MODERN LUMINOUS BADGE STYLES
  const getStatusStyles = () => {
    switch (booking.bookingStatus) {
      case "NEW":
        return {
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          color: "#60A5FA",
          borderColor: "rgba(59, 130, 246, 0.25)"
        };
      case "REVIEWING":
        return {
          backgroundColor: "rgba(234, 179, 8, 0.1)",
          color: "#FACC15",
          borderColor: "rgba(234, 179, 8, 0.25)"
        };
      case "QUOTATION_SENT":
        return {
          backgroundColor: "rgba(249, 115, 22, 0.1)",
          color: "#FB923C",
          borderColor: "rgba(249, 115, 22, 0.25)"
        };
      case "CONFIRMED":
        return {
          backgroundColor: "rgba(34, 197, 94, 0.1)",
          color: "#4ADE80",
          borderColor: "rgba(34, 197, 94, 0.25)"
        };
      case "REJECTED":
        return {
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          color: "#F87171",
          borderColor: "rgba(239, 68, 68, 0.25)"
        };
      case "PAID":
        return {
          backgroundColor: "rgba(168, 85, 247, 0.1)",
          color: "#C084FC",
          borderColor: "rgba(168, 85, 247, 0.25)"
        };
      default:
        return {
          backgroundColor: "rgba(156, 163, 175, 0.1)",
          color: "#9CA3AF",
          borderColor: "rgba(156, 163, 175, 0.25)"
        };
    }
  };

  const statusStyle = getStatusStyles();

  return (
    <div style={styles.cardContainer}>
      {/* GLOWING ACCENT SIDEBAR INDICATOR */}
      <div style={{ ...styles.accentSidebar, backgroundColor: statusStyle.color }} />

      {/* HEADER SECTION */}
      <div style={styles.cardHeader}>
        <h2 style={styles.orderTitle}>Order #{booking.bookingId}</h2>
        <span
          style={{
            ...styles.statusBadge,
            backgroundColor: statusStyle.backgroundColor,
            color: statusStyle.color,
            borderColor: statusStyle.borderColor
          }}
        >
          {booking.bookingStatus}
        </span>
      </div>

      {/* DETAILS GRID LAYOUT */}
      <div style={styles.detailsGrid}>
        <div style={styles.detailItem}>
          <span style={styles.label}>Event:</span>
          <span style={styles.value}>{booking.eventType}</span>
        </div>

        <div style={styles.detailItem}>
          <span style={styles.label}>Guests:</span>
          <span style={styles.value}>{booking.guestCount}</span>
        </div>

        <div style={styles.detailItem}>
          <span style={styles.label}>Location:</span>
          <span style={styles.value}>{booking.eventLocation}</span>
        </div>

        <div style={styles.detailItem}>
          <span style={styles.label}>Event Date:</span>
          <span style={styles.value}>{booking.eventDate}</span>
        </div>

        {/* OWNER REMARKS BLOCK */}
        {booking.ownerRemarks && (
          <div style={styles.remarksBlock}>
            <span style={styles.remarksLabel}>Owner Notes:</span>
            <p style={styles.remarksValue}>{booking.ownerRemarks}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// PREMIUM DESIGN MATRIX STYLES
const styles = {
  cardContainer: {
    position: "relative",
    backgroundColor: "rgba(19, 22, 34, 0.45)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: "20px",
    padding: "24px 24px 24px 32px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
    color: "#FFFFFF",
    fontFamily: "system-ui, -apple-system, sans-serif",
    boxSizing: "border-box",
    overflow: "hidden",
    width: "100%",
  },
  accentSidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "6px",
    borderRadius: "6px 0 0 6px",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    gap: "12px",
  },
  orderTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#FFFFFF",
    margin: 0,
    letterSpacing: "-0.01em",
  },
  statusBadge: {
    padding: "6px 16px",
    borderRadius: "9999px",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    border: "1px solid transparent",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  },
  detailsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  detailItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: "10px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.03)",
    fontSize: "14.5px",
  },
  label: {
    color: "#9CA3AF",
    fontWeight: "500",
  },
  value: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  remarksBlock: {
    marginTop: "6px",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.04)",
    borderRadius: "12px",
    padding: "12px 16px",
  },
  remarksLabel: {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#D4AF37",
    marginBottom: "4px",
    letterSpacing: "0.02em",
  },
  remarksValue: {
    color: "#E5E7EB",
    fontSize: "13.5px",
    lineHeight: "1.5",
    margin: 0,
    fontWeight: "300",
  },
};

export default BookingStatusCard;