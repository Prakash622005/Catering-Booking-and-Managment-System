import {

  BrowserRouter,
  Routes,
  Route

} from "react-router-dom";


// COMMON
import ProtectedRoute from "../components/common/ProtectedRoute";


// PUBLIC PAGES
import HomePage from "../pages/public/HomePage";
import AboutPage from "../pages/public/AboutPage";
import ServicesPage from "../pages/public/ServicesPage";
import ContactPage from "../pages/public/ContactPage";


// AUTH PAGES
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";


// CUSTOMER PAGES
import CustomerDashboard from "../pages/customer/CustomerDashboard";
import CustomerMenuPage from "../pages/customer/CustomerMenuPage";
import CustomerBookingPage from "../pages/customer/CustomerBookingPage";
import CustomerQuotationPage from "../pages/customer/CustomerQuotationPage";
import CustomerPaymentPage from "../pages/customer/CustomerPaymentPage";
import CustomerNotificationPage from "../pages/customer/CustomerNotificationPage";


// OWNER PAGES
import OwnerDashboard from "../pages/owner/OwnerDashboard";
import ManageMenuPage from "../pages/owner/ManageMenuPage";
import ManageBookingPage from "../pages/owner/ManageBookingPage";
import ManageQuotationPage from "../pages/owner/ManageQuotationPage";
import PaymentTrackingPage from "../pages/owner/PaymentTrackingPage";


function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* PUBLIC ROUTES */}

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/about"
          element={<AboutPage />}
        />

        <Route
          path="/services"
          element={<ServicesPage />}
        />

        <Route
          path="/contact"
          element={<ContactPage />}
        />



        {/* AUTH ROUTES */}

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />



        {/* CUSTOMER ROUTES */}

        <Route
          path="/customer/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["ROLE_CUSTOMER"]}
            >

              <CustomerDashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/customer/menu"
          element={
            <ProtectedRoute
              allowedRoles={["ROLE_CUSTOMER"]}
            >

              <CustomerMenuPage />

            </ProtectedRoute>
          }
        />

        <Route
          path="/customer/bookings"
          element={
            <ProtectedRoute
              allowedRoles={["ROLE_CUSTOMER"]}
            >

              <CustomerBookingPage />

            </ProtectedRoute>
          }
        />

        <Route
          path="/customer/quotations"
          element={
            <ProtectedRoute
              allowedRoles={["ROLE_CUSTOMER"]}
            >

              <CustomerQuotationPage />

            </ProtectedRoute>
          }
        />

        <Route
          path="/customer/payments"
          element={
            <ProtectedRoute
              allowedRoles={["ROLE_CUSTOMER"]}
            >

              <CustomerPaymentPage />

            </ProtectedRoute>
          }
        />

        <Route
          path="/customer/notifications"
          element={
            <ProtectedRoute
              allowedRoles={["ROLE_CUSTOMER"]}
            >

              <CustomerNotificationPage />

            </ProtectedRoute>
          }
        />



        {/* OWNER ROUTES */}

        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["ROLE_OWNER"]}
            >

              <OwnerDashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/menus"
          element={
            <ProtectedRoute
              allowedRoles={["ROLE_OWNER"]}
            >

              <ManageMenuPage />

            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/bookings"
          element={
            <ProtectedRoute
              allowedRoles={["ROLE_OWNER"]}
            >

              <ManageBookingPage />

            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/quotations"
          element={
            <ProtectedRoute
              allowedRoles={["ROLE_OWNER"]}
            >

              <ManageQuotationPage />

            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/payments"
          element={
            <ProtectedRoute
              allowedRoles={["ROLE_OWNER"]}
            >

              <PaymentTrackingPage />

            </ProtectedRoute>
          }
        />



        {/* FALLBACK ROUTE */}

        <Route
          path="*"
          element={
            <div className="flex justify-center items-center h-screen text-4xl font-bold text-red-600">

              404 - Page Not Found

            </div>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;