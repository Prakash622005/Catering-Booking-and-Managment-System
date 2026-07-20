import api from "../api/axios";


// LOGIN
export const loginUser = async (loginData) => {

  const response = await api.post(
    "/auth/login",
    loginData
  );

  return response.data;
};


// REGISTER
export const registerUser = async (registerData) => {

  const response = await api.post(
    "/auth/register",
    registerData
  );

  return response.data;
};