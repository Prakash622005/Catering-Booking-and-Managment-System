import {

  BrowserRouter,
  Routes,
  Route,
  Navigate

} from "react-router-dom";

// LAYOUTS

import CustomerLayout
from "../layouts/CustomerLayout";

import OwnerLayout
from "../layouts/OwnerLayout";

import AuthLayout
from "../layouts/AuthLayout";

// COMMON COMPONENTS

import ProtectedRoute
from "../components/common/ProtectedRoute";

// PUBLIC PAGES

import HomePage
from "../pages/public/HomePage";

// AUTH PAGES

import LoginPage
from "../pages/auth/LoginPage";

import RegisterPage
from "../pages/auth/RegisterPage";

// CUSTOMER PAGES

import FoodMenuPage
from "../pages/customer/FoodMenuPage";

import BookingStatusPage
from "../pages/customer/BookingStatusPage";

import PaymentPage
from "../pages/customer/PaymentPage";

import ReceiptPage
from "../pages/customer/ReceiptPage";

// OWNER PAGES

import OwnerDashboard
from "../pages/owner/OwnerDashboard";

import OrderManagementPage
from "../pages/owner/OrderManagementPage";

import QuotationManagementPage
from "../pages/owner/QuotationManagementPage";

import MenuManagementPage
from "../pages/owner/MenuManagementPage";

function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* PUBLIC */}

        <Route
          path="/"
          element={<HomePage />}
        />

        {/* AUTH ROUTES */}

        <Route
          element={<AuthLayout />}
        >

          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/register"
            element={<RegisterPage />}
          />
        </Route>

        {/* CUSTOMER ROUTES */}

        <Route

          path="/customer"

          element={

            <ProtectedRoute
              allowedRole="CUSTOMER"
            >

              <CustomerLayout />

            </ProtectedRoute>
          }
        >

          <Route
            path="menu"
            element={<FoodMenuPage />}
          />

          <Route
            path="status"
            element={<BookingStatusPage />}
          />

          <Route
            path="payment"
            element={<PaymentPage />}
          />

          <Route
            path="receipt"
            element={<ReceiptPage />}
          />
        </Route>

        {/* OWNER ROUTES */}

        <Route

          path="/owner"

          element={

            <ProtectedRoute
              allowedRole="OWNER"
            >

              <OwnerLayout />

            </ProtectedRoute>
          }
        >

          <Route
            path="dashboard"
            element={<OwnerDashboard />}
          />

          <Route
            path="orders"
            element={<OrderManagementPage />}
          />

          <Route
            path="quotations"
            element={<QuotationManagementPage />}
          />

          <Route
            path="menu-management"
            element={<MenuManagementPage />}
          />
        </Route>

        {/* FALLBACK */}

        <Route
          path="*"
          element={
            <Navigate to="/" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;