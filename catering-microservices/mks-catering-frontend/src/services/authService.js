import api from "../api/axios";

// REGISTER

const register = async (
  userData
) => {

  return await api.post(
    "/auth/register",
    userData
  );
};

// LOGIN

const login = async (
  loginData
) => {

  return await api.post(
    "/auth/login",
    loginData
  );
};

// GET USER BY ID

const getUserById = async (
  id
) => {

  return await api.get(
    `/auth/users/${id}`
  );
};

// EXPORTS

const authService = {

  register,

  login,

  getUserById
};

export default authService;