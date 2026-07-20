function PaymentCard({ payment }) {

  return (

    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-2xl font-bold text-gray-800">

          Payment #{payment.paymentId}

        </h2>

        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold ${
            payment.paymentStatus === "SUCCESS"
              ? "bg-green-100 text-green-700"
              : payment.paymentStatus === "PENDING"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >

          {payment.paymentStatus}

        </span>

      </div>

      <div className="space-y-3 text-gray-700">

        <p>

          <span className="font-semibold">
            Booking ID:
          </span>{" "}

          {payment.bookingId}

        </p>

        <p>

          <span className="font-semibold">
            Quotation ID:
          </span>{" "}

          {payment.quotationId}

        </p>

        <p>

          <span className="font-semibold">
            Customer ID:
          </span>{" "}

          {payment.customerId}

        </p>

        <p>

          <span className="font-semibold">
            Payment Method:
          </span>{" "}

          {payment.paymentMethod}

        </p>

        <p>

          <span className="font-semibold">
            Transaction ID:
          </span>{" "}

          {payment.transactionId}

        </p>

        <p className="text-2xl font-bold text-orange-600 mt-4">

          ₹ {payment.amount}

        </p>

      </div>

    </div>
  );
}

export default PaymentCard;