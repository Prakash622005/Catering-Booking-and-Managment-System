import {
  useEffect,
  useState
} from "react";

function PaymentReceiptForm({
  order,
  quotation,
  payment,
  onSubmit
}) {

  const [formData, setFormData] =
    useState({
      paymentType:
        "ADVANCE_PAYMENT",

      amount: "",

      remarks: ""
    });

  // =====================================
  // LOAD PAYMENT
  // =====================================
  useEffect(() => {

    if (payment) {

      setFormData({
        paymentType:
          payment.paymentType ||
          "ADVANCE_PAYMENT",

        amount:
          payment.amount || "",

        remarks:
          payment.remarks || ""
      });
    }

  }, [payment]);

  // =====================================
  // HANDLE INPUT
  // =====================================
  const handleChange =
    (e) => {

      const {
        name,
        value
      } = e.target;

      setFormData(
        (prev) => ({
          ...prev,
          [name]: value
        })
      );
    };

  // =====================================
  // SAME CALCULATION AS QUOTATION FORM
  // =====================================

  const breakfastAmount =
    Number(
      order?.breakfastGuestCount || 0
    ) *
    Number(
      quotation?.breakfastPricePerPlate || 0
    );

  const lunchAmount =
    Number(
      order?.lunchGuestCount || 0
    ) *
    Number(
      quotation?.lunchPricePerPlate || 0
    );

  const eveningAmount =
    Number(
      order?.eveningGuestCount || 0
    ) *
    Number(
      quotation?.eveningPricePerPlate || 0
    );

  const dinnerAmount =
    Number(
      order?.dinnerGuestCount || 0
    ) *
    Number(
      quotation?.dinnerPricePerPlate || 0
    );

  const foodAmount =
    breakfastAmount +
    lunchAmount +
    eveningAmount +
    dinnerAmount;

  const calculatedTotalAmount =
    foodAmount +
    Number(
      quotation?.transportationCharge || 0
    ) +
    Number(
      quotation?.laborCharge || 0
    ) +
    Number(
      quotation?.vesselCharge || 0
    ) +
    Number(
      quotation?.decorationCharge || 0
    ) +
    Number(
      quotation?.gstAmount || 0
    ) -
    Number(
      quotation?.discountAmount || 0
    );

  // =====================================
  // USE QUOTATION TOTAL
  // FALLBACK TO CALCULATED TOTAL
  // =====================================

  const quotationTotal =
    Number(
      quotation?.totalAmount ||
      calculatedTotalAmount ||
      0
    );

  const paidAmount =
    Number(
      formData.amount || 0
    );

  const remainingAmount =

    formData.paymentType ===
    "FULL_PAYMENT"

      ? 0

      : Math.max(
          quotationTotal -
            paidAmount,
          0
        );

  // =====================================
  // SUBMIT
  // =====================================
  const handleSubmit =
    (e) => {

      e.preventDefault();

      if (
        !quotation?.quotationId
      ) {

        alert(
          "Quotation not found"
        );

        return;
      }

      const paymentData = {

        bookingId:
          Number(
            order.bookingId
          ),

        quotationId:
          Number(
            quotation.quotationId
          ),

        customerId:
          Number(
            order.customerId
          ),

        paymentType:
          formData.paymentType,

        amount:
          paidAmount,

        totalAmount:
          quotationTotal,

        remainingAmount:
          remainingAmount,

        paymentMethod:
          "UPI",

        remarks:
          formData.remarks || ""
      };

      console.log(
        "Payment Payload =>",
        paymentData
      );

      onSubmit(paymentData);
    };

  return (
    <div style={styles.formContainerWrapper}>
      <form onSubmit={handleSubmit} style={styles.formElementLayout}>

        <h2 style={styles.mainSectionHeaderTitle}>
          Generate Payment Receipt
        </h2>

        {/* REGISTRATION CLASS SEGMENT SELECTOR */}
        <div style={styles.inputControlGroup}>
          <label style={styles.fieldLabel}>Payment Milestones Tier</label>
          <select
            name="paymentType"
            value={formData.paymentType}
            onChange={handleChange}
            style={styles.dropdownSelectionSelect}
          >
            <option value="ADVANCE_PAYMENT" style={styles.selectOptions}>
              Advance Payment Token
            </option>
            <option value="FULL_PAYMENT" style={styles.selectOptions}>
              Full Balance Settlement
            </option>
          </select>
        </div>

        {/* LEDGER DISPLAY TILES SPLIT GRID */}
        <div style={styles.financialSplitGrid}>
          {/* TOTAL FROM QUOTATION CARD */}
          <div style={styles.infoBox}>
            <span style={styles.boxMetaLabel}>Quotation Locked Value</span>
            <span style={styles.greenValue}>
              ₹ {quotationTotal.toLocaleString()}
            </span>
          </div>

          {/* DYNAMIC OUTSTANDING REMAINING BALANCE VALUE BOX */}
          <div style={styles.remainingAmountHighlightBox}>
            <span style={styles.boxMetaLabel}>Outstanding Debt Volume</span>
            <span style={styles.currencyPriceGlowValue}>
              ₹ {remainingAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* REAL TIME TRANSACTION AMOUNT FIELD */}
        <div style={styles.inputControlGroup}>
          <label style={styles.fieldLabel}>Disbursed Cash Influx Amount (₹)</label>
          <input
            type="number"
            name="amount"
            placeholder="Enter paid amount (e.g. 25000)"
            value={formData.amount}
            onChange={handleChange}
            style={styles.numericDataInput}
            required
          />
        </div>

        {/* AUDITING REMARKS ACCOUNT NOTEFIELD */}
        <div style={styles.inputControlGroup}>
          <label style={styles.fieldLabel}>Transaction Registry Internal Remarks</label>
          <textarea
            name="remarks"
            placeholder="Add transaction references, payment mode handles, or bank acknowledgment clear notes..."
            value={formData.remarks}
            onChange={handleChange}
            style={styles.remarksTextareaArea}
          />
        </div>

        {/* COMMIT ENGINE ACTION CONTROLLER */}
        <button type="submit" style={styles.submitActionBtn}>
          Save & Register Payment Record
        </button>

      </form>
    </div>
  );
}

