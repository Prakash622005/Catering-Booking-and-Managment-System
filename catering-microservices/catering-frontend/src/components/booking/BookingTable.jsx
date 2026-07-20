function BookingTable({

  bookings,
  onView

}) {

  return (

    <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">

      <table className="w-full border-collapse">

        <thead className="bg-orange-600 text-white">

          <tr>

            <th className="p-4 text-left">
              Booking ID
            </th>

            <th className="p-4 text-left">
              Event Type
            </th>

            <th className="p-4 text-left">
              Event Date
            </th>

            <th className="p-4 text-left">
              Location
            </th>

            <th className="p-4 text-left">
              Guests
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

          {bookings.length > 0 ? (

            bookings.map((booking) => (

              <tr
                key={booking.bookingId}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">

                  {booking.bookingId}

                </td>

                <td className="p-4 font-semibold">

                  {booking.eventType}

                </td>

                <td className="p-4">

                  {booking.eventDate}

                </td>

                <td className="p-4">

                  {booking.eventLocation}

                </td>

                <td className="p-4">

                  {booking.guestCount}

                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      booking.bookingStatus === "CONFIRMED"
                        ? "bg-green-100 text-green-700"
                        : booking.bookingStatus === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >

                    {booking.bookingStatus}

                  </span>

                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={() => onView(booking)}
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

                No Bookings Found

              </td>

            </tr>
          )}

        </tbody>

      </table>
    </div>
  );
}

export default BookingTable;