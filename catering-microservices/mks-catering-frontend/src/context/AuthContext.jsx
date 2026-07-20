import {

  createContext,
  useEffect,
  useState

} from "react";

import api from "../api/axios";

export const AuthContext =
  createContext();

export function AuthProvider({

  children

}) {

  // STATES

  const [user, setUser] =
    useState(null);

  const [token, setToken] =
    useState(
      localStorage.getItem("token")
    );

  const [role, setRole] =
    useState(
      localStorage.getItem("role")
    );

  const [loading, setLoading] =
    useState(false);

  // REGISTER

  const register =
    async (registerData) => {

      try {

        const response =
          await api.post(

            "/auth/register",

            registerData
          );

        return {

          success: true,

          data: response.data
        };

      } catch (error) {

        return {

          success: false,

          message:

            error.response?.data?.message ||

            error.response?.data?.error ||

            "Registration Failed"
        };
      }
    };

  // LOGIN

  const login =
    async (loginData) => {

      try {

        const response =
          await api.post(

            "/auth/login",

            loginData
          );

        // RESPONSE DATA

        const jwtToken =
          response.data.token;

        const userRole =
          response.data.role;

        const userId =
          response.data.userId;

        // STORE LOCAL STORAGE

        localStorage.setItem(
          "token",
          jwtToken
        );

        localStorage.setItem(
          "role",
          userRole
        );

        localStorage.setItem(
          "customerId",
          userId
        );

        // UPDATE STATE

        setToken(jwtToken);

        setRole(userRole);

        setUser({

          userId,

          email:
            loginData.email,

          role:
            userRole
        });

        return {

          success: true,

          role: userRole
        };

      } catch (error) {

        console.error(
          "Login Error:",
          error
        );

        return {

          success: false,

          message:

            error.response?.data?.message ||

            error.response?.data?.error ||

            "Invalid Credentials"
        };
      }
    };

  // LOGOUT

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "role"
    );

    localStorage.removeItem(
      "customerId"
    );

    setToken(null);

    setRole(null);

    setUser(null);
  };

  // INITIAL USER CHECK

  useEffect(() => {

    if (token && role) {

      setUser({

        role
      });
    }

  }, [token, role]);

  // ROYAL BLACK & DEEP VIOLET IMMERSIVE STYLE TOKEN DICTIONARY
  const themeStyles = {
    glassPanel: {
      backgroundColor: "rgba(19, 22, 34, 0.4)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      borderRadius: "24px",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.35)",
    },
    textGlowGradient: {
      background: "linear-gradient(135deg, #FFFFFF 30%, #C084FC 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    interactiveInput: {
      backgroundColor: "rgba(10, 11, 18, 0.5)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "12px",
      color: "#FFFFFF",
      outline: "none",
      transition: "border-color 0.2s ease",
    },
    actionButtonPurple: {
      background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
      color: "#FFFFFF",
      border: "none",
      borderRadius: "14px",
      fontWeight: "700",
      cursor: "pointer",
      transition: "all 0.2s ease",
      boxShadow: "0 4px 14px rgba(124, 58, 237, 0.2)",
    }
  };

  // PROVIDER

  return (

    <AuthContext.Provider
      value={{

        user,

        token,

        role,

        loading,

        register,

        login,

        logout,

        themeStyles
      }}
    >

      {children}

    </AuthContext.Provider>
  );
}