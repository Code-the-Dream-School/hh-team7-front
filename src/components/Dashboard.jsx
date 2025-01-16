import React, { useEffect, useState } from "react";
import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalConfirmedEvents: 0,
    totalCancelledEvents: 0,
    totalAttendees: 0,
    totalUsers: 0,
    totalCheckIns: 0,
    totalUpcomingEvents: 0,
    totalPastEvents: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(apiBaseUrl + "/statistics");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Dashboard</h1>
        <div className="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8">
          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
            <div className="p-4 bg-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Total Users</h3>
              <p className="text-3xl">{stats.totalUsers}</p>
            </div>
          </div>
          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
            <div className="p-4 bg-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Total Events</h3>
              <p className="text-3xl">{stats.totalEvents}</p>
            </div>
          </div>
          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
            <div className="p-4 bg-indigo-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5a7 7 0 0114 0v3a2 2 0 002 2h-2a2 2 0 01-2-2V5a5 5 0 00-10 0v3H9V5zM3 12a2 2 0 012-2h14a2 2 0 012 2v10H5a2 2 0 01-2-2V12zm5 0v10a1 1 0 102 0V12H8zm8 0v10a1 1 0 102 0V12h-2z" />
              </svg>
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Confirmed Events</h3>
              <p className="text-3xl">{stats.totalConfirmedEvents}</p>
            </div>
          </div>
          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
            <div className="p-4 bg-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 16V4a2 2 0 00-2-2H7a2 2 0 00-2 2v12m2-6h10a2 2 0 012 2v6a2 2 0 01-2 2H9m0-6h10a2 2 0 012 2v6a2 2 0 01-2 2H9m0-6h10a2 2 0 012 2v6a2 2 0 01-2 2H9m0-6h10a2 2 0 012 2v6a2 2 0 01-2 2H9" />
              </svg>
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Cancelled Events</h3>
              <p className="text-3xl">{stats.totalCancelledEvents}</p>
            </div>
          </div>
          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
            <div className="p-4 bg-yellow-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h1v7H3a2 2 0 01-2-2V10a2 2 0 012-2h1V3a2 2 0 012-2h4a2 2 0 012 2v5h1a2 2 0 012 2v7a2 2 0 01-2 2h-1v1a2 2 0 11-4 0v-1H5v1a2 2 0 11-4 0v-1H3a2 2 0 01-2-2V10a2 2 0 012-2z" />
              </svg>
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Total Attendees</h3>
              <p className="text-3xl">{stats.totalAttendees}</p>
            </div>
          </div>
          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
            <div className="p-4 bg-purple-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Total Check-Ins</h3>
              <p className="text-3xl">{stats.totalCheckIns}</p>
            </div>
          </div>
          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
            <div className="p-4 bg-pink-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12v8a2 2 0 002 2h4a2 2 0 002-2v-8M5 12V6a2 2 0 012-2h10a2 2 0 012 2v6" />
              </svg>
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Upcoming Events</h3>
              <p className="text-3xl">{stats.totalUpcomingEvents}</p>
            </div>
          </div>
          <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
            <div className="p-4 bg-teal-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">Past Events</h3>
              <p className="text-3xl">{stats.totalPastEvents}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;