import api from "../api/axios";

const bookingService = {

  createBooking: async (bookingData) => {
    return await api.post(
      "/bookings",
      bookingData
    );
  },

  getAllBookings: async () => {
    return await api.get(
      "/bookings"
    );
  },

  getBookingById: async (
    bookingId
  ) => {
    return await api.get(
      `/bookings/${bookingId}`
    );
  },

  getCustomerBookings:
    async () => {

      const customerId =
        localStorage.getItem(
          "customerId"
        );

      return await api.get(
        `/bookings/customer/${customerId}`
      );
    },

  confirmBooking:
    async (bookingId) => {

      return await api.put(
        `/bookings/${bookingId}/confirm`
      );
    }
};

export default bookingService;