import jsPDF from "jspdf";

// =========================================================================
// PREMIUM STYLING MATRIX ARCHITECTURE DEFINITION (ROYAL VIOLET THEME)
// =========================================================================
const PDF_THEME = {
  colors: {
    primaryViolet: [124, 58, 237],  // Royal Violet Accent Brand Core
    textDark: [17, 24, 39],         // Deep Obsidian High-Contrast Text
    textMuted: [107, 114, 128],     // Slate Grey Secondary Labels
    bgLight: [249, 250, 251],       // Clean Off-White Pattern Stripes
    lineBorder: [229, 231, 235],    // Soft Dividing Borders
    emeraldSuccess: [16, 185, 129], // Fresh Emerald Green for Paid Badges
    bgVioletTint: [245, 243, 255],  // Subtle Royal Violet Background Fill
    bgGreenTint: [240, 253, 244]    // Subtle Green Background Fill
  },
  typography: {
    fontFamily: "helvetica",
    sizes: {
      brandHeader: 22,
      docTitle: 13,
      sectionHeading: 11,
      bodyText: 10,
      finePrint: 9.5,
      metaText: 9
    },
    weights: {
      regular: "normal",
      medium: "medium",
      bold: "bold"
    }
  },
  layout: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 25,
    rowHeight: 6.5,
    dividerLineWidth: 0.3,
    borderLineWidth: 0.4
  }
};

// =========================================================================
// RUNTIME PDF RECONSTRUCTION ENGINE FUNCTION
// =========================================================================
const generatePaymentReceiptPdf = async (payment, order) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const { colors, typography, layout } = PDF_THEME;

  let y = layout.marginTop;

  // --- REUSABLE STRUCTURE COMPONENT HELPERS ---
  const drawPageLayoutDecorations = () => {
    doc.setFillColor(colors.primaryViolet[0], colors.primaryViolet[1], colors.primaryViolet[2]);
    doc.rect(0, 0, 4, pageHeight, "F");
  };

  const drawSectionDivider = () => {
    y += 4;
    doc.setDrawColor(colors.lineBorder[0], colors.lineBorder[1], colors.lineBorder[2]);
    doc.setLineWidth(layout.dividerLineWidth);
    doc.line(layout.paddingLeft, y, pageWidth - layout.paddingRight, y);
    y += 10;
  };

  // Render Base Layout Structure Stripes
  drawPageLayoutDecorations();

  // --- ASYNCHRONOUS SECURE ASSET STREAM LOADER ---
  const loadLogoImageSafely = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";

      const timeout = setTimeout(() => {
        img.src = "";
        resolve(null);
      }, 2000); // 2-second hard timeout lock

      img.onload = () => {
        clearTimeout(timeout);
        resolve(img);
      };
      img.onerror = () => {
        clearTimeout(timeout);
        resolve(null);
      };
      img.src = url;
    });
  };

  const muruganLogo = await loadLogoImageSafely("LordMuruga.jpg");

  // --- BRANDING HEADER REGION ---
  if (muruganLogo) {
    try {
      doc.saveGraphicsState();
      doc.arc(31, y + 6, 11, 0, Math.PI * 2);
      doc.clip();
      doc.addImage(muruganLogo, "JPEG", 20, y - 5, 22, 22);
      doc.restoreGraphicsState();

      doc.setDrawColor(colors.primaryViolet[0], colors.primaryViolet[1], colors.primaryViolet[2]);
      doc.setLineWidth(0.5);
      doc.circle(31, y + 6, 11.2, "D");
    } catch (e) {
      console.warn("Circular cropping bypassed due to environmental restrictions.");
    }
  }

  doc.setTextColor(colors.primaryViolet[0], colors.primaryViolet[1], colors.primaryViolet[2]);
  doc.setFont(typography.fontFamily, typography.weights.bold);
  doc.setFontSize(typography.sizes.brandHeader);
  doc.text("M.K.S CATERING AND SERVICES", muruganLogo ? 46 : layout.paddingLeft, y + 5);

  doc.setTextColor(colors.textMuted[0], colors.textMuted[1], colors.textMuted[2]);
  doc.setFont(typography.fontFamily, typography.weights.regular);
  doc.setFontSize(typography.sizes.bodyText);
  doc.text("Premium Culinary Experiences & Event Management", muruganLogo ? 46 : layout.paddingLeft, y + 11);

  y += 24;

  // --- META DESCRIPTOR SUB-HEADER LINE ---
  doc.setTextColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);
  doc.setFont(typography.fontFamily, typography.weights.bold);
  doc.setFontSize(typography.sizes.docTitle);
  doc.text("OFFICIAL PAYMENT RECEIPT", layout.paddingLeft, y);

  doc.setFont(typography.fontFamily, typography.weights.regular);
  doc.setFontSize(typography.sizes.bodyText);
  doc.setTextColor(colors.textMuted[0], colors.textMuted[1], colors.textMuted[2]);
  doc.text(`Booking Ref ID: #${payment.bookingId || "N/A"}`, pageWidth - layout.paddingRight, y, { align: "right" });

  drawSectionDivider();

  // --- DUAL COLUMN METRIC ARCHITECTURE ---
  const colWidth = (pageWidth - (layout.paddingLeft + layout.paddingRight)) / 2;
  let leftY = y;
  let rightY = y;

  // Column A: Client Profile Pinned Context
  doc.setFont(typography.fontFamily, typography.weights.bold);
  doc.setFontSize(typography.sizes.sectionHeading);
  doc.setTextColor(colors.primaryViolet[0], colors.primaryViolet[1], colors.primaryViolet[2]);
  doc.text("CLIENT ACCOUNT INFORMATION", layout.paddingLeft, leftY);
  leftY += 7;

  doc.setFont(typography.fontFamily, typography.weights.regular);
  doc.setFontSize(typography.sizes.bodyText);
  doc.setTextColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);
  doc.text(`Name: ${order.customerName || "Valued Customer"}`, layout.paddingLeft, leftY);
  leftY += 6;
  doc.text(`Email: ${order.customerEmail || "-"}`, layout.paddingLeft, leftY);
  leftY += 6;
  doc.text(`Phone: ${order.customerPhone || "-"}`, layout.paddingLeft, leftY);

  // Column B: Event Logistics Matrix Pinned Context
  doc.setFont(typography.fontFamily, typography.weights.bold);
  doc.setFontSize(typography.sizes.sectionHeading);
  doc.setTextColor(colors.primaryViolet[0], colors.primaryViolet[1], colors.primaryViolet[2]);
  doc.text("EVENT LOGISTICS SUMMARY", layout.paddingLeft + colWidth, rightY);
  rightY += 7;

  doc.setFont(typography.fontFamily, typography.weights.regular);
  doc.setFontSize(typography.sizes.bodyText);
  doc.setTextColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);
  doc.text(`Event Category: ${order.eventType || "-"}`, layout.paddingLeft + colWidth, rightY);
  rightY += 6;
  doc.text(`Target Date: ${order.eventDate || "-"}`, layout.paddingLeft + colWidth, rightY);
  rightY += 6;
