import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
//import "./NotoSansTamil";
import "../utils/fonts/NotoSansTamil-normal";
const generateQuotationPdf = async (quotation, order) => {
  // =====================================
  // PRE-RUN DEBUG LOGS
  // =====================================
  console.log("QUOTATION:", quotation);
  console.log("ORDER:", order);

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });
 console.log(
   doc.getFontList()
 );

  console.log(
    "AVAILABLE FONTS:",
    doc.getFontList()
  );

  // REGISTER TAMIL FONT
//  doc.addFont("NotoSansTamil.ttf", "NotoSansTamil", "normal");
  doc.setFont(
    "NotoSansTamil_Condensed-Regular",
    "normal"
  );

  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  let y = 20;

  const COLORS = {
    primary: [124, 58, 237],
    dark: [17, 24, 39],
    light: [249, 250, 251],
    border: [229, 231, 235],
    muted: [107, 114, 128]
  };

  // =====================================
  // TAMIL SAFE TEXT
  // =====================================
 const drawTamilSafeText = (
   text,
   x,
   yPosition
 ) => {

   doc.setFont(
     "NotoSansTamil_Condensed-Regular",
     "normal"
   );

   doc.text(
     String(text || "").normalize("NFC"),
     x,
     yPosition
   );
 };

  // =====================================
  // SAFE DATA RESOLUTION
  // =====================================
  const sessionRows =
    quotation?.sessionPrices ||
    order?.quotation?.sessionPrices ||
    quotation?.sessionWisePricing ||
    order?.mealSessions ||
    [];

  // =====================================
  // TOP LEVEL TARGET LOG
  // =====================================
  console.log(
    "SESSION ROWS",
    JSON.stringify(
      sessionRows,
      null,
      2
    )
  );

  console.log("RESOLVED SESSION ROWS FOR PDF TABLE:", sessionRows);

  // Calculate dynamic food pricing amount safely
  const foodAmount = (order?.mealSessions || []).reduce((sum, session) => {
    const matchingSession = sessionRows.find(
      (s) =>
        String(s.sessionId || s.id) ===
        String(session.sessionId || session.id)
    );

    const pricePerPlate = Number(
      matchingSession?.pricePerPlate ||
      matchingSession?.price ||
      0
    );

    const guestCount = Number(
      session.guestCount ||
      matchingSession?.guestCount ||
      0
    );

    return sum + (guestCount * pricePerPlate);
  }, 0);

  const transportationCharge = Number(quotation?.transportationCharge || 0);
  const laborCharge = Number(quotation?.laborCharge || 0);
  const vesselCharge = Number(quotation?.vesselCharge || 0);
  const decorationCharge = Number(quotation?.decorationCharge || 0);
  const gstAmount = Number(quotation?.gstAmount || 0);
  const discountAmount = Number(quotation?.discountAmount || 0);

  const finalTotal =
    foodAmount +
    transportationCharge +
    laborCharge +
    vesselCharge +
    decorationCharge +
    gstAmount -
    discountAmount;

  // =====================================
  // PAGE CHECK
  // =====================================
  const checkPage = (space = 20) => {
    if (y + space > pageHeight - 20) {
      doc.addPage();
      y = 20;
    }
  };

  // =====================================
  // HEADER
  // =====================================
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.primary);
  doc.setFontSize(22);
  doc.text("M.K.S CATERING AND SERVICES", 20, y);

  y += 8;
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.muted);
  doc.text("Premium Culinary Experiences & Event Management", 20, y);

  y += 16;
  doc.setFontSize(14);
  doc.setTextColor(...COLORS.dark);
  doc.text("OFFICIAL QUOTATION INVOICE", 20, y);
  doc.text(`Booking Ref ID : #${order?.bookingId || "N/A"}`, 135, y);

  y += 10;
  doc.setDrawColor(...COLORS.border);
  doc.line(20, y, pageWidth - 20, y);

  y += 12;

  // =====================================
  // CLIENT RECORD PROFILE
  // =====================================
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.primary);
  doc.text("CLIENT RECORD PROFILE", 20, y);

  y += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.dark);
  doc.text(`Name: ${order?.customerName || "N/A"}`, 20, y);

  y += 6;
  doc.text(`Email: ${order?.customerEmail || "N/A"}`, 20, y);

  y += 6;
  doc.text(`Phone: ${order?.customerPhone || "N/A"}`, 20, y);

  y += 14;

  // =====================================
  // EVENT LOGISTICS MATRIX
  // =====================================
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.primary);
  doc.text("EVENT LOGISTICS MATRIX", 20, y);

  y += 8;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...COLORS.dark);
  doc.text(`Event Category: ${order?.eventType || "N/A"}`, 20, y);

  y += 6;
  doc.text(`Venue: ${order?.eventLocation || "N/A"}`, 20, y);

  y += 8;
  doc.setFont("helvetica", "bold");
  doc.text("BOOKED SESSIONS", 20, y);

  y += 8;
  doc.setFont("helvetica", "normal");
  (order?.mealSessions || []).forEach((session) => {
    doc.text(
      `${session.mealType} | ${session.mealDate} | ${session.guestCount} Guests`,
      24,
      y
    );
    y += 6;
  });

  y += 8;

  // =====================================
  // SESSION TABLE
  // =====================================
  autoTable(doc, {
    startY: y,
    head: [["Session", "Date", "Guests"]],
    body: (order?.mealSessions || []).map((session) => [
      session.mealType,
      session.mealDate,
      session.guestCount
    ]),
    theme: "grid"
  });

  y = doc.lastAutoTable.finalY + 10;

  // =====================================
  // FINANCIAL BREAKDOWN
  // =====================================
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.primary);
  doc.text("FINANCIAL BREAKDOWN DESCRIPTION", 20, y);

  y += 10;

  // ========================================================
  // INJECTED DEEP LOOP LOGGERS FOR DYNAMIC ROW-BY-ROW CHECK
  // ========================================================
  const tableDataBody = (order?.mealSessions || []).map((session) => {
    const matchingPriceObj = sessionRows.find(
      (s) =>
        String(s.sessionId || s.id) ===
        String(session.sessionId || session.id)
    );

    console.log("SESSION:", session);
    console.log("MATCHING PRICE OBJ:", matchingPriceObj);

    const pPerPlate = Number(
      matchingPriceObj?.pricePerPlate ||
      matchingPriceObj?.price ||
      0
    );

    console.log("PRICE PER PLATE:", pPerPlate);

    const totalCount = Number(session.guestCount || 0);

    return [
      session.mealType,
      totalCount,
      `Rs. ${pPerPlate}`,
      `Rs. ${totalCount * pPerPlate}`
    ];
  });

  autoTable(doc, {
    startY: y,
    head: [["Session", "Guests", "Price / Plate", "Amount"]],
    body: tableDataBody,
    theme: "grid",
    styles: { fontSize: 9 },
    headStyles: { fillColor: [124, 58, 237] }
  });

  y = doc.lastAutoTable.finalY + 10;

  const rows = [
    { label: "Total Food Amount", value: foodAmount },
    { label: "Transportation Charge", value: transportationCharge },
    { label: "Labor Charge", value: laborCharge },
    { label: "Vessel Charge", value: vesselCharge },
    { label: "Decoration Charge", value: decorationCharge },
    { label: "GST Amount", value: gstAmount },
    { label: "Discount", value: discountAmount }
  ];

  rows.forEach((row) => {
    checkPage();
    doc.setFillColor(...COLORS.light);
    doc.rect(20, y - 5, pageWidth - 40, 8, "F");

    doc.setTextColor(...COLORS.dark);
    doc.setFont("helvetica", "normal");
    doc.text(row.label, 24, y);

    doc.setFont("helvetica", "bold");
    doc.text(`Rs. ${row.value}`, pageWidth - 24, y, { align: "right" });

    y += 10;
  });

  // =====================================
  // FINAL TOTAL CARD
  // =====================================
  y += 4;
  checkPage(20);
  doc.setDrawColor(...COLORS.primary);
  doc.rect(20, y - 5, pageWidth - 40, 12);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.primary);
  doc.setFontSize(12);
  doc.text("FINAL ESTIMATED INVOICE BALANCE:", 24, y + 2);
  doc.text(`Rs. ${finalTotal}`, pageWidth - 24, y + 2, { align: "right" });

  y += 20;

  // =====================================
  // CULINARY MENU ITEMS
  // =====================================
  checkPage(20);
  doc.setTextColor(...COLORS.primary);
  doc.text("SELECTED CULINARY EXPERIENCES MENU", 20, y);

  y += 10;
  (order?.mealSessions || []).forEach((session) => {
    checkPage(40);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...COLORS.primary);
    doc.text(`${session.mealType} - ${session.mealDate}`, 24, y);

    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...COLORS.dark);

    const foods = [
      ...new Map(
        (order?.selectedFoods || [])
          .filter(food =>
            session.foodIds?.includes(food.id)
          )
          .map(food => [food.id, food])
      ).values()
    ];

    if (foods.length === 0) {
      doc.text("No menu items", 32, y);
      y += 6;
    } else {
      foods.forEach((food) => {
       console.log(food.foodName);
        drawTamilSafeText(`• ${food.foodName}`, 32, y);
        y += 6;
      });
    }
    y += 4;
  });

  // =====================================
  // PAYMENT QR CODE
  // =====================================
  checkPage(80);
  y += 10;

  doc.setFont("helvetica", "bold");
  doc.setTextColor(...COLORS.primary);
  doc.text("SCAN & PAY", 20, y);

  y += 8;
  try {
    const img = new Image();
    img.src = "/paymentQR.png";
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });
    doc.addImage(img, "PNG", 20, y, 45, 45);
  } catch (err) {
    console.log("QR load failed or omitted", err);
  }

  doc.setFontSize(10);
  doc.setTextColor(...COLORS.dark);
  doc.setFont("helvetica", "normal");
  doc.text("Scan QR and complete payment", 75, y + 15);
  doc.text("UPI / Online Payment Accepted", 75, y + 23);

  y += 60;

  // =====================================
  // FOOTER
  // =====================================
  checkPage(20);
  doc.line(20, y, pageWidth - 20, y);
  y += 8;
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.muted);
  doc.text("For payment & support contact: +91 8531073839", 20, y);

  // =====================================
  // SAVE PDF
  // =====================================
  doc.save(`Quotation_${order?.bookingId || "Download"}.pdf`);
};

export default generateQuotationPdf;