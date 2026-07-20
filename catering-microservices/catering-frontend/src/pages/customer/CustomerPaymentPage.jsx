import { useEffect, useState } from "react";

import CustomerLayout from "../../layouts/CustomerLayout";

import PaymentCard from "../../components/payment/PaymentCard";

import { getAllPayments } from "../../services/paymentService";

function CustomerPaymentPage() {

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

  return (

    <CustomerLayout>

      <h1 className="text-4xl font-bold text-orange-600 mb-8">

        Payment History

      </h1>

      <div className="space-y-6">

        {payments.map((payment) => (

          <PaymentCard
            key={payment.paymentId}
            payment={payment}
          />
        ))}

      </div>

    </CustomerLayout>
  );
}

export default CustomerPaymentPage;