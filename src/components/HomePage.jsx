import React from "react";
import { CiViewTimeline } from "react-icons/ci";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-white shadow-md">
      <div className="flex items-center">
        <CiViewTimeline size={30} className="text-[var(--primary-dark)] mr-2" />
        <h1 className="text-xl font-bold text-gray-700">Event Management</h1>
      </div>

      <div className="flex space-x-4">
        <Link
          to="/register" // Navigate to the Login Page
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
        >
          Register
        </Link>

        <Link
          to="/login" // Navigate to the Login Page
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
