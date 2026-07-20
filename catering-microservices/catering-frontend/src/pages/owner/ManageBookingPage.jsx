import { useEffect, useState } from "react";

import OwnerLayout from "../../layouts/OwnerLayout";

import BookingTable from "../../components/booking/BookingTable";

import { getAllBookings } from "../../services/bookingService";

function ManageBookingPage() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    fetchBookings();

  }, []);

  const fetchBookings = async () => {

    try {

      const data = await getAllBookings();

      setBookings(data);

    } catch (error) {

      console.error(error);
    }
  };

  const handleView = (booking) => {

    console.log(booking);

    alert("Booking Details Viewed");
  };

  return (

    <OwnerLayout>

      <h1 className="text-4xl font-bold text-orange-600 mb-8">

        Manage Bookings

      </h1>

      <BookingTable
        bookings={bookings}
        onView={handleView}
      />

    </OwnerLayout>
  );
}

export default ManageBookingPage;