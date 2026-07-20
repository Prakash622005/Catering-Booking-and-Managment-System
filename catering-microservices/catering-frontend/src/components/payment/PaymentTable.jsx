function PaymentTable({

  payments,
  onView

}) {

  return (

    <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">

      <table className="w-full border-collapse">

        <thead className="bg-orange-600 text-white">

          <tr>

            <th className="p-4 text-left">
              Payment ID
            </th>

            <th className="p-4 text-left">
              Booking ID
            </th>

            <th className="p-4 text-left">
              Quotation ID
            </th>

            <th className="p-4 text-left">
              Amount
            </th>

            <th className="p-4 text-left">
              Method
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {payments.length > 0 ? (

            payments.map((payment) => (

              <tr
                key={payment.paymentId}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">

                  {payment.paymentId}

                </td>

                <td className="p-4">

                  {payment.bookingId}

                </td>

                <td className="p-4">

                  {payment.quotationId}

                </td>

                <td className="p-4 font-semibold text-orange-600">

                  ₹ {payment.amount}

                </td>

                <td className="p-4">

                  {payment.paymentMethod}

                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      payment.paymentStatus === "SUCCESS"
                        ? "bg-green-100 text-green-700"
                        : payment.paymentStatus === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >

                    {payment.paymentStatus}

                  </span>

                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={() => onView(payment)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >

                    View

                  </button>

                </td>

              </tr>
            ))

          ) : (

            <tr>

              <td
                colSpan="7"
                className="text-center p-6 text-gray-500"
              >

                No Payments Found

              </td>

            </tr>
          )}

        </tbody>

      </table>
    </div>
  );
}

export default PaymentTable;