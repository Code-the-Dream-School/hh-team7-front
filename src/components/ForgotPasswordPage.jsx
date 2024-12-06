import React from "react";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-blue-600 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="rounded-full w-20 h-20 bg-blue-500 mb-6"></div>
          <h1 className="text-3xl font-bold">Reset Password</h1>
          <p>Enter your email to receive reset instructions!</p>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8 w-96">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Forgot Your Password?
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            No worries! Just enter your email and we’ll send you a reset link.
          </p>

          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Send Reset Link
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-4">
            Remembered your password?{" "}
            <a
              onClick={() => navigate("/login")} // Navigate to the login page
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Sign in
            </a>
          </p>
          <button
            onClick={() => navigate("/")} // Navigate to the home page
            className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
          >
            Go Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
