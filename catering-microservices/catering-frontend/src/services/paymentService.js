import api from "../api/axios";


// GET ALL PAYMENTS
export const getAllPayments = async () => {

  const response = await api.get(
    "/payments"
  );

  return response.data;
};


// GET PAYMENT BY ID
export const getPaymentById = async (id) => {

  const response = await api.get(
    `/payments/${id}`
  );

  return response.data;
};


// CREATE PAYMENT
export const createPayment = async (
  paymentData
) => {

  const response = await api.post(
    "/payments",
    paymentData
  );

  return response.data;
};