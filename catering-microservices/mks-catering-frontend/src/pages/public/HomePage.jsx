import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div style={styles.mainWrapper}>
      {/* INJECTING ANIMATIONS FOR THE BORDER GLOW AND THE SEQUENTIAL TEXT WAVE */}
      <style>{`
        @keyframes goldenGlow {
          0% {
            box-shadow: 0 8px 32px rgba(212, 175, 55, 0.25), 0 0 10px rgba(212, 175, 55, 0.2);
            border-color: rgba(212, 175, 55, 0.8);
          }
          50% {
            box-shadow: 0 12px 40px rgba(212, 175, 55, 0.6), 0 0 25px rgba(212, 175, 55, 0.5);
            border-color: rgba(251, 191, 36, 1);
          }
          100% {
            box-shadow: 0 8px 32px rgba(212, 175, 55, 0.25), 0 0 10px rgba(212, 175, 55, 0.2);
            border-color: rgba(212, 175, 55, 0.8);
          }
        }

        @keyframes letterSequentialGlow {
          0%, 100% {
            color: #FFFFFF;
            text-shadow: none;
          }
          20% {
            color: #FFFDF0;
            text-shadow: 0 0 12px rgba(255, 255, 255, 0.6), 0 0 24px rgba(212, 175, 55, 0.9), 0 0 36px rgba(124, 58, 237, 0.4);
          }
          40% {
            color: #FFFFFF;
            text-shadow: none;
          }
        }

        .glow-letter {
          display: inline-block;
          animation: letterSequentialGlow 3s infinite ease-in-out;
        }

        /* TIMING DELAYS TO PASS THE GLOW WAVE FROM M -> K -> S SEQUENTIALLY */
        .delay-m { animation-delay: 0.0s; }
        .delay-k { animation-delay: 0.4s; }
        .delay-s { animation-delay: 0.8s; }
      `}</style>

      {/* BACKGROUND IMAGE FROM YOUR PUBLIC FOLDER */}
      <div
        style={{
          ...styles.backgroundImage,
          backgroundImage: "url('/image_f1311a.jpg')"
        }}
      />

      {/* LIGHTENED VIGNETTE OVERLAYS TO MAKE THE LEAF VISIBLE */}
      <div style={styles.vignetteVertical} />
      <div style={styles.vignetteHorizontal} />

      {/* CONTENT WRAPPER */}
      <div style={styles.contentContainer}>

        {/* SACRED EMBLEM LOGO CONTAINER WITH ANIMATION */}
        <div style={styles.sacredLogoContainer}>
          <img
            src="/Lord_Murugar_Images.jpg"
            alt="Bala Murugan Divine Presence"
            style={styles.sacredLogoImage}
          />
        </div>

        {/* BRAND LABEL */}
        <span style={styles.brandLabel}>
          Traditional Tamil Heritage Catering
        </span>

        {/* TITLE WITH WAVE ANIMATED INDIVIDUAL LETTERS */}
        <h1 style={styles.titleMain}>
          <span className="glow-letter delay-m">M</span>
          <span>.</span>
          <span className="glow-letter delay-k">K</span>
          <span>.</span>
          <span className="glow-letter delay-s">S</span>

          <span style={styles.titleSubtitle}>
            Catering And Services
          </span>
        </h1>

        {/* SUBTITLE */}
        <p style={styles.paragraphDescription}>
          Premium catering services for weddings, birthdays, corporate events,
          engagements, and family celebrations.
        </p>

        {/* BUTTONS CONTAINER */}
        <div style={styles.buttonGroup}>
          {/* LOGIN */}
          <Link to="/login" style={styles.buttonLogin}>
            Login
          </Link>

          {/* REGISTER */}
          <Link to="/register" style={styles.buttonRegister}>
            Register
          </Link>
        </div>

        {/* FOOTER TEXT */}
        <div style={styles.footerText}>
          Trusted Catering Partner For Every Occasion
        </div>
      </div>
    </div>
  );
}