//  doc.text(`Guest Headcount: ${order.guestCount || 0} Pax`, layout.paddingLeft + colWidth, rightY);
//  rightY += 6;

  const wrappedVenueText = doc.splitTextToSize(`Venue: ${order.eventLocation || "-"}`, colWidth);
  doc.text(wrappedVenueText, layout.paddingLeft + colWidth, rightY);
  rightY += (wrappedVenueText.length * 5);

  y = Math.max(leftY, rightY) + 6;
  drawSectionDivider();

  // --- LEDGER TRANSACTION STATEMENT ROW PANELS ---
  doc.setFont(typography.fontFamily, typography.weights.bold);
  doc.setFontSize(typography.sizes.sectionHeading);
  doc.setTextColor(colors.primaryViolet[0], colors.primaryViolet[1], colors.primaryViolet[2]);
  doc.text("LEDGER TRANSACTION STATEMENT", layout.paddingLeft, y);
  y += 8;

  const ledgerRecords = [
    { label: "Method / Ledger Class Channel", val: payment.paymentType || "Direct Transfer" },
    { label: "Internal Verification Booking Reference Key", val: `#${payment.bookingId}` },
    { label: "Account Clerk Entry Remarks / Notes", val: payment.remarks || "No supplementary operational notes." }
  ];

  ledgerRecords.forEach((record, idx) => {
    if (idx % 2 === 0) {
      doc.setFillColor(colors.bgLight[0], colors.bgLight[1], colors.bgLight[2]);
      doc.rect(layout.paddingLeft, y - 4, pageWidth - (layout.paddingLeft + layout.paddingRight), layout.rowHeight, "F");
    }
    doc.setFont(typography.fontFamily, typography.weights.regular);
    doc.setFontSize(typography.sizes.finePrint);
    doc.setTextColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);
    doc.text(record.label, layout.paddingLeft + 4, y);

    doc.setFont(typography.fontFamily, typography.weights.medium);
    doc.text(record.val, pageWidth - (layout.paddingRight + 4), y, { align: "right" });
    y += layout.rowHeight;
  });

  y += 6;

  // --- FINANCIAL BALANCE STATEMENT BANNER BLOCKS ---
  // Frame Block A: Cash Influx Received (Emerald Success Layout Panel)
  doc.setFillColor(colors.bgGreenTint[0], colors.bgGreenTint[1], colors.bgGreenTint[2]);
  doc.rect(layout.paddingLeft, y, pageWidth - (layout.paddingLeft + layout.paddingRight), 12, "F");
  doc.setDrawColor(colors.emeraldSuccess[0], colors.emeraldSuccess[1], colors.emeraldSuccess[2]);
  doc.setLineWidth(layout.dividerLineWidth);
  doc.rect(layout.paddingLeft, y, pageWidth - (layout.paddingLeft + layout.paddingRight), 12, "D");

  doc.setFont(typography.fontFamily, typography.weights.bold);
  doc.setFontSize(typography.sizes.sectionHeading);
  doc.setTextColor(colors.emeraldSuccess[0], colors.emeraldSuccess[1], colors.emeraldSuccess[2]);
  doc.text("AMOUNT RECEIVED (PAID STATUS):", layout.paddingLeft + 4, y + 7.5);
  doc.setFontSize(typography.sizes.brandHeader - 10); // Clear scale variance
  doc.text(`Rs. ${payment.amount || 0}`, pageWidth - (layout.paddingRight + 4), y + 7.5, { align: "right" });

  y += 18;

  // Frame Block B: Remaining Outstanding Liquidity (Standard Slate Structural Panel)
  doc.setFillColor(colors.bgLight[0], colors.bgLight[1], colors.bgLight[2]);
  doc.rect(layout.paddingLeft, y, pageWidth - (layout.paddingLeft + layout.paddingRight), 12, "F");
  doc.setDrawColor(colors.lineBorder[0], colors.lineBorder[1], colors.lineBorder[2]);
  doc.setLineWidth(layout.dividerLineWidth);
  doc.rect(layout.paddingLeft, y, pageWidth - (layout.paddingLeft + layout.paddingRight), 12, "D");

  doc.setFont(typography.fontFamily, typography.weights.bold);
  doc.setFontSize(typography.sizes.sectionHeading);
  doc.setTextColor(colors.textDark[0], colors.textDark[1], colors.textDark[2]);
  doc.text("REMAINING BALANCE:", layout.paddingLeft + 4, y + 7.5);
  doc.setFontSize(typography.sizes.brandHeader - 10);
  doc.text(`Rs. ${payment.remainingAmount || 0}`, pageWidth - (layout.paddingRight + 4), y + 7.5, { align: "right" });

  y += 24;
  drawSectionDivider();

  // --- AUDITED SIGN-OFF BOTTOM FOOTER BANNER ---
  doc.setFillColor(colors.bgVioletTint[0], colors.bgVioletTint[1], colors.bgVioletTint[2]);
  doc.rect(layout.paddingLeft, y, pageWidth - (layout.paddingLeft + layout.paddingRight), 12, "F");

  doc.setFont(typography.fontFamily, typography.weights.bold);
  doc.setFontSize(typography.sizes.metaText);
  doc.setTextColor(colors.primaryViolet[0], colors.primaryViolet[1], colors.primaryViolet[2]);

  const footerMessage = "Payment verified securely by authorization staff at M.K.S CATERING & SERVICES +91 8531073839";
  doc.text(footerMessage, pageWidth / 2, y + 7.5, { align: "center" });

  // Compile Document Data Streams into System Target Download Trigger
  doc.save(`Receipt_${payment.bookingId || "System_Export"}.pdf`);
};

export default generatePaymentReceiptPdf;