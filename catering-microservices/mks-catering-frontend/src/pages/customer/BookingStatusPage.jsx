import { useEffect, useState } from "react";

import bookingService from "../../services/bookingService";
import menuService from "../../services/menuService";
import quotationService from "../../services/quotationService";
import paymentService from "../../services/paymentService";
import authService from "../../services/authService"; // Added for fetching customer account profile info

import generateQuotationPdf from "../../utils/generateQuotationPdf";
import generatePaymentReceiptPdf from "../../utils/generatePaymentReceiptPdf";

function BookingStatusPage() {
  const [bookings, setBookings] = useState([]);
  const [foodMap, setFoodMap] = useState({});
  const [receiptBookings, setReceiptBookings] = useState({}); // Tracks which bookings have a receipt available

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const response = await bookingService.getCustomerBookings();
      const bookingsData = response.data;
      setBookings(bookingsData);

      const foodsResponse = await menuService.getAllFoods();
      const foods = foodsResponse.data;

      const map = {};
      foods.forEach(food => {
        map[food.id] = food.foodName;
      });
      setFoodMap(map);

      // Check receipt existence for each loaded booking
      const receiptMap = {};
      for (const booking of bookingsData) {
        try {
          await paymentService.getPaymentByBookingId(booking.bookingId);
          receiptMap[booking.bookingId] = true;
        } catch {
          receiptMap[booking.bookingId] = false;
        }
      }
      setReceiptBookings(receiptMap);

    } catch (error) {
      console.error(error);
    }
  };

  // HELPER: Fetches customer details and complete food lists to construct the perfect order payload
  const buildOrderForPdf = async (booking) => {
    try {
      const customerResponse = await authService.getUserById(booking.customerId);

      const allFoodIds = booking.mealSessions?.flatMap(session => session.foodIds || []) || [];
      const uniqueFoodIds = [...new Set(allFoodIds)]; // De-duplicate IDs to eliminate redundant API requests

      const foods = await Promise.all(
        uniqueFoodIds.map(async (foodId) => {
          const response = await menuService.getFoodById(foodId);
          return response.data;
        })
      );

      return {
        ...booking,
        customerName: customerResponse.data.fullName,
        customerEmail: customerResponse.data.email,
        customerPhone: customerResponse.data.phone,
        selectedFoods: foods
      };
    } catch (error) {
      console.error("Error structuring unified PDF model:", error);
      // Fallback strategies ensuring data flows even if meta-calls fail
      return {
        ...booking,
        customerName: "N/A",
        customerEmail: "N/A",
        customerPhone: "N/A",
        selectedFoods: []
      };
    }
  };

  const handleDownloadQuotation = async (booking) => {
    try {
      const quotationResponse = await quotationService.getQuotationByBookingId(
        booking.bookingId
      );

      // Enriches raw data into full-scale structure mirror used on owner dashboard
      const orderForPdf = await buildOrderForPdf(booking);
      await generateQuotationPdf(quotationResponse.data, orderForPdf);
    } catch (error) {
      console.error(error);
      alert("Quotation not available");
    }
  };

  const handleDownloadReceipt = async (booking) => {
    try {
      const paymentResponse = await paymentService.getPaymentByBookingId(
        booking.bookingId
      );

      // Enriches raw data into full-scale structure mirror used on owner dashboard
      const orderForPdf = await buildOrderForPdf(booking);
      await generatePaymentReceiptPdf(paymentResponse.data, orderForPdf);
    } catch (error) {
      console.error(error);
      alert("Receipt not available");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "NEW":
        return "#3B82F6";
      case "REVIEWING":
        return "#F59E0B";
      case "QUOTATION_SENT":
        return "#F97316";
      case "CONFIRMED":
        return "#10B981";
      case "PAID":
        return "#8B5CF6";
      case "REJECTED":
        return "#EF4444";
      default:
        return "#9CA3AF";
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>My Bookings</h1>

      {bookings.map(booking => (
        <div key={booking.bookingId} style={styles.bookingCard}>
          {/* HEADER */}
          <div style={styles.header}>
            <div>
              <h2 style={styles.orderTitle}>Order #{booking.bookingId}</h2>
              <p style={styles.eventType}>{booking.eventType}</p>
            </div>
            <div
              style={{
                ...styles.status,
                background: getStatusColor(booking.bookingStatus)
              }}
            >
              {booking.bookingStatus}
            </div>
          </div>

          {/* EVENT DETAILS */}
          <div style={styles.infoSection}>
            <div>
              <span style={styles.label}>Location</span>
              <p>{booking.eventLocation}</p>
            </div>
            <div>
              <span style={styles.label}>Total Sessions</span>
              <p>{booking.mealSessions?.length || 0}</p>
            </div>
            <div>
              <span style={styles.label}>Total Guests</span>
              <p>
                {booking.mealSessions?.reduce(
                  (total, session) => total + session.guestCount,
                  0
                )}
              </p>
            </div>
          </div>

          {/* MEAL SESSIONS */}
          <h3 style={styles.sectionTitle}>Meal Sessions</h3>
          {booking.mealSessions?.map((session, index) => (
            <div key={index} style={styles.sessionCard}>
              <div style={styles.sessionHeader}>
                <div>
                  <h4 style={styles.sessionTitle}>{session.mealType}</h4>
                  <p style={styles.date}>{session.mealDate}</p>
                </div>
                <div style={styles.guestBadge}>{session.guestCount} Guests</div>
              </div>

              <div style={styles.foodContainer}>
                {session.foodIds?.map(foodId => (
                  <span key={foodId} style={styles.foodChip}>
                    {foodMap[foodId] || `Food #${foodId}`}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* ACTION BUTTON CONTAINER */}
          <div style={styles.buttonContainer}>
            {booking.bookingStatus === "QUOTATION_SENT" && (
              <button
                onClick={() => handleDownloadQuotation(booking)}
                style={styles.quotationBtn}
              >
                Download Quotation
              </button>
            )}

            {/* Render dynamically based on receipt presence map instead of status code */}
            {receiptBookings[booking.bookingId] && (
              <button
                onClick={() => handleDownloadReceipt(booking)}
                style={styles.receiptBtn}
              >
                Download Receipt
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#090A0F",
    color: "#FFFFFF",
    padding: "40px"
  },
  heading: {
    fontSize: "34px",
    marginBottom: "30px"
  },
  bookingCard: {
    background: "#111827",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    padding: "24px",
    marginBottom: "30px"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },
  orderTitle: {
    margin: 0
  },
  eventType: {
    color: "#D4AF37"
  },
  status: {
    padding: "8px 16px",
    borderRadius: "999px",
    fontWeight: "700"
  },
  infoSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
    gap: "20px",
    marginBottom: "30px"
  },
  label: {
    color: "#9CA3AF",
    fontSize: "13px"
  },
  sectionTitle: {
    color: "#D4AF37",
    marginBottom: "15px"
  },
  sessionCard: {
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "18px",
    marginBottom: "16px",
    background: "rgba(255,255,255,0.02)"
  },
  sessionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  sessionTitle: {
    margin: 0,
    color: "#FBBF24"
  },
  date: {
    color: "#9CA3AF",
    fontSize: "13px"
  },
  guestBadge: {
    background: "#312E81",
    padding: "8px 14px",
    borderRadius: "999px",
    fontWeight: "700"
  },
  foodContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "15px"
  },
  foodChip: {
    background: "#2E1065",
    padding: "6px 14px",
    borderRadius: "999px",
    fontSize: "14px"
  },
  buttonContainer: {
    display: "flex",
    gap: "12px",
    marginTop: "20px",
    flexWrap: "wrap"
  },
  quotationBtn: {
    background: "#F97316",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600"
  },
  receiptBtn: {
    background: "#10B981",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600"
  }
};

export default BookingStatusPage;