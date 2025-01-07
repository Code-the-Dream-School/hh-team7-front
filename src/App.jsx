import React from "react";
import "./App.css";
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
import ManageRegistration from "./components/Registration/manageRegistration";

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
                <Route path="/manage-users" element={<ManageUser />} />
                <Route path="/update-user/:id" element={<UpdateUser />} />

                <Route path="/manage-events" element={<ManageEvents />} />
                <Route path="/create-event" element={<CreateEvent />} />
                <Route path="/update-event/:id" element={<UpdateEvent />} />
                <Route path="/registrations" element={<CreateRegistration />} />
                <Route
                  path="manage-register"
                  element={<ManageRegistration />}
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
