import { useEffect, useState } from "react";

const QuotationForm = ({ order, quotation, onSubmit }) => {
  const storageKey = `quotation_form_${order?.bookingId || "new"}`;
  const [loading, setLoading] = useState(false);

  const getInitialFormData = () => {
    try {
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        return {
          sessionPrices: parsed.sessionPrices || {},
          transportationCharge: parsed.transportationCharge || "",
          laborCharge: parsed.laborCharge || "",
          vesselCharge: parsed.vesselCharge || "",
          decorationCharge: parsed.decorationCharge || "",
          gstAmount: parsed.gstAmount || "",
          discountAmount: parsed.discountAmount || "",
          remarks: parsed.remarks || ""
        };
      }
    } catch (error) {
      console.error("Initial localStorage parse error", error);
    }
    return {
      sessionPrices: {},
      transportationCharge: "",
      laborCharge: "",
      vesselCharge: "",
      decorationCharge: "",
      gstAmount: "",
      discountAmount: "",
      remarks: ""
    };
  };

  const [formData, setFormData] = useState(getInitialFormData);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(formData));
  }, [formData, storageKey]);

  useEffect(() => {
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData({
          sessionPrices: parsed.sessionPrices || {},
          transportationCharge: parsed.transportationCharge || "",
          laborCharge: parsed.laborCharge || "",
          vesselCharge: parsed.vesselCharge || "",
          decorationCharge: parsed.decorationCharge || "",
          gstAmount: parsed.gstAmount || "",
          discountAmount: parsed.discountAmount || "",
          remarks: parsed.remarks || ""
        });
        return;
      } catch (error) {
        console.error("Restore Error", error);
      }
    }

    if (quotation) {
      const initialPrices = {};
      if (quotation.sessionPrices && Array.isArray(quotation.sessionPrices)) {
        quotation.sessionPrices.forEach((s) => {
          const id = String(s.sessionId || s.id);
          initialPrices[id] = s.pricePerPlate || "";
        });
      } else if (quotation.sessionPrices && typeof quotation.sessionPrices === "object") {
        Object.entries(quotation.sessionPrices).forEach(([key, val]) => {
          initialPrices[String(key)] = val || "";
        });
      }

      const fallbackData = {
        sessionPrices: initialPrices,
        transportationCharge: quotation.transportationCharge || "",
        laborCharge: quotation.laborCharge || "",
        vesselCharge: quotation.vesselCharge || "",
        decorationCharge: quotation.decorationCharge || "",
        gstAmount: quotation.gstAmount || "",
        discountAmount: quotation.discountAmount || "",
        remarks: quotation.remarks || ""
      };
      setFormData(fallbackData);
      localStorage.setItem(storageKey, JSON.stringify(fallbackData));
    }
  }, [storageKey, quotation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      localStorage.setItem(storageKey, JSON.stringify(updated));
      return updated;
    });
  };

  const foodAmount =
    order?.mealSessions?.reduce((total, session) => {
      const id = String(session.sessionId || session.id);
      const price = Number(formData.sessionPrices?.[id] || 0);
      return total + Number(session.guestCount || 0) * price;
    }, 0) || 0;

  const totalAmount =
    foodAmount +
    (Number(formData.transportationCharge) || 0) +
    (Number(formData.laborCharge) || 0) +
    (Number(formData.vesselCharge) || 0) +
    (Number(formData.decorationCharge) || 0) +
    (Number(formData.gstAmount) || 0) -
    (Number(formData.discountAmount) || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!order?.bookingId) {
      alert("Booking ID missing");
      return;
    }
    setLoading(true);

    try {
      const payload = {
        bookingId: Number(order.bookingId),
        customerId: Number(order.customerId || 0),
        sessionPrices: (order.mealSessions || []).map((session) => {
          const id = String(session.sessionId || session.id);
          const price = Number(formData.sessionPrices?.[id] || 0);
          return {
            sessionId: id,
            mealType: session.mealType,
            mealDate: session.mealDate,
            guestCount: session.guestCount,
            pricePerPlate: price,
            amount: Number(session.guestCount || 0) * price
          };
        }),
        transportationCharge: Number(formData.transportationCharge || 0),
        laborCharge: Number(formData.laborCharge || 0),
        vesselCharge: Number(formData.vesselCharge || 0),
        decorationCharge: Number(formData.decorationCharge || 0),
        gstAmount: Number(formData.gstAmount || 0),
        discountAmount: Number(formData.discountAmount || 0),
        remarks: formData.remarks?.trim() || "",
        foodAmount: Number(foodAmount),
        totalAmount: Number(totalAmount)
      };

      // ========================================================
      // 🚨 FIXING THE UNDERLYING DATA PASSING GAP FOR PDF HERE
      // ========================================================
      // பேக்கெண்ட் லேட்டஸ்ட் ஆப்ஜெக்ட்டை தராவிட்டாலும், நாம் அனுப்பும்
      // லோக்கல் பேலோடே (Payload) PDF ஜெனரேட் செய்ய போதுமானது.
      console.log("PRE-FLIGHT PAYLOAD BEING DISPATCHED:", payload);

      const response = await onSubmit(payload);

      console.log("--- SUBMIT COMPONENT API RESPONSE CHECK ---");
      console.log("API RESPONSE", JSON.stringify(response, null, 2));
      console.log("--- END SUBMIT COMPONENT API RESPONSE CHECK ---");

      alert("Quotation sent successfully");
    } catch (error) {
      console.error("Quotation Send Error =>", error);
      alert(error?.response?.data?.message || error?.message || "Failed to send quotation");
    } finally {
        setLoading(false);
      }
  };

  return (
    <div style={styles.formContainerWrapper}>
      <form onSubmit={handleSubmit} style={styles.masterFormLayout}>
        <h2 style={styles.sectionMainTitle}>Generate Quotation</h2>

        <div style={{ marginBottom: "20px", padding: "15px", borderRadius: "12px", background: "rgba(124, 58, 237, 0.08)", border: "1px solid rgba(124,58,237,0.15)" }}>
          <h4 style={{ margin: "0 0 10px 0", color: "#C084FC", fontSize: "15px", fontWeight: "600" }}>Customer Selected Sessions</h4>
          {order?.mealSessions?.map((session) => (
            <div key={String(session.sessionId || session.id)} style={{ marginTop: "8px", fontSize: "13.5px", color: "#E5E7EB" }}>
              <strong>{session.mealType}</strong>{" • "}{session.mealDate}{" • "}{session.guestCount} Guests
            </div>
          ))}
        </div>

        <h3 style={styles.formSectionSubtitle}>Session Wise Pricing</h3>
        <div style={styles.formFieldsGrid}>
          {order?.mealSessions?.map((session) => {
            const currentId = String(session.sessionId || session.id);
            return (
              <div key={currentId} style={styles.inputControlGroup}>
                <label style={styles.fieldLabel}>
                  {session.mealType}<br />
                  <span style={{ fontSize: "11px", color: "#71717a" }}>{session.mealDate}</span><br />
                  Pax: {session.guestCount}
                </label>
                <input
                  type="number"
                  placeholder="₹ Price Per Plate"
                  value={formData.sessionPrices?.[currentId] || ""}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setFormData((prev) => {
                      const updated = {
                        ...prev,
                        sessionPrices: { ...(prev.sessionPrices || {}), [currentId]: newValue }
                      };
                      localStorage.setItem(storageKey, JSON.stringify(updated));
                      return updated;
                    });
                  }}
                  style={styles.premiumFieldInput}
                />
              </div>
            );
          })}
        </div>

        <h3 style={styles.formSectionSubtitle}>Logistics & Additional Charges</h3>
        <div style={styles.formFieldsGrid}>
          {[
            { label: "Transportation Charge", name: "transportationCharge" },
            { label: "Labor Charge", name: "laborCharge" },
            { label: "Vessel Charge", name: "vesselCharge" },
            { label: "Decoration Charge", name: "decorationCharge" },
            { label: "GST Amount", name: "gstAmount" },
            { label: "Discount Amount", name: "discountAmount" }
          ].map((field) => (
            <div key={field.name} style={styles.inputControlGroup}>
              <label style={styles.fieldLabel}>{field.label}</label>
              <input
                type="number"
                name={field.name}
                placeholder="₹ 0.00"
                value={formData[field.name] ?? ""}
                onChange={handleChange}
                style={styles.premiumFieldInput}
              />
            </div>
          ))}
        </div>

        <div style={styles.singleColumnControlGroup}>
          <label style={styles.fieldLabel}>Internal Remarks & Special Instructions</label>
          <textarea
            name="remarks"
            placeholder="Enter any negotiation details or service specifications..."
            value={formData.remarks ?? ""}
            onChange={handleChange}
            style={styles.premiumFieldTextArea}
          />
        </div>

        <div style={styles.calculationSummaryCard}>
          <div style={styles.calcRow}>
            <span style={styles.calcLabel}>Gross Menu Food Balance:</span>
            <span style={styles.calcValue}>₹ {foodAmount.toLocaleString()}</span>
          </div>
          <div style={{ ...styles.calcRow, borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "12px", marginTop: "4px" }}>
            <span style={styles.grandTotalLabel}>Estimated Gross Total:</span>
            <span style={styles.grandTotalValue}>₹ {totalAmount.toLocaleString()}</span>
          </div>
        </div>

        <button type="submit" disabled={loading} style={loading ? { ...styles.submitActionBtn, ...styles.disabledBtn } : styles.submitActionBtn}>
          {loading ? <span style={styles.loaderFlexContainer}>Sending Pipeline Details...</span> : "Disburse Official Quotation"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  formContainerWrapper: { width: "100%", maxWidth: "850px", margin: "0 auto", boxSizing: "border-box" },
  masterFormLayout: { backgroundColor: "rgba(19, 22, 34, 0.4)", backdropFilter: "blur(16px)", border: "1px solid rgba(255, 255, 255, 0.06)", borderRadius: "24px", padding: "40px", boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4)", color: "#FFFFFF", fontFamily: "system-ui, -apple-system, sans-serif", boxSizing: "border-box" },
  sectionMainTitle: { fontSize: "28px", fontWeight: "800", letterSpacing: "-0.02em", margin: "0 0 30px 0", background: "linear-gradient(135deg, #FFFFFF 30%, #C084FC 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  formSectionSubtitle: { fontSize: "14px", fontWeight: "700", letterSpacing: "0.05em", textTransform: "uppercase", color: "#A78BFA", margin: "24px 0 16px 0", borderBottom: "1px solid rgba(167, 139, 250, 0.15)", paddingBottom: "6px" },
  formFieldsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "20px" },
  inputControlGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  singleColumnControlGroup: { display: "flex", flexDirection: "column", gap: "6px", marginTop: "16px" },
  fieldLabel: { fontSize: "12.5px", fontWeight: "600", color: "#9CA3AF", lineHeight: "1.4" },
  premiumFieldInput: { backgroundColor: "rgba(10, 11, 18, 0.5)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "12px", padding: "12px 16px", fontSize: "14.5px", color: "#FFFFFF", outline: "none", transition: "all 0.2s ease-in-out", boxSizing: "border-box" },
  premiumFieldTextArea: { backgroundColor: "rgba(10, 11, 18, 0.5)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "12px", padding: "14px 16px", fontSize: "14.5px", color: "#FFFFFF", outline: "none", minHeight: "100px", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" },
  calculationSummaryCard: { backgroundColor: "rgba(124, 58, 237, 0.05)", border: "1px solid rgba(124, 58, 237, 0.15)", borderRadius: "16px", padding: "20px", marginTop: "32px", marginBottom: "32px", display: "flex", flexDirection: "column", gap: "10px" },
  calcRow: { display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" },
  calcLabel: { color: "#9CA3AF", fontSize: "14px", fontWeight: "500", flexGrow: 1 },
  calcValue: { color: "#E5E7EB", fontSize: "14.5px", fontWeight: "600" },
  grandTotalLabel: { color: "#FFFFFF", fontSize: "16px", fontWeight: "700", flexGrow: 1 },
  grandTotalValue: { color: "#C084FC", fontSize: "20px", fontWeight: "800", textShadow: "0 0 15px rgba(192, 132, 252, 0.3)" },
  submitActionBtn: { width: "100%", background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)", color: "#FFFFFF", border: "none", borderRadius: "14px", padding: "16px", fontSize: "15.5px", fontWeight: "700", cursor: "pointer", transition: "all 0.2s ease", boxShadow: "0 4px 20px rgba(124, 58, 237, 0.25)" },
  disabledBtn: { background: "#374151", color: "#9CA3AF", cursor: "not-allowed", boxShadow: "none" },
  loaderFlexContainer: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }
};

export default QuotationForm;