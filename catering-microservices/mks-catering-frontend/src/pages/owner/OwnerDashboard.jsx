import { useEffect, useState } from "react";

import OrderCard
from "../../components/owner/OrderCard";

import bookingService
from "../../services/bookingService";

import authService
from "../../services/authService";

import menuService
from "../../services/menuService";

import { useNavigate }
from "react-router-dom";

function OwnerDashboard() {

  const navigate = useNavigate();

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // LOAD ORDERS

  useEffect(() => {

    fetchOrders();

  }, []);

  // FETCH ORDERS

  const fetchOrders = async () => {

    try {

      // GET BOOKINGS

      const response =
        await bookingService
          .getAllBookings();

      const bookings =
        response.data;

      // ENRICH BOOKINGS

      const enrichedOrders =
        await Promise.all(

          bookings.map(
            async (booking) => {

              try {

                // FETCH CUSTOMER

                const customerResponse =
                  await authService
                    .getUserById(
                      booking.customerId
                    );

                // FETCH FOOD DETAILS

                const foodDetails =
                  await Promise.all(

                    booking.menuItemIds.map(
                      async (foodId) => {

                       try {

                         const response =
                           await menuService.getFoodById(foodId);

                         return response.data;

                       } catch (error) {

                         console.error(
                           `Food ${foodId} not found`
                         );

                         return {
                           id: foodId,
                           foodName: `Deleted Food (${foodId})`
                         };
                       }

                        return foodResponse.data;
                      }
                    )
                  );

                // RETURN ENRICHED ORDER

                return {

                  ...booking,

                  customer:
                    customerResponse.data,

                  foods:
                    foodDetails
                };

              } catch (error) {

                console.error(
                  "Error Enriching Order:",
                  error
                );

                return booking;
              }
            }
          )
        );

      setOrders(
        enrichedOrders
      );

    } catch (error) {

      console.error(
        "Fetch Orders Error:",
        error
      );

    } finally {

      setLoading(false);
    }
  };

  // VIEW ORDER

  const handleViewOrder = (
    order
  ) => {

    navigate(

      "/owner/orders",

      {

        state: { order }
      }
    );
  };

  // LOADING

  if (loading) {

    return (

      <div style={styles.loadingContainer}>

        <div style={styles.spinner} />

        <h1 style={styles.loadingText}>

          Loading Orders...

        </h1>

      </div>
    );
  }

  return (

    <div style={styles.pageWrapper}>
      {/* ATMOSPHERIC BACKGROUND RADIALS */}
      <div style={styles.purpleGlow} />
      <div style={styles.goldGlow} />

      <div style={styles.contentContainer}>

        {/* PAGE HEADER */}

        <div style={styles.headerBlock}>

          <h1 style={styles.mainHeading}>

            Catering Orders

          </h1>

          <p style={styles.subtitleText}>

            Manage customer catering requests
          </p>
        </div>

        {/* EMPTY STATE */}

        {orders.length === 0 ? (

          <div style={styles.emptyStateCard}>

            <h2 style={styles.emptyStateTitle}>

              No Orders Available

            </h2>
          </div>

        ) : (

          /* ORDER GRID */

          <div style={styles.orderGridStructure}>

            {orders.map((order) => (

              <OrderCard
                key={order.bookingId}
                order={order}
                onView={handleViewOrder}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// COHESIVE MODERN ROYAL & DARK VIOLET SYSTEM SPEC
const styles = {
  pageWrapper: {
    position: "relative",
    minHeight: "100vh",
    backgroundColor: "#090A0F",
    color: "#FFFFFF",
    padding: "48px 24px 80px 24px",
    overflowX: "hidden",
    fontFamily: "system-ui, -apple-system, sans-serif",
    boxSizing: "border-box",
  },
  purpleGlow: {
    position: "absolute",
    top: "-5%",
    right: "-10%",
    width: "50vw",
    height: "50vw",
    background: "radial-gradient(circle, rgba(124, 92, 246, 0.06) 0%, transparent 70%)",
    zIndex: 1,
    pointerEvents: "none",
  },
  goldGlow: {
    position: "absolute",
    bottom: "15%",
    left: "-8%",
    width: "45vw",
    height: "45vw",
    background: "radial-gradient(circle, rgba(212, 175, 55, 0.03) 0%, transparent 70%)",
    zIndex: 1,
    pointerEvents: "none",
  },
  contentContainer: {
    position: "relative",
    zIndex: 10,
    maxWidth: "1200px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  headerBlock: {
    marginBottom: "40px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    paddingBottom: "24px",
  },
  mainHeading: {
    fontSize: "36px",
    fontWeight: "800",
    letterSpacing: "-0.02em",
    margin: 0,
    background: "linear-gradient(135deg, #FFFFFF, #A855F7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitleText: {
    color: "#9CA3AF",
    fontSize: "16px",
    margin: "12px 0 0 0",
    fontWeight: "400",
  },
  loadingContainer: {
    backgroundColor: "#090A0F",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  },
  spinner: {
    width: "44px",
    height: "44px",
    border: "3px solid rgba(168, 85, 247, 0.1)",
    borderTop: "3px solid #A855F7",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    color: "#9CA3AF",
    fontSize: "18px",
    fontWeight: "600",
    letterSpacing: "0.02em",
    margin: 0,
  },
  emptyStateCard: {
    backgroundColor: "rgba(19, 22, 34, 0.4)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px dashed rgba(255, 255, 255, 0.08)",
    borderRadius: "20px",
    padding: "60px 24px",
    textAlign: "center",
  },
  emptyStateTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#6B7280",
    margin: 0,
  },
  orderGridStructure: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "32px",
  },
};

export default OwnerDashboard;