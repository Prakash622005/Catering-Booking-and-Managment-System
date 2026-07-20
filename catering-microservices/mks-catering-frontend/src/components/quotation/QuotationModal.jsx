function QuotationModal({

  quotation,
  onClose

}) {

  if (!quotation) return null;

  return (

    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl shadow-2xl w-[95%] max-w-3xl overflow-hidden">

        {/* HEADER */}

        <div className="bg-black text-white p-6">

          <h2 className="text-3xl font-bold">

            Catering Quotation

          </h2>

          <p className="mt-2 text-gray-300">

            Quotation #{quotation.quotationId}

          </p>
        </div>

        {/* BODY */}

        <div className="p-8 space-y-6">

          {/* CUSTOMER INFO */}

          <div>

            <h3 className="text-xl font-bold mb-4">

              Event Details

            </h3>

            <div className="space-y-2 text-gray-700">

              <p>

                <span className="font-semibold">
                  Booking ID:
                </span>

                {" "}
                #{quotation.bookingId}

              </p>

              <p>

                <span className="font-semibold">
                  Guest Count:
                </span>

                {" "}
                {quotation.guestCount}

              </p>

              <p>

                <span className="font-semibold">
                  Price Per Plate:
                </span>

                {" "}
                ₹{quotation.pricePerPlate}

              </p>
            </div>
          </div>

          {/* COST BREAKDOWN */}

          <div>

            <h3 className="text-xl font-bold mb-4">

              Cost Breakdown

            </h3>

            <div className="space-y-3 text-gray-700">

              <div className="flex justify-between">

                <span>
                  Food Subtotal
                </span>

                <span>
                  ₹{quotation.foodSubtotal}
                </span>
              </div>

              <div className="flex justify-between">

                <span>
                  Transportation Charges
                </span>

                <span>
                  ₹{quotation.transportCharge}
                </span>
              </div>

              <div className="flex justify-between">

                <span>
                  Decoration Charges
                </span>

                <span>
                  ₹{quotation.decorationCharge}
                </span>
              </div>

              <div className="flex justify-between">

                <span>
                  GST
                </span>

                <span>
                  ₹{quotation.gstAmount}
                </span>
              </div>

              <hr />

              <div className="flex justify-between text-2xl font-bold">

                <span>
                  Final Amount
                </span>

                <span>
                  ₹{quotation.totalAmount}
                </span>
              </div>
            </div>
          </div>

          {/* OWNER REMARKS */}

          {quotation.ownerRemarks && (

            <div>

              <h3 className="text-xl font-bold mb-3">

                Owner Remarks

              </h3>

              <p className="bg-gray-100 p-4 rounded-xl text-gray-700">

                {quotation.ownerRemarks}

              </p>
            </div>
          )}

          {/* FOOTER */}

          <div className="flex justify-end">

            <button
              onClick={onClose}
              className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-400 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuotationModal;