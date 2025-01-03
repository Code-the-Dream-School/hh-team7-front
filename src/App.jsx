import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { EventProvider } from "./contexts/EventContext";
import { UserAuthProvider } from "./contexts/UserAuthContext";
import Header from "./components/Header";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import HomePage from "./components/HomePage";
import ForgotPassword from "./components/user/ForgotPassword";
import ManageUser from "./components/user/ManageUsers";
import UpdateUser from "./components/user/UpdateUser";
import { DefaultSidebar } from "./components/DefaultSidebar";
import ManageEvents from "./components/event/ManageEvents";
import UpdateEvent from "./components/event/UpdateEvent";
import CreateEvent from "./components/event/CreateEvent";
import CreateRegistration from "./components/Registration/CreateRegistration";
import ProtectedRoute from "./components/ProtectedRoute"; 
import Unauthorized from "./components/Unauthorized";

const App = () => {
  const location = useLocation(); // Get the current location (path)

  // Conditionally render the sidebar based on the route
  const shouldShowSidebar =
    location.pathname !== "/login" && location.pathname !== "/register"; // Exclude Login and Register

  return (
    <AuthProvider>
      <UserAuthProvider>
        <EventProvider>
          <Header />
          <div className="flex">
            {shouldShowSidebar && <DefaultSidebar />}
            <div className="flex-1 p-4">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                
                {/* Protected Routes */}
                <Route
                  path="/manage-users"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "organizer"]}>
                      <ManageUser />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/update-user/:id"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "organizer"]}>
                      <UpdateUser />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/manage-events"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "organizer"]}>
                      <ManageEvents />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/create-event"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "organizer"]}>
                      <CreateEvent />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/update-event/:id"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "organizer"]}>
                      <UpdateEvent />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/registrations"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "organizer", "attendee"]}>
                      <CreateRegistration />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </div>
        </EventProvider>
      </UserAuthProvider>
    </AuthProvider>
  );
};

export default App;
