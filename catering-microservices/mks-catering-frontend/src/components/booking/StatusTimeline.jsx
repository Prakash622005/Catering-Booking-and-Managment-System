import React from "react";

function StatusTimeline({ currentStatus }) {
  const statuses = [
    "NEW",
    "REVIEWING",
    "QUOTATION_SENT",
    "CONFIRMED",
    "PAID"
  ];

  const getStepColor = (status) => {
    const currentIndex = statuses.indexOf(currentStatus);
    const stepIndex = statuses.indexOf(status);

    // Dynamic style configuration object instead of template tailwind strings
    return stepIndex <= currentIndex
      ? styles.activeStep
      : styles.inactiveStep;
  };

  return (
    <div style={styles.timelineWrapper}>
      {statuses.map((status, index) => {
        const stepStyle = getStepColor(status);
        return (
          <React.Fragment key={status}>
            {/* TIMELINE INDICATOR ACCENT BADGE */}
            <div style={{ ...styles.stepBadge, ...stepStyle }}>
              <span style={styles.stepText}>{status}</span>
            </div>

            {/* CONNECTIVE PATHWAY DECORATION BETWEEN ELEMENTS */}
            {index < statuses.length - 1 && (
              <div
                style={{
                  ...styles.connectorLine,
                  background: statuses.indexOf(currentStatus) > index
                    ? "linear-gradient(90deg, #7C3AED, #5B21B6)"
                    : "rgba(255, 255, 255, 0.08)"
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// PREMIUM MATRIX SELECTION SPEC SHEET STYLES
const styles = {
  timelineWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "12px",
    marginTop: "40px",
    width: "100%",
    padding: "16px",
    boxSizing: "border-box",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  stepBadge: {
    padding: "12px 24px",
    borderRadius: "9999px",
    fontWeight: "700",
    fontSize: "13px",
    letterSpacing: "0.05em",
    textAlign: "center",
    border: "1px solid transparent",
    transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
    boxSizing: "border-box",
  },
  activeStep: {
    background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
    color: "#FFFFFF",
    borderColor: "rgba(139, 92, 246, 0.3)",
    boxShadow: "0 4px 20px rgba(124, 58, 237, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
  },
  inactiveStep: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    color: "#6B7280",
    borderColor: "rgba(255, 255, 255, 0.05)",
    boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.2)",
  },
  stepText: {
    textTransform: "uppercase",
  },
  connectorLine: {
    height: "2px",
    width: "30px",
    minWidth: "16px",
    flexGrow: 1,
    maxWidth: "60px",
    borderRadius: "2px",
    transition: "background 0.3s ease",
  }
};

export default StatusTimeline;