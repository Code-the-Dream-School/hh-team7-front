import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const { requestPasswordReset } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await requestPasswordReset(email);
      setMessage("If the email exists, a reset link has been sent.");
    } catch (error) {
      setMessage(error); // Display error message if needed
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      {/* ... */}

      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8 w-96">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Forgot Your Password?
          </h2>
          {message && <p className="text-sm text-green-500 mb-4">{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
          {/* Back to login link */}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
