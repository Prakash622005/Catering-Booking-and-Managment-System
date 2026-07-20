import {

  createContext,
  useContext,
  useEffect,
  useState

} from "react";

import api from "../api/axios";

export const AuthContext = createContext();

export function AuthProvider({

  children

}) {

  const [user, setUser] = useState(null);

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [role, setRole] = useState(
    localStorage.getItem("role")
  );

  const [loading, setLoading] = useState(true);

  // LOGIN
  const login = async (loginData) => {

    try {

      const response = await api.post(
        "/auth/login",
        loginData
      );

      const jwtToken = response.data.token;

      const userRole = response.data.role;

      localStorage.setItem(
        "token",
        jwtToken
      );

      localStorage.setItem(
        "role",
        userRole
      );

      setToken(jwtToken);

      setRole(userRole);

      setUser({

        email: loginData.email,
        role: userRole
      });

      return {

        success: true
      };

    } catch (error) {

      return {

        success: false,

        message:
          error.response?.data ||
          "Login Failed"
      };
    }
  };

  // REGISTER
  const register = async (registerData) => {

    try {

      await api.post(
        "/auth/register",
        registerData
      );

      return {

        success: true
      };

    } catch (error) {

      return {

        success: false,

        message:
          error.response?.data ||
          "Registration Failed"
      };
    }
  };

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    setToken(null);

    setRole(null);

    setUser(null);
  };

  useEffect(() => {

    if (token && role) {

      setUser({

        role
      });
    }

    setLoading(false);

  }, [token, role]);

  return (

    <AuthContext.Provider
      value={{

        user,

        token,

        role,

        loading,

        login,

        register,

        logout
      }}
    >

      {children}

    </AuthContext.Provider>
  );
}