import { useEffect, useState }
from "react";

import quotationService
from "../../services/quotationService";

function QuotationManagementPage() {

  const [quotations, setQuotations] =
    useState([]);

  useEffect(() => {

    fetchQuotations();

  }, []);

  const fetchQuotations =
    async () => {

      try {

        const response =
          await quotationService
            .getAllQuotations();

        setQuotations(
          response.data
        );

      } catch (error) {

        console.error(error);
      }
    };

  return (

    <div style={styles.pageWrapper}>
      {/* BACKGROUND ATMOSPHERIC GLOWS */}
      <div style={styles.purpleGlow} />
      <div style={styles.goldGlow} />

      <div style={styles.contentContainer}>
        {/* TITLE */}

        <div style={styles.headerBlock}>

          <h1 style={styles.mainHeading}>

            Quotation Management

          </h1>

          <p style={styles.subtitleText}>

            View all catering quotations
          </p>
        </div>

        {/* TABLE */}

        <div style={styles.tableWrapperCard}>

          <table style={styles.tableStructure}>

            <thead>

              <tr style={styles.headerRow}>

                <th style={styles.tableHeaderCell}>
                  Quotation ID
                </th>

                <th style={styles.tableHeaderCell}>
                  Booking ID
                </th>

                <th style={styles.tableHeaderCell}>
                  Guest Count
                </th>

                <th style={styles.tableHeaderCell}>
                  Final Amount
                </th>

                <th style={styles.tableHeaderCell}>
                  Status
                </th>
              </tr>
            </thead>

            <tbody>

              {quotations.map((quotation) => (

                <tr
                  key={quotation.quotationId}
                  style={styles.tableBodyRow}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.02)")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >

                  <td style={styles.tableBodyCell}>
                    #{quotation.quotationId}
                  </td>

                  <td style={styles.tableBodyCell}>
                    #{quotation.bookingId}
                  </td>

                  <td style={styles.tableBodyCell}>
                    {quotation.guestCount}
                  </td>

                  <td style={styles.tableBodyCellPrice}>
                    ₹{quotation.totalAmount}
                  </td>

                  <td style={styles.tableBodyCell}>

                    <span style={styles.statusBadge}>

                      {quotation.status}

                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// LUXURY ROYAL BLACK & DEEP VIOLET DASHBOARD SPECIFICATIONS
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
    background: "radial-gradient(circle, rgba(124, 92, 246, 0.05) 0%, transparent 70%)",
    zIndex: 1,
    pointerEvents: "none",
  },
  goldGlow: {
    position: "absolute",
    bottom: "20%",
    left: "-8%",
    width: "45vw",
    height: "45vw",
    background: "radial-gradient(circle, rgba(212, 175, 55, 0.02) 0%, transparent 70%)",
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
  tableWrapperCard: {
    backgroundColor: "rgba(19, 22, 34, 0.3)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
    overflow: "hidden",
  },
  tableStructure: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  headerRow: {
    backgroundColor: "rgba(10, 11, 18, 0.8)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
  },
  tableHeaderCell: {
    padding: "18px 24px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#9CA3AF",
    letterSpacing: "0.03em",
    textTransform: "uppercase",
  },
  tableBodyRow: {
    borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
    transition: "background-color 0.2s ease",
  },
  tableBodyCell: {
    padding: "18px 24px",
    fontSize: "15px",
    color: "#E5E7EB",
    fontWeight: "500",
  },
  tableBodyCellPrice: {
    padding: "18px 24px",
    fontSize: "15px",
    color: "#A855F7",
    fontWeight: "700",
  },
  statusBadge: {
    display: "inline-block",
    backgroundColor: "rgba(124, 58, 237, 0.12)",
    border: "1px solid rgba(124, 58, 237, 0.3)",
    color: "#C084FC",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12.5px",
    fontWeight: "600",
    letterSpacing: "0.02em",
    textTransform: "capitalize",
  },
};

export default QuotationManagementPage;