import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../App.css";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  HomeIcon,
  CalendarDateRangeIcon,
} from "@heroicons/react/24/solid";

export function DefaultSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <button
        className="hamburger-menu sm:hidden p-2 bg-slate-500 text-white rounded"
        onClick={toggleSidebar}
      >
        {isOpen ? "☰" : "☰"}
      </button>
      <Card
        className={`h-[calc(100vh-2rem)] w-64 p-4 shadow-xl transition-all duration-300 ease-in-out ${
          isOpen ? "block" : "hidden sm:block"
        } sm:block`}
      >
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Event Manager
          </Typography>
        </div>
        <List>
          <ListItem>
            <ListItemPrefix>
              <HomeIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link to="/" className="text-blue-500">
              Home
            </Link>
          </ListItem>
          {/* Other sidebar items */}
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
          {/* Add the Manage Events Link */}
          <ListItem>
            <ListItemPrefix>
              <CalendarDateRangeIcon className="h-5 w-5" />
            </ListItemPrefix>
            <NavLink
              to="/manage-events"
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-gray-700"
              }
            >
              Manage Events
            </NavLink>
          </ListItem>
          {/* Add the Manage Users Link */}
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            <NavLink
              to="/manage-users"
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-gray-700"
              }
            >
              Manage Users
            </NavLink>
          </ListItem>

          {/* managing registration */}
          <ListItem>
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            <NavLink
              to="/manage-register"
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-gray-700"
              }
            >
              Registrations
            </NavLink>
          </ListItem>
        </List>
      </Card>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Toggle Button for Sidebar */}
        {/* <button
          className="sm:hidden p-2 bg-blue-500 text-white rounded"
          onClick={toggleSidebar}
        >
          {isOpen ? "Close Sidebar" : "Open Sidebar"}
        </button> */}
        {/* Content area where the table will be rendered */}
      </div>
    </div>
  );
}
