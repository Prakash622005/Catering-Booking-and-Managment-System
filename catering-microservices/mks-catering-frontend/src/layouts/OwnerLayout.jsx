import { Outlet } from "react-router-dom";

import Navbar
from "../components/common/Navbar";

function OwnerLayout() {

  return (

    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}

      <Navbar />

      {/* HEADER */}

      <div style={styles.masterHeaderWrapper}>
        <div style={styles.centeredContentContainer}>

          <h1 style={styles.maxiGlowTitle}>
            Owner Dashboard
          </h1>

          <p style={styles.highlightedSubtitleText}>
            M.K.S Catering Management System
          </p>

        </div>
      </div>

      {/* PAGE CONTENT */}

      <main className="max-w-7xl mx-auto px-4 py-8">

        <Outlet />

      </main>
    </div>
  );
}

const styles = {
  masterHeaderWrapper: {
    width: "100%",
    backgroundColor: "rgba(19, 22, 34, 0.25)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
    paddingTop: "48px",
    paddingBottom: "48px",
    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)",
    boxSizing: "border-box",
  },
  centeredContentContainer: {
    maxWidth: "1280px",
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: "16px",
    paddingRight: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    boxSizing: "border-box",
  },
  maxiGlowTitle: {
    // Highly amplified font presentation matrix
    fontSize: "48px",
    fontWeight: "900",
    letterSpacing: "-0.03em",
    lineHeight: "1.2",
    margin: 0,
    background: "linear-gradient(135deg, #FFFFFF 10%, #C084FC 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 0 30px rgba(168, 85, 247, 0.15)",
  },
  highlightedSubtitleText: {
    // Boldened silver high-contrast label configuration
    color: "#E5E7EB",
    fontSize: "18px",
    fontWeight: "600",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    marginTop: "12px",
    marginBottom: 0,
  },
};

export default OwnerLayout;