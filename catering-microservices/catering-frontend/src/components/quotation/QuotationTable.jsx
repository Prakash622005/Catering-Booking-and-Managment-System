function QuotationTable({

  quotations,
  onView,
  onApprove,
  onReject

}) {

  return (

    <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">

      <table className="w-full border-collapse">

        <thead className="bg-orange-600 text-white">

          <tr>

            <th className="p-4 text-left">
              ID
            </th>

            <th className="p-4 text-left">
              Booking ID
            </th>

            <th className="p-4 text-left">
              Guests
            </th>

            <th className="p-4 text-left">
              Total Amount
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

          {quotations.length > 0 ? (

            quotations.map((quotation) => (

              <tr
                key={quotation.quotationId}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">

                  {quotation.quotationId}

                </td>

                <td className="p-4">

                  {quotation.bookingId}

                </td>

                <td className="p-4">

                  {quotation.guestCount}

                </td>

                <td className="p-4 font-semibold text-orange-600">

                  ₹ {quotation.totalAmount}

                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      quotation.quotationStatus === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : quotation.quotationStatus === "REJECTED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >

                    {quotation.quotationStatus}

                  </span>

                </td>

                <td className="p-4 flex justify-center gap-3">

                  <button
                    onClick={() =>
                      onView(quotation)
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >

                    View

                  </button>

                  {quotation.quotationStatus === "SENT" && (
                    <>
                      <button
                        onClick={() =>
                          onApprove(
                            quotation.quotationId
                          )
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                      >

                        Approve

                      </button>

                      <button
                        onClick={() =>
                          onReject(
                            quotation.quotationId
                          )
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >

                        Reject

                      </button>
                    </>
                  )}

                </td>

              </tr>
            ))

          ) : (

            <tr>

              <td
                colSpan="6"
                className="text-center p-6 text-gray-500"
              >

                No Quotations Found

              </td>

            </tr>
          )}

        </tbody>

      </table>
    </div>
  );
}

export default QuotationTable;