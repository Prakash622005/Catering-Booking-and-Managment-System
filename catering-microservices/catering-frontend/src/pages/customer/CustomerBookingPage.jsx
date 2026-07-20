import CustomerLayout from "../../layouts/CustomerLayout";

import BookingForm from "../../components/booking/BookingForm";

import { createBooking } from "../../services/bookingService";

function CustomerBookingPage() {

  const handleBooking = async (bookingData) => {

    try {

      await createBooking(bookingData);

      alert("Booking Created Successfully");

    } catch (error) {

      console.error(error);

      alert("Booking Failed");
    }
  };

  return (

    <CustomerLayout>

      <BookingForm
        onSubmit={handleBooking}
      />

    </CustomerLayout>
  );
}

export default CustomerBookingPage;