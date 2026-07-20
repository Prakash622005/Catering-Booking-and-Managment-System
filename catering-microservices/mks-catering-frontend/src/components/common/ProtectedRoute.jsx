import { Navigate } from "react-router-dom";

function ProtectedRoute({

  children,
  allowedRole

}) {

  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");

  // NOT LOGGED IN
  if (!token) {

    return <Navigate to="/login" />;
  }

  // WRONG ROLE
  if (allowedRole && role !== allowedRole) {

    return <Navigate to="/" />;
  }

  return (
    <div style={styles.protectedLayoutWrapper}>
      {children}
    </div>
  );
}

// SECURE INTERFACE ENGINE ROUTING CANVAS SPECIFICATION
const styles = {
  protectedLayoutWrapper: {
    minHeight: "100vh",
    backgroundColor: "#090A0F",
    color: "#FFFFFF",
    fontFamily: "system-ui, -apple-system, sans-serif",
    boxSizing: "border-box",
  }
};

export default ProtectedRoute;