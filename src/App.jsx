import React from "react";
import './index.css';
import { BrowserRouter as Router, Route, Routes, useLocation,} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { EventProvider } from "./contexts/EventContext";
import { UserAuthProvider } from "./contexts/UserAuthContext";
import Header from "./components/Header";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import { ROLES } from "./components/user/Role";
import HomePage from "./components/HomePage";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPasswordVerify from "./components/user/ResetPasswordVerify";
import ResetPasswordUpdate from "./components/user/ResetPasswordUpdate";
import ManageUser from "./components/user/ManageUsers";
import UpdateUser from "./components/user/UpdateUser";
import { DefaultSidebar } from "./components/DefaultSidebar";
import ManageEvents from "./components/event/ManageEvents";
import UpdateEvent from "./components/event/UpdateEvent";
import CreateEvent from "./components/event/CreateEvent";
import CreateRegistration from "./components/Registration/CreateRegistration";
import ManageRegistration from "./components/Registration/manageRegistration";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./components/Unauthorized";
import PublicEvent from "./components/public-event/PublicEvents";
import EventDetailPage from "./components/public-event/EventDetailPage";
import ProfilePage from "./components/user/ProfilePage";
import Dashboard from "./components/Dashboard";

const QueryRouter = () => {
  const location = useLocation();
  const hasAuthParam = new URLSearchParams(location.search).has("auth");

  return hasAuthParam ? <ResetPasswordVerify /> : <ForgotPassword />;
};

const App = () => {
  const location = useLocation(); // Get the current location (path)

  // Conditionally render the sidebar based on the route
  const shouldShowSidebar =
    location.pathname !== "/login" && location.pathname !== "/register" && location.pathname !== "/" && location.pathname !== "/manage-events"; // Exclude Login and Register and Home

  return (
    <AuthProvider>
      <UserAuthProvider>
        <EventProvider>
          <Header />
          <div className="flex">
            {/* {shouldShowSidebar && <DefaultSidebar />} */}
            <div className="flex-1 p-4">
              <Routes>
                <Route path="/" element={<PublicEvent />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/public-event" element={<PublicEvent />} />
                <Route path="/events/:id" element={<EventDetailPage />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                {/* <Route path="/manage-users" element={<ManageUser />} />
                <Route path="/manage-events" element={<ManageEvents />} /> */}
                <Route path="/profile" element={<ProfilePage />}/>
                {/* Protected Routes */}
                <Route
                  path="/manage-users"
                  element={
                    <ProtectedRoute allowedRoles={[ ROLES.ADMIN ]}>
                      <ManageUser />
                    </ProtectedRoute>
                  }
                />
                <Route 
                  path="/update-user/:id"
                  element={
                    <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.ORGANIZER]}>
                      <UpdateUser />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/manage-events"
                  element={
                    <ProtectedRoute allowedRoles={[ROLES.ORGANIZER]}>
                      <ManageEvents />
                    </ProtectedRoute>
                  }
                  /> 
                <Route
                  path="/create-event"
                  element={
                    <ProtectedRoute allowedRoles={[ROLES.ORGANIZER]}>
                      <CreateEvent />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/update-event/:id"
                  element={
                    <ProtectedRoute allowedRoles={[ROLES.ORGANIZER]}>
                      <UpdateEvent />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/registrations"
                  element={
                    <ProtectedRoute
                      allowedRoles={[ROLES.ORGANIZER, ROLES.ATTENDEE]}>
                      <CreateRegistration />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/manage-register"
                  element={
                    <ProtectedRoute allowedRoles={[ROLES.ORGANIZER, ROLES.ATTENDEE]}>
                      <ManageRegistration />
                    </ProtectedRoute>
                  }
                />

                <Route path="/forgot-password" element={<QueryRouter />} />
                <Route
                  path="/reset-password/update"
                  element={<ResetPasswordUpdate />}
                />
                {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
              </Routes>
            </div>
          </div>
        </EventProvider>
      </UserAuthProvider>
    </AuthProvider>
  );
};

export default App;
