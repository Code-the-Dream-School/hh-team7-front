import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  ArrowLeft,
  Share2,
  Bookmark,
  Clock,
  DollarSign,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/public-events/${id}`
        );
        setEvent(response.data);
        console.log("response.data",response);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                Back
              </button>
              <div className="h-6 w-px bg-gray-200" />
              <span className="text-sm text-gray-600">
                Events / {event.category} / {event.title}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Bookmark className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-96 bg-gray-900">
        <img
          src={event.eventBannerUrl}
          alt={event.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 text-white p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-block px-3 py-1 bg-blue-600 rounded-full text-sm mb-4">
                  {event.category}
                </span>
                <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
                <div className="flex items-center gap-4 text-gray-300">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {event.time} - {event.endTime}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-2xl font-bold">${event.price}</span>
                <button
                  onClick={() => setIsRegistered(!isRegistered)}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    isRegistered
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isRegistered ? "Registered" : "Register Now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The rest of your EventDetailPage */}
    </div>
  );
};

export default EventDetailPage;
