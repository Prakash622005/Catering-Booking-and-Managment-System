import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(formData);
    setLoading(false);

    // SUCCESS
    if (result.success) {
      if (result.role === "OWNER") {
        navigate("/owner/dashboard");
      } else {
        navigate("/customer/menu");
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      {/* AMBIENT BACKGROUND GLOWS */}
      <div style={styles.purpleGlow} />
      <div style={styles.goldGlow} />

      {/* GLASSMORPHIC CONTAINER CARD */}
      <div style={styles.formCard}>

        {/* TITLE */}
        <div style={styles.headerSection}>
          <h1 style={styles.titleMain}>
            M.K.S Catering
          </h1>
          <p style={styles.subtitleText}>
            Login to continue
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div style={styles.errorAlert}>
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} style={styles.formGroup}>

          {/* EMAIL */}
          <div>
            <label style={styles.inputLabel}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter Email"
              style={styles.inputField}
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label style={styles.inputLabel}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter Password"
              style={styles.inputField}
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.submitButton,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        {/* REGISTER */}
        <div style={styles.footerSection}>
          <p style={styles.footerText}>
            New Customer?{" "}
            <Link to="/register" style={styles.footerLink}>
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// THEME DESIGN OBJECT: MODERN ROYAL & DARK CULINARY ELEGANCE
const styles = {
  pageWrapper: {
    position: "relative",
    minHeight: "100vh",
    backgroundColor: "#090A0F",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
    overflow: "hidden",
    fontFamily: "system-ui, -apple-system, sans-serif",
  },
  purpleGlow: {
    position: "absolute",
    top: "-10%",
    right: "-10%",
    width: "40vw",
    height: "40vw",
    background: "radial-gradient(circle, rgba(124, 92, 246, 0.12) 0%, transparent 70%)",
    zIndex: 1,
  },
  goldGlow: {
    position: "absolute",
    bottom: "-10%",
    left: "-10%",
    width: "40vw",
    height: "40vw",
    background: "radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%)",
    zIndex: 1,
  },
  formCard: {
    position: "relative",
    zIndex: 10,
    width: "100%",
    maxWidth: "460px",
    backgroundColor: "rgba(19, 22, 34, 0.55)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(139, 92, 246, 0.15)",
    borderRadius: "20px",
    padding: "40px 32px",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.05)",
  },
  headerSection: {
    textAlign: "center",
    marginBottom: "32px",
  },
  titleMain: {
    color: "#FFFFFF",
    fontSize: "32px",
    fontWeight: "900",
    letterSpacing: "-0.02em",
    margin: "0 0 8px 0",
    textTransform: "uppercase",
  },
  subtitleText: {
    color: "#9CA3AF",
    fontSize: "15px",
    fontWeight: "300",
    margin: 0,
  },
  errorAlert: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.25)",
    color: "#FCA5A5",
    padding: "12px 16px",
    borderRadius: "12px",
    fontSize: "14px",
    marginBottom: "24px",
    textAlign: "center",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputLabel: {
    display: "block",
    color: "#E5E7EB",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "8px",
    letterSpacing: "0.02em",
  },
  inputField: {
    width: "100%",
    backgroundColor: "rgba(9, 10, 15, 0.6)",
    border: "1px solid rgba(156, 163, 175, 0.2)",
    borderRadius: "12px",
    padding: "14px 16px",
    color: "#FFFFFF",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
    transition: "all 0.3s ease",
  },
  submitButton: {
    width: "100%",
    background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
    color: "#FFFFFF",
    padding: "15px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    border: "none",
    letterSpacing: "0.03em",
    boxShadow: "0 4px 15px rgba(124, 58, 237, 0.3)",
    marginTop: "10px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  footerSection: {
    textAlign: "center",
    marginTop: "28px",
  },
  footerText: {
    color: "#9CA3AF",
    fontSize: "14px",
    margin: 0,
  },
  footerLink: {
    color: "#D4AF37",
    textDecoration: "none",
    fontWeight: "700",
    marginLeft: "4px",
    transition: "color 0.2s ease",
  }
};

export default LoginPage;