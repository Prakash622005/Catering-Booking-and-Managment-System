import {
  useEffect,
  useState
} from "react";

import { useLocation }
from "react-router-dom";

import OrderDetails
from "../../components/owner/OrderDetails";
import QuotationForm
from "../../components/owner/QuotationForm";
import PaymentReceiptForm
from "../../components/owner/PaymentReceiptForm";

import quotationService
from "../../services/quotationService";

import paymentService
from "../../services/paymentService";

import authService
from "../../services/authService";

import menuService
from "../../services/menuService";

import generateQuotationPdf
from "../../utils/generateQuotationPdf";

import generatePaymentReceiptPdf
from "../../utils/generatePaymentReceiptPdf";

function OrderManagementPage() {

  const location =
    useLocation();

  const [order, setOrder] =
    useState(null);

  const [quotation, setQuotation] =
    useState(null);

  const [payment, setPayment] =
    useState(null);

  // =====================================
  // LOAD ORDER
  // =====================================
  useEffect(() => {

    const stateOrder =
      location.state?.order;

    const savedOrder =
      localStorage.getItem(
        "owner_selected_order"
      );

    if (stateOrder) {

      localStorage.setItem(
        "owner_selected_order",
        JSON.stringify(stateOrder)
      );

      loadCompleteOrder(
        stateOrder
      );

    } else if (savedOrder) {

      loadCompleteOrder(
        JSON.parse(savedOrder)
      );
    }

  }, []);

  // =====================================
  // LOAD COMPLETE ORDER
  // =====================================
  const loadCompleteOrder = async (baseOrder) => {

      console.log(
        "ORDER DATA",
        baseOrder
      );

  try {


  const customerResponse =
    await authService.getUserById(
      baseOrder.customerId
    );

  // =====================================
  // GET ALL FOOD IDS FROM MEAL SESSIONS
  // =====================================

  const foodIds = [
    ...new Set(
      baseOrder.mealSessions
        ?.flatMap(
          session =>
            session.foodIds || []
        ) || []
    )
  ];

  let foods = [];

  const allFoodIds = [
    ...new Set(
      baseOrder.mealSessions
        ?.flatMap(
          session =>
            session.foodIds || []
        ) || []
    )
  ];

  if (allFoodIds.length > 0) {

    foods =
      await Promise.all(

        foodIds.map(
          async (foodId) => {

            const response =
              await menuService
                .getFoodById(
                  foodId
                );

            return response.data;
          }
        )
      );
  }

  const updatedOrder = {

    ...baseOrder,

    customerName:
      customerResponse.data.fullName,

    customerEmail:
      customerResponse.data.email,

    customerPhone:
      customerResponse.data.phone,

    selectedFoods:
      foods
  };

  setOrder(
    updatedOrder
  );

  localStorage.setItem(
    "owner_selected_order",
    JSON.stringify(
      updatedOrder
    )
  );

  try {

    const quotationResponse =
      await quotationService
        .getQuotationByBookingId(
          baseOrder.bookingId
        );

    setQuotation(
      quotationResponse.data
    );

  } catch {

    console.log(
      "No quotation found"
    );
  }

  try {

    const paymentResponse =
      await paymentService
        .getPaymentByBookingId(
          baseOrder.bookingId
        );

    setPayment(
      paymentResponse.data
    );

  } catch {

    console.log(
      "No payment found"
    );
  }


  } catch (error) {


  console.error(
    "Order load error:",
    error
  );


  }
  };


  // =====================================
  // QUOTATION SUBMIT
  // =====================================
  const handleQuotationSubmit =
    async (
      quotationFormData
    ) => {

      try {

        if (
          !quotationFormData?.bookingId
        ) {

          alert(
            "Booking ID missing"
          );

          return;
        }

        const payload = {
          bookingId: Number(
            quotationFormData.bookingId
          ),

          customerId: Number(
            quotationFormData.customerId
          ),

          sessionPrices:
            quotationFormData.sessionPrices || [],

          transportationCharge:
            Number(
              quotationFormData.transportationCharge
            ) || 0,

          laborCharge:
            Number(
              quotationFormData.laborCharge
            ) || 0,

          vesselCharge:
            Number(
              quotationFormData.vesselCharge
            ) || 0,

          decorationCharge:
            Number(
              quotationFormData.decorationCharge
            ) || 0,

          gstAmount:
            Number(
              quotationFormData.gstAmount
            ) || 0,

          discountAmount:
            Number(
              quotationFormData.discountAmount
            ) || 0,

          remarks:
            quotationFormData.remarks || "",

          foodAmount:
            Number(
              quotationFormData.foodAmount
            ) || 0,

          totalAmount:
            Number(
              quotationFormData.totalAmount
            ) || 0
        };

    console.log(
      "FINAL PAYLOAD TO BACKEND",
      JSON.stringify(payload, null, 2)
    );
        // SAVE QUOTATION
        await quotationService
          .createQuotation(
            payload
          );

        // IMMEDIATE UI UPDATE
        setQuotation(
          payload
        );

        // AUTO PDF DOWNLOAD
        await generateQuotationPdf(
          payload,
          order
        );

        // REFRESH FROM DB
        try {

          const quotationResponse =
            await quotationService
              .getQuotationByBookingId(
                payload.bookingId
              );

          if (
            quotationResponse?.data
          ) {

            setQuotation(
              quotationResponse.data
            );
          }

        } catch {

          console.log(
            "Quotation refresh failed"
          );
        }

        alert(
          "Quotation sent successfully"
        );

      } catch (error) {

        console.error(
          "Quotation Error:",
          error
        );

        alert(
          error?.response?.data
            ?.message ||
          error.message ||
          "Failed to send quotation"
        );
      }
    };

  // =====================================
  // PAYMENT RECEIPT
  // =====================================
  const handleReceiptSubmit =
    async (
      paymentData
    ) => {

      try {

        const response =
          await paymentService
            .createPayment(
              paymentData
            );

        generatePaymentReceiptPdf(
          response.data,
          order
        );

        alert(
          "Receipt Saved Successfully"
        );

      } catch (error) {

        console.error(
          error
        );
      }
    };

  if (!order) {

    return (
      <h1>
        Loading...
      </h1>
    );
  }

  return (
    <div>

      <OrderDetails
        order={order}
      />

      <QuotationForm
        order={order}
        quotation={
          quotation
        }
        onSubmit={
          handleQuotationSubmit
        }
      />

      <PaymentReceiptForm
        order={order}
        quotation={
          quotation
        }
        payment={payment}
        onSubmit={
          handleReceiptSubmit
        }
      />

    </div>
  );
}

export default
OrderManagementPage;