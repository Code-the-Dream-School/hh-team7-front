import React, { useState } from "react";
import { Link } from "react-router-dom";
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
} from "@heroicons/react/24/solid";

export function DefaultSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
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
            <Link to="/createEvent" className="text-blue-500">
              Home
            </Link>
          </ListItem>
          {/* Other sidebar items */}
          <ListItem>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link>Dashboard</Link>
          </ListItem>
          {/* Add the Manage Users Link */}
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Link to="/manage-users" className="text-blue-500">
              Manage Users
            </Link>
          </ListItem>
        </List>
      </Card>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Toggle Button for Sidebar */}
        <button
          className="sm:hidden p-2 bg-blue-500 text-white rounded"
          onClick={toggleSidebar}
        >
          {isOpen ? "Close Sidebar" : "Open Sidebar"}
        </button>
        {/* Content area where the table will be rendered */}
      </div>
    </div>
  );
}
