function ReceiptDownload({

  receiptUrl,
  bookingId

}) {

  return (

    <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl mx-auto text-center">

      {/* SUCCESS ICON */}

      <div className="text-6xl mb-5">

        ✅

      </div>

      {/* TITLE */}

      <h2 className="text-4xl font-bold mb-4">

        Payment Successful

      </h2>

      <p className="text-gray-600 mb-8">

        Your catering booking has been confirmed successfully.
      </p>

      {/* BOOKING DETAILS */}

      <div className="bg-gray-100 rounded-xl p-5 mb-8 text-left">

        <p className="mb-3">

          <span className="font-semibold">

            Booking ID:

          </span>

          {" "}
          #{bookingId}

        </p>

        <p>

          <span className="font-semibold">

            Status:

          </span>

          {" "}
          PAID
        </p>
      </div>

      {/* DOWNLOAD BUTTON */}

      <a
        href={receiptUrl}
        download
        className="inline-block bg-black text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-800 transition"
      >
        Download Receipt PDF
      </a>
    </div>
  );
}

export default ReceiptDownload;