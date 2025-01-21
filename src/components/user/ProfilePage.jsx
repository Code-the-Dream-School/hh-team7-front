import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Camera,
  Calendar,
  Users,
  Star,
  Edit,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import QRCodeGenerator from "../Registration/QRcodeGenerator";

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

const ProfilePage = () => {
  const { user, token } = useContext(AuthContext);
  const [userData, setUserData] = useState(null); // Store the fetched user data
  const [userStats, setUserStats] = useState({
    eventsAttended: 0,
    eventsCreated: 0,
    totalParticipants: 0,
    upcomingEvents: 0,
  });
  const [createdEvents, setCreatedEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  const [isUploading, setIsUploading] = useState(false);
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [qrCodeValue, setQrCodeValue] = useState(null);

  // Fetch the current user's profile data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user || !token) return; // If user or token is not available, skip fetching

      setLoading(true);
      try {
        const response = await axios.get(`${apiBaseUrl}/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Set user data
        setUserData(response.data);

        setUserStats({
          eventsAttended: response.data.statistics.eventsAttended || 0,
          eventsCreated: response.data.statistics.eventsCreated || 0,
          totalParticipants: response.data.statistics.pastEvents || 0,
          upcomingEvents: response.data.statistics.upcomingEvents || 0,
        });
        setCreatedEvents(response.data.createdEvents || []);

        setQrCodeValue(
          JSON.stringify({
            userId: response.data.id,
            name: response.data.name,
            email: response.data.email,
          })
        );
      } catch (err) {
        setError("Failed to fetch profile data.");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, token]);

  useEffect(() => {
    if (image) {
      handleProfilePictureUpdate();
    }
  }, [image]);

  // Handle file selection for the new profile picture
  const handleImageChange = (e) => {
    console.log("File selected:", e.target.files[0]);
    setImage(e.target.files[0]);
  };

  // Handle profile picture update
  const handleProfilePictureUpdate = async () => {
    if (!image || isUploading) {
      alert("Please select an image first.");
      return;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", image);
    console.log("Sending image to the server...", formData);
    try {
      const response = await axios.put(
        `${apiBaseUrl}/users/${user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUserData((prevData) => ({
        ...prevData,
        profilePictureUrl: response.data.profilePictureUrl,
      }));
      setImage(null);
      alert("Profile picture updated successfully!");
    } catch (err) {
      console.error("Error updating profile picture:", err);
      alert("Failed to update profile picture.");
    } finally {
      setIsUploading(false);
    }
  };

  // State to track which event is expanded
  const [expandedEventId, setExpandedEventId] = useState(null);

  // Toggle expansion
  const toggleEvent = (eventId) => {
    setExpandedEventId(expandedEventId === eventId ? null : eventId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-start gap-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
              {isUploading ? (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <div className="text-white">Uploading...</div>
                </div>
              ) : null}
              <img
                src={userData ? userData.profilePictureUrl : "./user.jpg"}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>

            <button
              className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700"
              onClick={() => {
                console.log("Opening file input...");
                document.getElementById("profile-image-input").click();
              }}
              disabled={isUploading}
            >
              <Camera className="h-5 w-5" />
            </button>

            <input
              id="profile-image-input"
              type="file"
              className="hidden"
              onChange={handleImageChange}
              disabled={isUploading}
            />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold mb-2">
                  {userData ? userData.name : "Loading..."}
                </h1>
                <p className="text-gray-600">
                  {userData ? userData.email : "Loading..."}
                </p>
              </div>
              <Link to={`/update-user/${userData ? userData.id : ""}`}>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Events Attended</p>
                <p className="text-2xl font-bold">{userStats.eventsAttended}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Events Created</p>
                <p className="text-2xl font-bold">{userStats.eventsCreated}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Participants</p>
                <p className="text-2xl font-bold">
                  {userStats.totalParticipants}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Upcoming Events</p>
                <p className="text-2xl font-bold">{userStats.upcomingEvents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      Created Events
      <Card>
        <CardHeader>
          <CardTitle>Created Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {createdEvents.map((event) => (
              <div key={event.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{event.name}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString()} •{" "}
                      {event.participantsCount} participants
                    </p>
                  </div>
                  <button
                    onClick={() => toggleEvent(event.id)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    {expandedEventId === event.id ? (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {/* Participants list - shown when expanded */}
                {expandedEventId === event.id && (
                  <div className="pl-4 mt-2 space-y-2">
                    <h4 className="text-sm font-bold text-gray-700">
                      Participants:
                    </h4>
                    <div className="space-y-2">
                      {event.participants.map((participant, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                        >
                          <span className="text-sm font-medium">
                            {participant.name}
                          </span>
                          <span className="text-sm text-gray-600">
                            {participant.email}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="bg-white shadow-sm rounded-lg p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">Your QR Code</h2>
        <p className="text-gray-600 mb-4">
          This QR code is unique to your account. Event organizers can scan this
          code for quick check-in to the events you have registered for. Make
          sure to keep it safe and accessible during event days.
        </p>
        {qrCodeValue ? (
          <QRCodeGenerator value={qrCodeValue} />
        ) : (
          <p className="text-gray-600">No QR code available.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
