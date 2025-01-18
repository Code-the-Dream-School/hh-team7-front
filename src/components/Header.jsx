import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <h1 className="text-3xl font-bold text-gray-800">Event Platform</h1>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
            >
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>

          <nav className="hidden md:flex md:items-center md:space-x-10">
            <Link
              to="/"
              className={`inline-flex items-center px-1 pt-1 text-lg font-medium ${
                location.pathname === "/"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Home
            </Link>
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className={`inline-flex items-center px-1 pt-1 text-lg font-medium ${
                    location.pathname === "/dashboard"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/manage-events"
                  className={`inline-flex items-center px-1 pt-1 text-lg font-medium ${
                    location.pathname === "/manage-events"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Events
                </Link>
                <Link
                  to="/profile"
                  className={`inline-flex items-center px-1 pt-1 text-lg font-medium ${
                    location.pathname === "/profile"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Profile
                </Link>
                <Link
                  to="/manage-users"
                  className={`inline-flex items-center px-1 pt-1 text-lg font-medium ${
                    location.pathname === "/manage-users"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Manage Users
                </Link>
              </>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            {!user ? (
              <>
                <Link to="/register">
                  <button className="px-6 py-3 bg-green-500 text-white text-lg rounded hover:bg-green-600">
                    Register
                  </button>
                </Link>
                <Link to="/login">
                  <button className="ml-4 px-6 py-3 bg-blue-500 text-white text-lg rounded hover:bg-blue-600">
                    Login
                  </button>
                </Link>
              </>
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

        <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
          <nav className="pt-2 pb-4 space-y-1">
            <Link
              to="/"
              className={`block pl-3 pr-4 py-2 text-base font-medium ${
                location.pathname === "/"
                  ? "text-blue-600 border-l-4 border-blue-600"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Home
            </Link>
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className={`block pl-3 pr-4 py-2 text-base font-medium ${
                    location.pathname === "/dashboard"
                      ? "text-blue-600 border-l-4 border-blue-600"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/manage-events"
                  className={`block pl-3 pr-4 py-2 text-base font-medium ${
                    location.pathname === "/manage-events"
                      ? "text-blue-600 border-l-4 border-blue-600"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  Events
                </Link>
                <Link
                  to="/profile"
                  className={`block pl-3 pr-4 py-2 text-base font-medium ${
                    location.pathname === "/profile"
                      ? "text-blue-600 border-l-4 border-blue-600"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  Profile
                </Link>
                <Link
                  to="/manage-users"
                  className={`block pl-3 pr-4 py-2 text-base font-medium ${
                    location.pathname === "/manage-users"
                      ? "text-blue-600 border-l-4 border-blue-600"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  Manage Users
                </Link>
              </>
            )}
          </nav>
          <div className="pt-4 pb-4 space-y-1">
            {!user ? (
              <>
                <Link to="/register">
                  <button className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-white bg-green-500 hover:bg-green-600">
                    Register
                  </button>
                </Link>
                <Link to="/login">
                  <button className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-white bg-blue-500 hover:bg-blue-600">
                    Login
                  </button>
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="block w-full text-left pl-3 pr-4 py-2 text-base font-medium text-white bg-blue-500 hover:bg-blue-600"
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