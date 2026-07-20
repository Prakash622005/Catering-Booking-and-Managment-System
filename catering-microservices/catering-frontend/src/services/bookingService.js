import api from "../api/axios";


// GET ALL BOOKINGS
export const getAllBookings = async () => {

  const response = await api.get(
    "/bookings"
  );

  return response.data;
};


// GET BOOKING BY ID
export const getBookingById = async (id) => {

  const response = await api.get(
    `/bookings/${id}`
  );

  return response.data;
};


// CREATE BOOKING
export const createBooking = async (
  bookingData
) => {

  const response = await api.post(
    "/bookings",
    bookingData
  );

  return response.data;
};