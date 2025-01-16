import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom"; 

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <h1 className="text-3xl font-bold text-gray-800">Event Platform</h1> 
          </div>

          <nav className="hidden md:flex space-x-10"> 
            {user ? (
              <>
                <Link
                  to="/"
                  className={`inline-flex items-center px-1 pt-1 text-lg font-medium ${
                    location.pathname === "/" 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/dashboard"
                  className={`inline-flex items-center px-1 pt-1 text-lg font-medium ${
                    location.pathname === "/dashboard" 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/manage-events"
                  className={`inline-flex items-center px-1 pt-1 text-lg font-medium ${
                    location.pathname === "/manage-events" 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Events
                </Link>
                <Link
                  to="/profile"
                  className={`inline-flex items-center px-1 pt-1 text-lg font-medium ${
                    location.pathname === "/profile" 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Profile
                </Link>
                <Link
                  to="/manage-users"
                  className={`inline-flex items-center px-1 pt-1 text-lg font-medium ${
                    location.pathname === "/manage-users" 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Manage Users
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className={`inline-flex items-center px-1 pt-1 text-lg font-medium ${
                    location.pathname === "/" 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Home
                </Link>
                {/* <Link
                  to="/public-event"
                  className={`inline-flex items-center px-1 pt-1 text-lg font-medium ${
                    location.pathname === "/public-event" 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Events
                </Link> */}
              </>
            )}
          </nav>

          <div className="flex items-center space-x-6">
            {!user ? (
              <Link to="/register">
                <button className="px-6 py-3 bg-green-500 text-white text-lg rounded hover:bg-green-600">
                  Register
                </button>
              </Link>
            ) : null}

            {!user ? (
              <Link to="/login">
                <button className="ml-4 px-6 py-3 bg-blue-500 text-white text-lg rounded hover:bg-blue-600">
                  Login
                </button>
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="ml-4 px-6 py-3 bg-blue-500 text-white text-lg rounded hover:bg-blue-600"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;