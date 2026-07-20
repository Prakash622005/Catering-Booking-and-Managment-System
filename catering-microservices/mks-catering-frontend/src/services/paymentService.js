import api from "../api/axios";

const paymentService = {

  createPayment:
    async (paymentData) => {

      return await api.post(

        "/payments",

        paymentData
      );
    },

  getPaymentByBookingId:
    async (bookingId) => {

      return await api.get(

        `/payments/booking/${bookingId}`
      );
    }
};

export default paymentService;