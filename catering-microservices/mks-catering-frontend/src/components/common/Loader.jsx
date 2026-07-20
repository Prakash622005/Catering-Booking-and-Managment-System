import React from "react";

function Loader() {
  return (
    <div style={styles.loaderWrapper}>
      {/* GLOWING BACKGROUND LIGHT RADIANCE */}
      <div style={styles.ambientPulseGlow} />

      {/* CORE SPINNING LOGIC GRAPHIC PANEL */}
      <div style={styles.spinnerCore} />

      {/* SLIGHT EXTRA DECORATIVE GLOW ELEMENT */}
      <span style={styles.loaderLabel}>Initialising Experience...</span>

      {/* EMBEDDED KEYFRAME ANIMATION FOR ROTATION CONTEXT */}
      <style>
        {`
          @keyframes royalSpinnerRotation {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

// PREMIUM MATRICES STYLES SHEET SPECIFICATION
const styles = {
  loaderWrapper: {
    backgroundColor: "#090A0F",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "24px",
    position: "relative",
    overflow: "hidden",
    boxSizing: "border-box",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  ambientPulseGlow: {
    position: "absolute",
    width: "300px",
    height: "300px",
    background: "radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, transparent 65%)",
    pointerEvents: "none",
    zIndex: 1,
  },
  spinnerCore: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    border: "4px solid rgba(168, 85, 247, 0.12)",
    borderTop: "4px solid #A855F7",
    animation: "royalSpinnerRotation 0.95s linear infinite",
    boxShadow: "0 0 15px rgba(168, 85, 247, 0.25)",
    zIndex: 10,
    boxSizing: "border-box",
  },
  loaderLabel: {
    color: "#6B7280",
    fontSize: "14px",
    fontWeight: "500",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    zIndex: 10,
    marginTop: "8px"
  }
};

export default Loader;