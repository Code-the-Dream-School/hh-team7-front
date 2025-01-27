import React, { useState, useEffect } from "react";
import { EventCard, CardContent } from "@/components/public-event/EventCard";
import { Calendar, MapPin, Users, Search } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import defaultEventImage from '@/components/public-event/img/default-event.jpg';
import { API_BASE_URL } from "@/config";
import { EVENT_CATEGORIES } from '/src/enums.js';

const PublicEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    fetchEvents();
  }, [searchQuery, selectedCategories, currentPage]);

  const fetchEvents = async () => {
    try {
      const categoryQuery = selectedCategories.length
        ? `&category=${selectedCategories.join(",")}`
        : "";
      const response = await axios.get(
        `${API_BASE_URL}/public-events?page=${currentPage}&limit=${ITEMS_PER_PAGE}&search=${searchQuery}${categoryQuery}`
      );
      setEvents(response.data.events);
      setTotalPages(Math.ceil(response.data.total / ITEMS_PER_PAGE));
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
    setCurrentPage(1); // Reset to the first page when filters change
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when search changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentDate = new Date();

  // Separate events into upcoming and past
  const upcomingEvents = events.filter(event => new Date(event.date) >= currentDate);
  const pastEvents = events.filter(event => new Date(event.date) < currentDate);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar with filters */}
      <div className="w-full lg:w-64 flex-shrink-0">
        <EventCard className="lg:sticky top-24">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Filters</h2>
              <button
                className="text-sm text-blue-600 hover:text-blue-700"
                onClick={() => {
                  setSelectedCategories([]);
                  setSearchQuery("");
                }}
              >
                Clear
              </button>
            </div>

            <div className="space-y-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <div className="space-y-2">
                  {EVENT_CATEGORIES.map((category) => (
                    <label key={category.value} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 mr-2"
                        checked={selectedCategories.includes(category.value)}
                        onChange={() => handleCategoryChange(category.value)}
                      />
                      <span className="text-sm">{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </EventCard>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <h1 className="text-2xl font-bold mb-4 lg:mb-0">Upcoming Events</h1>
          <div className="relative w-full lg:w-auto">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full lg:w-auto pl-10 pr-4 py-2 border rounded-lg"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Upcoming Event Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <Link key={event.id} to={`/events/${event.id}`}>
                <EventCard key={event.id}>
                  <img
                    src={event.eventBannerUrl || defaultEventImage}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <CardContent className="pt-4">
                    <h3 className="font-medium text-lg mb-2">{event.name}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {event.capacity} participants
                      </div>
                    </div>
                  </CardContent>
                </EventCard>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 text-center">No upcoming events found.</p>
          )}
        </div>

        <h1 className="text-2xl font-bold">Past Events</h1>
        {/* Past Event Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {pastEvents.length > 0 ? (
            pastEvents.map((event) => (
              <Link key={event.id} to={`/events/${event.id}`}>
                <EventCard key={event.id}>
                  <img
                    src={event.eventBannerUrl || defaultEventImage}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <CardContent className="pt-4">
                    <h3 className="font-medium text-lg mb-2">{event.name}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {event.capacity} participants
                      </div>
                    </div>
                  </CardContent>
                </EventCard>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 text-center">No past events found.</p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicEvents;