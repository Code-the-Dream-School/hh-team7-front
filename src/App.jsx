import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import RegistrationsPage from "./components/user/RegistrationsPage";
import { UserAuthProvider } from "./contexts/UserAuthContext";
import Header from "./components/Header";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import HomePage from "./components/HomePage";
import ForgotPassword from "./components/user/ForgotPassword";
import ManageUser from "./components/user/ManageUsers";
import UpdateUser from "./components/user/UpdateUser";
import { DefaultSidebar } from "./components/DefaultSidebar";

const App = () => {
  const location = useLocation(); // Get the current location (path)

  // Conditionally render the sidebar based on the route
  const shouldShowSidebar =
    location.pathname !== "/login" && location.pathname !== "/register"; // Exclude Login and Register

  return (
    <AuthProvider>
      <UserAuthProvider>
        <Header />
        <div className="flex">
          {shouldShowSidebar && <DefaultSidebar />}
          <div className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/manage-users" element={<ManageUser />} />
              <Route path="/update-user/:id" element={<UpdateUser />} />
              <Route path="/registrations" element={<RegistrationsPage />} />
            </Routes>
          </div>
        </div>
      </UserAuthProvider>
    </AuthProvider>
  );
};

export default App;
