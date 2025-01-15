import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState({});

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      //alert("Registration successful!");
      navigate("/"); // Redirect to home page after successful registration
    } catch (error) {
      alert(error.message || "An error occurred during registration.");
    }
  };

  useEffect(() => {
    localStorage.setItem("formProgress", JSON.stringify(formData));
  }, [formData]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side */}
      <div className="hidden md:flex w-full md:w-1/2 bg-blue-600 items-center justify-center">
        <div className="text-white text-center">
          <div className="rounded-full w-20 h-20 bg-blue-500 mb-6"></div>
          <h1 className="text-3xl font-bold">Join Us</h1>
          <p>Register now to start creating amazing events!</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-sky-100">
        <div className="bg-white rounded-lg shadow-lg p-8 w-96">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Create an Account
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Please fill in the details below to sign up.
          </p>

          <form
            onSubmit={handleSubmit((data) => {
              setFormData(data);
              onSubmit(data);
            })}
          >
            {/* Name */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-600 mb-2">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                id="name"
                placeholder="Enter your full name"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 mb-2">
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format",
                  },
                })}
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600 mb-2">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label
                htmlFor="confirm-password"
                className="block text-gray-600 mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                id="confirm-password"
                placeholder="Confirm your password"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Role Dropdown */}
            <div className="mb-4">
              <label htmlFor="role" className="block text-gray-600 mb-2">
                Role
              </label>
              <select
                {...register("role", { required: "Role is required" })}
                id="role"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Role</option>
                <option value="organizer">Organizer</option>
                <option value="attendee">Attendee</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <a
              onClick={() => navigate("/login")} // Navigate to the login page
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
