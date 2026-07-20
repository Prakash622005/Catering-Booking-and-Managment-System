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
    <nav className="bg-orange-600 text-white px-6 py-4 flex justify-between items-center shadow-md">

      <h1 className="text-2xl font-bold">
        Catering Management System
      </h1>

      <div className="flex items-center gap-6">

        <Link to="/">Home</Link>

        {role === "ROLE_CUSTOMER" && (
          <>
            <Link to="/customer/dashboard">
              Dashboard
            </Link>

            <Link to="/customer/bookings">
              Bookings
            </Link>
          </>
        )}

        {role === "ROLE_OWNER" && (
          <>
            <Link to="/owner/dashboard">
              Dashboard
            </Link>

            <Link to="/owner/menus">
              Menus
            </Link>
          </>
        )}

        {!role ? (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={logout}
            className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold"
          >
            Logout
          </button>
        )}

      </div>
    </nav>
  );
}

export default Navbar;