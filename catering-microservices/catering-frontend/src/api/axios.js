import axios from "axios";

const BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


// REQUEST INTERCEPTOR
// Automatically attach JWT token
api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);


// RESPONSE INTERCEPTOR
api.interceptors.response.use(

  (response) => response,

  (error) => {

    // Unauthorized
    if (error.response?.status === 401) {

      localStorage.removeItem("token");
      localStorage.removeItem("role");

      window.location.href = "/login";
    }

    // Forbidden
    if (error.response?.status === 403) {

      alert("Access Denied");
    }

    return Promise.reject(error);
  }
);

export default api;