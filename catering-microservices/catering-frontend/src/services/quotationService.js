import api from "../api/axios";


// GET ALL QUOTATIONS
export const getAllQuotations = async () => {

  const response = await api.get(
    "/quotations"
  );

  return response.data;
};


// GET QUOTATION BY ID
export const getQuotationById = async (id) => {

  const response = await api.get(
    `/quotations/${id}`
  );

  return response.data;
};


// CREATE QUOTATION
export const createQuotation = async (
  quotationData
) => {

  const response = await api.post(
    "/quotations",
    quotationData
  );

  return response.data;
};


// APPROVE QUOTATION
export const approveQuotation = async (
  id
) => {

  const response = await api.put(
    `/quotations/${id}/approve`
  );

  return response.data;
};


// REJECT QUOTATION
export const rejectQuotation = async (
  id
) => {

  const response = await api.put(
    `/quotations/${id}/reject`
  );

  return response.data;
};