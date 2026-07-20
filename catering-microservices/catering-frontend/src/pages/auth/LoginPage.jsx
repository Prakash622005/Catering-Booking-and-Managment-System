import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout";

import useAuth from "../../hooks/useAuth";

function LoginPage() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({

    email: "",

    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    const result = await login(formData);

    if (result.success) {

      const role = localStorage.getItem("role");

      // ROLE BASED NAVIGATION
      if (role === "ROLE_OWNER") {

        navigate("/owner/dashboard");

      } else if (
        role === "ROLE_CUSTOMER"
      ) {

        navigate("/customer/dashboard");
      }

    } else {

      setError(result.message);
    }
  };

  return (

    <AuthLayout>

      <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">

        Login

      </h2>

      {error && (

        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-5">

          {error}

        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold"
        >

          Login

        </button>

      </form>

      <p className="text-center mt-6 text-gray-600">

        Don't have an account?{" "}

        <Link
          to="/register"
          className="text-orange-600 font-semibold"
        >

          Register

        </Link>

      </p>

    </AuthLayout>
  );
}

export default LoginPage;