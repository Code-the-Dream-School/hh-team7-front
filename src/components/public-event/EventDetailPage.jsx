import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import defaultEventImage from './img/default-event.jpg';
import { AuthContext } from "../../contexts/AuthContext";

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const [event, setEvent] = useState(null);
  const [registration, setRegistration] = useState(null);
  const [isEventPassed, setIsEventPassed] = useState(false);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          apiBaseUrl + `/public-events/${id}`
        );
        const eventData = response.data;
        setEvent(eventData);

        // Check if the event date has passed
        const eventDate = new Date(eventData.date);
        const currentDate = new Date();
        setIsEventPassed(eventDate < currentDate);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    const fetchRegistrations = async () => {
      if (token) {
        try {
          const response = await axios.get(
            apiBaseUrl + `/registrations`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const registrations = response.data;
          console.log("Fetched registrations:", registrations);
          const userRegistration = registrations.find(
            (reg) => reg.EventId === parseInt(id)
          );
          console.log("User registration for event:", userRegistration);
          setRegistration(userRegistration || null);
        } catch (error) {
          console.error("Error fetching registrations:", error);
        }
      }
    };

    fetchEvent();
    fetchRegistrations();
  }, [id, token]);

  const handleRegister = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const registrationData = {
        EventId: id,
        UserId: user.id,
        status: "Confirmed",
      };

      const response = await axios.post(
        apiBaseUrl + `/registrations`,
        registrationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setRegistration(response.data);
      }
    } catch (error) {
      console.error("Error registering for event:", error);
    }
  };

  const handleCancelRegistration = async () => {
    if (!registration) return;

    try {
      const response = await axios.put(
        apiBaseUrl + `/registrations/${registration.id}`,
        { status: "Canceled" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setRegistration(response.data);
      }
    } catch (error) {
      console.error("Error canceling registration:", error);
    }
  };

  const handleDeleteRegistration = async () => {
    if (!registration) return;

    try {
      await axios.delete(
        apiBaseUrl + `/registrations/${registration.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRegistration(null);
    } catch (error) {
      console.error("Error deleting registration:", error);
    }
  };

  const handleCheckIn = async () => {
    if (!registration) return;

    try {
      const response = await axios.put(
        apiBaseUrl + `/registrations/${registration.id}/check-in`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setRegistration(response.data);
      }
    } catch (error) {
      alert("Check-in time must be on or after the event date");
      console.error("Error checking in:", error);
    }
  };

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
          src={event.eventBannerUrl || defaultEventImage}
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
                    {new Date(event.date).toLocaleTimeString("en-US", {
                     
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-2xl font-bold">${event.price}</span>
                {!isEventPassed && !registration && (
                  <button
                    onClick={handleRegister}
                    className="px-6 py-2 rounded-lg font-medium transition-colors bg-blue-600 hover:bg-blue-700"
                  >
                    Register Now
                  </button>
                )}
                {registration && (
                  <>
                    <button
                      onClick={handleCancelRegistration}
                      className="px-6 py-2 rounded-lg font-medium transition-colors bg-yellow-500 hover:bg-yellow-600"
                    >
                      Cancel Registration
                    </button>
                    <button
                      onClick={handleDeleteRegistration}
                      className="px-6 py-2 rounded-lg font-medium transition-colors bg-red-500 hover:bg-red-600"
                    >
                      Delete Registration
                    </button>
                    {registration.checkInTime ? (
                      <div className="text-sm text-white-600">
                        Checked in at: {new Date(registration.checkInTime).toLocaleString()}
                      </div>
                    ) : (
                      <button
                        onClick={handleCheckIn}
                        className="px-6 py-2 rounded-lg font-medium transition-colors bg-green-600 hover:bg-green-700"
                      >
                        Check In
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2 space-y-8">
            {/* About Section */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">About This Event</h2>
              <p className="text-gray-600 whitespace-pre-line">{event.description}</p>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Details Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
              <div className="space-y-4">
                <h3 className="font-medium text-lg mb-2">{event.name}</h3>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-sm text-gray-600">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="font-medium">Participants</h3>
                    <p className="text-sm text-gray-600">{event.capacity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                  <div>
                    <h3 className="font-medium">Price</h3>
                    <p className="text-sm text-gray-600">${event.price} per person</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Visit Event Website
              </button>
              <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Contact Organizer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;