// THEME DESIGN OBJECT: MODERN ROYAL & DARK CULINARY ELEGANCE
const styles = {
  mainWrapper: {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
    backgroundColor: "#090A0F",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  backgroundImage: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    /* INCREASED OPACITY from 0.38 to 0.65 to bring out the green leaf and food items */
    opacity: 0.65,
    transform: "scale(1.02)",
  },
  vignetteVertical: {
    position: "absolute",
    inset: 0,
    /* REDUCED BLACK SHADE: Dropped middle opacity from 0.7 to 0.35 and compressed the bottom solid block */
    background: "linear-gradient(to top, #090A0F 5%, rgba(9, 10, 15, 0.35) 50%, transparent 100%)",
  },
  vignetteHorizontal: {
    position: "absolute",
    inset: 0,
    /* REDUCED SIDE SHADOWS: Softened the edges from 0.95 to 0.45 to uncover the left and right dishes */
    background: "linear-gradient(to right, rgba(9, 10, 15, 0.45) 0%, transparent 50%, rgba(9, 10, 15, 0.45) 100%)",
  },
  contentContainer: {
    position: "relative",
    zIndex: 10,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingLeft: "16px",
    paddingRight: "16px",
    maxWidth: "960px",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: "40px",
    paddingBottom: "80px",
  },
  sacredLogoContainer: {
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    border: "2.5px solid #D4AF37",
    padding: "4px",
    background: "rgba(9, 10, 15, 0.6)",
    backdropFilter: "blur(8px)",
    marginBottom: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    animation: "goldenGlow 3s infinite ease-in-out",
  },
  sacredLogoImage: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
  },
  brandLabel: {
    color: "#D4AF37",
    textTransform: "uppercase",
    letterSpacing: "0.25em",
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "20px",
    backgroundColor: "rgba(9, 10, 15, 0.75)", /* Slightly darker background behind the label for flawless readability */
    padding: "8px 20px",
    borderRadius: "9999px",
    border: "1px solid rgba(212, 175, 55, 0.3)",
    backdropFilter: "blur(8px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
  },
  titleMain: {
    color: "#FFFFFF",
    fontSize: "calc(2.2rem + 3.2vw)",
    fontWeight: "1000",
    letterSpacing: "0.02em",
    lineHeight: "1.1",
    fontFamily: "Georgia, serif",
    textTransform: "uppercase",
    margin: 0,
  },
  titleSubtitle: {
    display: "block",
    fontSize: "calc(1.4rem + 1.4vw)",
    marginTop: "12px",
    fontWeight: "500",
    letterSpacing: "normal",
    textTransform: "none",
    fontFamily: "Georgia, serif",
    fontStyle: "italic",
    background: "linear-gradient(135deg, #8B5CF6, #A78BFA, #D4AF37)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  paragraphDescription: {
    color: "#FFFFFF", /* Swapped to crisp white to guarantee sharp text visibility over the brighter background */
    fontSize: "calc(1rem + 0.25vw)",
    marginTop: "32px",
    maxWidth: "640px",
    fontWeight: "400", /* Slightly bolder weight so the descriptions pop over the food textures */
    lineHeight: "1.7",
    letterSpacing: "0.01em",
    textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)", /* Added text-shadow drop for perfect contrast */
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "24px",
    marginTop: "48px",
    width: "100%",
    maxWidth: "480px",
  },
  buttonLogin: {
    flex: "1 1 180px",
    background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
    color: "#FFFFFF",
    padding: "16px 40px",
    borderRadius: "12px",
    fontSize: "18px",
    fontWeight: "700",
    textDecoration: "none",
    letterSpacing: "0.03em",
    boxShadow: "0 4px 20px rgba(124, 58, 237, 0.4)",
    textAlign: "center",
    transition: "transform 0.2s ease",
  },
  buttonRegister: {
    flex: "1 1 180px",
    backgroundColor: "rgba(19, 22, 34, 0.75)", /* Darker container backdrop for crisp text readability */
    color: "#FFFFFF",
    border: "1px solid rgba(255, 255, 255, 0.4)",
    padding: "16px 40px",
    borderRadius: "12px",
    fontSize: "18px",
    fontWeight: "700",
    textDecoration: "none",
    letterSpacing: "0.03em",
    backdropFilter: "blur(12px)",
    textAlign: "center",
    transition: "transform 0.2s ease",
  },
  footerText: {
    position: "absolute",
    bottom: "40px",
    left: "20px",
    right: "20px",
    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
    paddingTop: "16px",
    color: "#E5E7EB", /* Lightened footer color with a subtle drop shadow */
    fontSize: "13px",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    fontWeight: "600",
    textShadow: "0 1px 4px rgba(0, 0, 0, 0.6)",
  },
};

export default HomePage;