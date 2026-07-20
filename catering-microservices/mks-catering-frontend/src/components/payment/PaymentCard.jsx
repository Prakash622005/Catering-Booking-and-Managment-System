function PaymentCard({

  quotation,
  onPayment

}) {

  return (

    <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-3xl mx-auto">

      {/* HEADER */}

      <div className="text-center mb-10">

        <h2 className="text-4xl font-bold">

          Payment Details

        </h2>

        <p className="text-gray-500 mt-3 text-lg">

          Review quotation and payment information
        </p>
      </div>

      {/* QUOTATION DETAILS */}

      <div className="space-y-5 text-lg">

        <div className="flex justify-between">

          <span className="font-semibold">

            Booking ID

          </span>

          <span>

            #{quotation.bookingId}

          </span>
        </div>

        <div className="flex justify-between">

          <span className="font-semibold">

            Guest Count

          </span>

          <span>

            {quotation.guestCount}

          </span>
        </div>

        <div className="flex justify-between">

          <span className="font-semibold">

            Price Per Plate

          </span>

          <span>

            ₹{quotation.perPlateCost}

          </span>
        </div>

        <div className="flex justify-between">

          <span className="font-semibold">

            Food Amount

          </span>

          <span>

            ₹{quotation.foodAmount}

          </span>
        </div>

        <div className="flex justify-between">

          <span className="font-semibold">

            Transport Charge

          </span>

          <span>

            ₹{quotation.transportCharge}

          </span>
        </div>

        <div className="flex justify-between">

          <span className="font-semibold">

            Labor Charge

          </span>

          <span>

            ₹{quotation.laborCharge}

          </span>
        </div>

        <div className="flex justify-between">

          <span className="font-semibold">

            Vessel Charge

          </span>

          <span>

            ₹{quotation.vesselCharge}

          </span>
        </div>

        <div className="flex justify-between">

          <span className="font-semibold">

            Decoration Charge

          </span>

          <span>

            ₹{quotation.decorationCharge}

          </span>
        </div>

        <div className="flex justify-between">

          <span className="font-semibold">

            Discount

          </span>

          <span>

            ₹{quotation.discount}

          </span>
        </div>

        <div className="flex justify-between">

          <span className="font-semibold">

            GST / Tax Amount

          </span>

          <span>

            ₹{quotation.taxAmount}

          </span>
        </div>

        <hr className="my-5" />

        <div className="flex justify-between text-3xl font-bold">

          <span>

            Total Amount

          </span>

          <span>

            ₹{quotation.totalAmount}

          </span>
        </div>
      </div>

      {/* OWNER NOTE */}

      <div className="bg-yellow-100 border border-yellow-300 rounded-2xl p-5 mt-10">

        <h3 className="text-xl font-bold mb-3">

          Payment Instructions

        </h3>

        <p className="text-gray-700 leading-7">

          Call the owner before sending payment
          for confirmation purposes.

        </p>

        <div className="mt-5 space-y-2">

          <p>

            <span className="font-semibold">

              UPI Number:

            </span>

            {" "}
            9876543210

          </p>

          <p>

            <span className="font-semibold">

              UPI ID:

            </span>

            {" "}
            mkscatering@upi

          </p>
        </div>
      </div>

      {/* QR CODE */}

      <div className="mt-10 text-center">

        <h3 className="text-2xl font-bold mb-5">

          Scan QR Code

        </h3>

        <img
          src="/qr-code.png"
          alt="QR Code"
          className="w-64 h-64 mx-auto object-contain border rounded-2xl p-4"
        />
      </div>

      {/* REMARKS */}

      {quotation.remarks && (

        <div className="mt-10 bg-gray-100 rounded-2xl p-5">

          <h3 className="text-xl font-bold mb-3">

            Owner Remarks

          </h3>

          <p className="text-gray-700">

            {quotation.remarks}

          </p>
        </div>
      )}

      {/* PAYMENT BUTTON */}

      <button
        onClick={() => onPayment(quotation)}
        className="w-full mt-10 bg-green-500 text-white py-4 rounded-2xl text-xl font-bold hover:bg-green-400 transition"
      >

        I Have Completed Payment

      </button>
    </div>
  );
}

export default PaymentCard;