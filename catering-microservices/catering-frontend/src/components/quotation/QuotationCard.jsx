function QuotationCard({

  quotation,
  onApprove,
  onReject

}) {

  return (

    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-2xl font-bold text-gray-800">

          Quotation #{quotation.quotationId}

        </h2>

        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold ${
            quotation.quotationStatus === "APPROVED"
              ? "bg-green-100 text-green-700"
              : quotation.quotationStatus === "REJECTED"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >

          {quotation.quotationStatus}

        </span>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">

        <p>

          <span className="font-semibold">
            Booking ID:
          </span>{" "}

          {quotation.bookingId}

        </p>

        <p>

          <span className="font-semibold">
            Guest Count:
          </span>{" "}

          {quotation.guestCount}

        </p>

        <p>

          <span className="font-semibold">
            Per Plate Cost:
          </span>{" "}

          ₹ {quotation.perPlateCost}

        </p>

        <p>

          <span className="font-semibold">
            Food Amount:
          </span>{" "}

          ₹ {quotation.foodAmount}

        </p>

        <p>

          <span className="font-semibold">
            Transport Charge:
          </span>{" "}

          ₹ {quotation.transportCharge}

        </p>

        <p>

          <span className="font-semibold">
            Labor Charge:
          </span>{" "}

          ₹ {quotation.laborCharge}

        </p>

        <p>

          <span className="font-semibold">
            Vessel Charge:
          </span>{" "}

          ₹ {quotation.vesselCharge}

        </p>

        <p>

          <span className="font-semibold">
            Decoration Charge:
          </span>{" "}

          ₹ {quotation.decorationCharge}

        </p>

        <p>

          <span className="font-semibold">
            Discount:
          </span>{" "}

          ₹ {quotation.discount}

        </p>

        <p>

          <span className="font-semibold">
            Tax Amount:
          </span>{" "}

          ₹ {quotation.taxAmount}

        </p>

      </div>

      <div className="mt-6">

        <h3 className="text-xl font-bold text-orange-600">

          Total Amount:
          ₹ {quotation.totalAmount}

        </h3>

      </div>

      <div className="mt-4">

        <p className="text-gray-700">

          <span className="font-semibold">
            Remarks:
          </span>{" "}

          {quotation.remarks || "N/A"}

        </p>

      </div>

      {quotation.quotationStatus === "SENT" && (

        <div className="flex gap-4 mt-6">

          <button
            onClick={() =>
              onApprove(
                quotation.quotationId
              )
            }
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
          >

            Approve

          </button>

          <button
            onClick={() =>
              onReject(
                quotation.quotationId
              )
            }
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
          >

            Reject

          </button>

        </div>
      )}

    </div>
  );
}

export default QuotationCard;