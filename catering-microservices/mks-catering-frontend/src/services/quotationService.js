import api from "../api/axios";

const quotationService = {

  createQuotation: async (
    quotationData
  ) => {

    return await api.post(

      "/quotations",

      quotationData
    );
  },

  getAllQuotations: async () => {

    return await api.get(
      "/quotations"
    );
  },

  getQuotationByBookingId:
    async (bookingId) => {

      return await api.get(

        `/quotations/booking/${bookingId}`
      );
    },

  approveQuotation: async (
    quotationId
  ) => {

    return await api.put(

      `/quotations/${quotationId}/approve`
    );
  },

  rejectQuotation: async (
    quotationId
  ) => {

    return await api.put(

      `/quotations/${quotationId}/reject`
    );
  }
};

export default quotationService;