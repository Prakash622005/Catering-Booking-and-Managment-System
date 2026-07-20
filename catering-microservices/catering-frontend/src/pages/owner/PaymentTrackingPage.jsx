import { useEffect, useState } from "react";

import OwnerLayout from "../../layouts/OwnerLayout";

import PaymentTable from "../../components/payment/PaymentTable";

import { getAllPayments } from "../../services/paymentService";

function PaymentTrackingPage() {

  const [payments, setPayments] = useState([]);

  useEffect(() => {

    fetchPayments();

  }, []);

  const fetchPayments = async () => {

    try {

      const data = await getAllPayments();

      setPayments(data);

    } catch (error) {

      console.error(error);
    }
  };

  const handleView = (payment) => {

    console.log(payment);

    alert("Payment Details Viewed");
  };

  return (

    <OwnerLayout>

      <h1 className="text-4xl font-bold text-orange-600 mb-8">

        Payment Tracking

      </h1>

      <PaymentTable
        payments={payments}
        onView={handleView}
      />

    </OwnerLayout>
  );
}

export default PaymentTrackingPage;