import { useState } from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout";

import useAuth from "../../hooks/useAuth";

function RegisterPage() {

  const navigate =
    useNavigate();

  const { register } =
    useAuth();

  const [formData, setFormData] =
    useState({

      fullName: "",

      email: "",

      phone: "",

      password: ""
    });

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // HANDLE INPUT CHANGE

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value
    });
  };

  // HANDLE REGISTER

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setError("");

      setLoading(true);

      try {

        const result =
          await register(formData);

        if (result.success) {

          alert(
            "Registration Successful"
          );

          navigate("/login");

        } else {

          setError(
            result.message
          );
        }

      } catch (error) {

        setError(
          "Registration Failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <AuthLayout>

      {/* TITLE */}

      <h2 className="text-3xl font-bold text-center text-orange-600 mb-8">

        Customer Registration

      </h2>

      {/* ERROR */}

      {error && (

        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-5">

          {error}

        </div>
      )}

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        {/* FULL NAME */}

        <input
          type="text"
          name="fullName"
          placeholder="Enter Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        {/* EMAIL */}

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        {/* PHONE */}

        <input
          type="text"
          name="phone"
          placeholder="Enter Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        {/* PASSWORD */}

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        {/* BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold"
        >

          {loading
            ? "Registering..."
            : "Register"}

        </button>

      </form>

      {/* LOGIN LINK */}

      <p className="text-center mt-6 text-gray-600">

        Already have an account?{" "}

        <Link
          to="/login"
          className="text-orange-600 font-semibold"
        >

          Login

        </Link>

      </p>

    </AuthLayout>
  );
}

export default RegisterPage;