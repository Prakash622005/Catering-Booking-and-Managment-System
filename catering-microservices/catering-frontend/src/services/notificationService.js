import api from "../api/axios";


// GET ALL NOTIFICATIONS
export const getAllNotifications = async () => {

  const response = await api.get(
    "/notifications"
  );

  return response.data;
};


// GET NOTIFICATION BY ID
export const getNotificationById = async (
  id
) => {

  const response = await api.get(
    `/notifications/${id}`
  );

  return response.data;
};