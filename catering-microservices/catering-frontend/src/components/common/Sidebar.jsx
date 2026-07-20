import { Link } from "react-router-dom";

function Sidebar() {

  const role = localStorage.getItem("role");

  return (

    <div className="w-64 min-h-screen bg-gray-900 text-white p-5">

      <h2 className="text-2xl font-bold mb-8">
        Dashboard
      </h2>

      <div className="flex flex-col gap-4">

        {role === "ROLE_OWNER" && (
          <>
            <Link to="/owner/dashboard">
              Dashboard
            </Link>

            <Link to="/owner/menus">
              Manage Menu
            </Link>

            <Link to="/owner/bookings">
              Manage Bookings
            </Link>

            <Link to="/owner/quotations">
              Quotations
            </Link>

            <Link to="/owner/payments">
              Payments
            </Link>
          </>
        )}

        {role === "ROLE_CUSTOMER" && (
          <>
            <Link to="/customer/dashboard">
              Dashboard
            </Link>

            <Link to="/customer/menu">
              Browse Menu
            </Link>

            <Link to="/customer/bookings">
              My Bookings
            </Link>

            <Link to="/customer/quotations">
              Quotations
            </Link>

            <Link to="/customer/payments">
              Payments
            </Link>

            <Link to="/customer/notifications">
              Notifications
            </Link>
          </>
        )}

      </div>
    </div>
  );
}

export default Sidebar;