function NotificationCard({ notification }) {

  return (

    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300 border-l-4 border-orange-500">

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-xl font-bold text-gray-800">

          {notification.subject}

        </h2>

        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold ${
            notification.notificationStatus === "SENT"
              ? "bg-green-100 text-green-700"
              : notification.notificationStatus === "FAILED"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >

          {notification.notificationStatus}

        </span>

      </div>

      <div className="space-y-3 text-gray-700">

        <p>

          <span className="font-semibold">
            Notification ID:
          </span>{" "}

          {notification.notificationId}

        </p>

        <p>

          <span className="font-semibold">
            Customer ID:
          </span>{" "}

          {notification.customerId}

        </p>

        {notification.bookingId && (

          <p>

            <span className="font-semibold">
              Booking ID:
            </span>{" "}

            {notification.bookingId}

          </p>
        )}

        {notification.quotationId && (

          <p>

            <span className="font-semibold">
              Quotation ID:
            </span>{" "}

            {notification.quotationId}

          </p>
        )}

        {notification.paymentId && (

          <p>

            <span className="font-semibold">
              Payment ID:
            </span>{" "}

            {notification.paymentId}

          </p>
        )}

        <p>

          <span className="font-semibold">
            Recipient:
          </span>{" "}

          {notification.recipient}

        </p>

        <p>

          <span className="font-semibold">
            Notification Type:
          </span>{" "}

          {notification.notificationType}

        </p>

      </div>

      <div className="mt-5 bg-gray-100 p-4 rounded-xl">

        <p className="text-gray-800 leading-relaxed">

          {notification.message}

        </p>

      </div>

    </div>
  );
}

export default NotificationCard;