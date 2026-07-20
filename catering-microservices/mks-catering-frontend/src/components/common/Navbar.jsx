import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    navigate("/login");
  };

  return (

    <nav style={styles.navBar}>

      <div style={styles.navContainer}>

        {/* LOGO */}

        <Link
          to="/"
          style={styles.logoText}
        >
          M.K.S CATERING
        </Link>

        {/* NAVIGATION */}

        <div style={styles.navLinksGroup}>

          {!role && (

            <>
              <Link
                to="/login"
                style={styles.loginBtn}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                Login
              </Link>

              <Link
                to="/register"
                style={styles.registerBtn}
                onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                Register
              </Link>
            </>
          )}

          {role === "CUSTOMER" && (

            <>
              <Link
                to="/customer/menu"
                style={styles.navLinkItem}
                onMouseOver={(e) => (e.currentTarget.style.color = "#A855F7")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#E5E7EB")}
              >
                Foods
              </Link>

              <Link
                to="/customer/status"
                style={styles.navLinkItem}
                onMouseOver={(e) => (e.currentTarget.style.color = "#A855F7")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#E5E7EB")}
              >
                Booking Status
              </Link>

              <button
                onClick={logout}
                style={styles.logoutBtn}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.2)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.08)")}
              >
                Logout
              </button>
            </>
          )}

          {role === "OWNER" && (

            <>
              <Link
                to="/owner/dashboard"
                style={styles.navLinkItem}
                onMouseOver={(e) => (e.currentTarget.style.color = "#A855F7")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#E5E7EB")}
              >
                Orders
              </Link>

              <Link
                to="/owner/menu-management"
                style={styles.navLinkItem}
                onMouseOver={(e) => (e.currentTarget.style.color = "#A855F7")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#E5E7EB")}
              >
                Menu Management
              </Link>

              <button
                onClick={logout}
                style={styles.logoutBtn}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.2)")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.08)")}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

// PREMIUM MATRIX SELECTION SPEC SHEET STYLES
const styles = {
  navBar: {
    backgroundColor: "rgba(9, 10, 15, 0.75)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    color: "#FFFFFF",
    padding: "16px 24px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.4)",
    fontFamily: "system-ui, -apple-system, sans-serif",
    boxSizing: "border-box",
  },
  navContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "between",
    width: "100%",
  },
  logoText: {
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "800",
    letterSpacing: "0.08em",
    background: "linear-gradient(135deg, #FFFFFF 40%, #A855F7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    cursor: "pointer",
  },
  navLinksGroup: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    marginLeft: "auto",
  },
  navLinkItem: {
    textDecoration: "none",
    color: "#E5E7EB",
    fontSize: "14px",
    fontWeight: "600",
    letterSpacing: "0.02em",
    transition: "color 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
  },
  loginBtn: {
    textDecoration: "none",
    color: "#FFFFFF",
    fontSize: "14px",
    fontWeight: "600",
    padding: "10px 18px",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    backgroundColor: "transparent",
    transition: "background-color 0.2s ease",
  },
  registerBtn: {
    textDecoration: "none",
    background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
    color: "#FFFFFF",
    fontSize: "14px",
    fontWeight: "600",
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    boxShadow: "0 4px 14px rgba(124, 58, 237, 0.3)",
    transition: "transform 0.2s ease",
  },
  logoutBtn: {
    backgroundColor: "rgba(239, 68, 68, 0.08)",
    border: "1px solid rgba(239, 68, 68, 0.25)",
    color: "#FCA5A5",
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "13.5px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    outline: "none",
  }
};

export default Navbar;