// =========================================================================
// PREMIUM OBSIDIAN GLASSMORPHIC STYLING COMPONENT MATRIX
// =========================================================================
const styles = {
  formContainerWrapper: {
    width: "100%",
    maxWidth: "750px",
    margin: "0 auto",
    boxSizing: "border-box",
  },
  formElementLayout: {
    backgroundColor: "rgba(19, 22, 34, 0.45)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: "24px",
    padding: "40px",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.35)",
    color: "#FFFFFF",
    fontFamily: "system-ui, -apple-system, sans-serif",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    boxSizing: "border-box",
  },
  mainSectionHeaderTitle: {
    fontSize: "26px",
    fontWeight: "800",
    letterSpacing: "-0.02em",
    margin: "0 0 10px 0",
    background: "linear-gradient(135deg, #FFFFFF 40%, #C084FC 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  inputControlGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  fieldLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#9CA3AF",
    letterSpacing: "0.01em",
  },
  dropdownSelectionSelect: {
    backgroundColor: "rgba(10, 11, 18, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "14px",
    padding: "14px 16px",
    fontSize: "15px",
    color: "#FFFFFF",
    outline: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
    appearance: "none",
    WebkitAppearance: "none",
  },
  selectOptions: {
    backgroundColor: "#111322",
    color: "#FFFFFF",
  },
  financialSplitGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
    marginTop: "8px",
  },
  infoBox: {
    padding: "20px",
    borderRadius: "16px",
    background: "rgba(16, 185, 129, 0.04)",
    border: "1px solid rgba(16, 185, 129, 0.15)",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  remainingAmountHighlightBox: {
    padding: "20px",
    borderRadius: "16px",
    background: "rgba(239, 68, 68, 0.04)",
    border: "1px solid rgba(239, 68, 68, 0.15)",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  boxMetaLabel: {
    fontSize: "12px",
    fontWeight: "500",
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  greenValue: {
    color: "#10B981",
    fontSize: "22px",
    fontWeight: "800",
    textShadow: "0 0 20px rgba(16, 185, 129, 0.2)",
  },
  currencyPriceGlowValue: {
    color: "#F87171",
    fontSize: "22px",
    fontWeight: "800",
    textShadow: "0 0 20px rgba(239, 68, 68, 0.2)",
  },
  numericDataInput: {
    backgroundColor: "rgba(10, 11, 18, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "14px",
    padding: "14px 16px",
    fontSize: "15px",
    color: "#FFFFFF",
    outline: "none",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
  },
  remarksTextareaArea: {
    backgroundColor: "rgba(10, 11, 18, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "14px",
    padding: "14px 16px",
    fontSize: "14.5px",
    color: "#FFFFFF",
    outline: "none",
    height: "110px",
    resize: "vertical",
    fontFamily: "inherit",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
  },
  submitActionBtn: {
    width: "100%",
    background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "14px",
    padding: "16px",
    fontSize: "15.5px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 20px rgba(124, 58, 237, 0.25)",
    marginTop: "8px",
  }
};

export default PaymentReceiptForm;