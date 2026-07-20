function BookingCard({ booking }) {

  return (

    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300">

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-2xl font-bold text-gray-800">

          {booking.eventType}

        </h2>

        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold ${
            booking.bookingStatus === "CONFIRMED"
              ? "bg-green-100 text-green-700"
              : booking.bookingStatus === "PENDING"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >

          {booking.bookingStatus}

        </span>

      </div>

      <div className="space-y-2 text-gray-700">

        <p>

          <span className="font-semibold">
            Booking ID:
          </span>{" "}

          {booking.bookingId}

        </p>

        <p>

          <span className="font-semibold">
            Event Date:
          </span>{" "}

          {booking.eventDate}

        </p>

        <p>

          <span className="font-semibold">
            Location:
          </span>{" "}

          {booking.eventLocation}

        </p>

        <p>

          <span className="font-semibold">
            Guest Count:
          </span>{" "}

          {booking.guestCount}

        </p>

        <p>

          <span className="font-semibold">
            Special Instructions:
          </span>{" "}

          {booking.specialInstructions || "N/A"}

        </p>

      </div>

    </div>
  );
}

export default BookingCard;