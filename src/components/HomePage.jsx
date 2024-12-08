import React from "react";
import { CiViewTimeline } from "react-icons/ci";
import { Link } from "react-router-dom";

function HomePage() {
  const backgroundImage =
    "https://cdn.pixabay.com/photo/2017/03/30/21/45/time-2189800_1280.jpg";

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
      className="relative"
    >
      <div className="absolute top-0 left-0 right-0 px-4 py-2 bg-white bg-opacity-95 shadow-md">
        <div className="flex items-center space-x-2">
          <CiViewTimeline
            size={30}
            className="text-[var(--primary-dark)] mr-2"
          />
          <h1 className="text-xl font-bold text-gray-700">Event Management</h1>
        </div>

        <div className="absolute top-0 right-6 flex space-x-4">
          <Link
            to="/Register" // Navigate to the Login Page
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
          >
            Register
          </Link>

          <Link
            to="/login" // Navigate to the Login Page
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
