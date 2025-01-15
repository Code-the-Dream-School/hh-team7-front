import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Camera, Calendar, Users, Star, Edit, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthContext } from "../../contexts/AuthContext"; 
import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

const ProfilePage = () => {
  const { user, token } = useContext(AuthContext); 
  const [userData, setUserData] = useState(null); // Store the fetched user data
  const [userStats, setUserStats] = useState({
    eventsAttended: 0,
    eventsCreated: 0,
    totalParticipants: 0,
    upcomingEvents: 0
  });
  const [createdEvents, setCreatedEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const { id } = useParams(); 
  const navigate = useNavigate();

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
          eventsAttended: 0,//response.data.eventsAttended || 0,
          eventsCreated:  0,//response.data.eventsCreated || 0,
          totalParticipants:  0,//response.data.totalParticipants || 0,
          upcomingEvents:  0,//response.data.upcomingEvents || 0,
        });

        setCreatedEvents([]);//response.data.createdEvents || []);
      } catch (err) {
        setError("Failed to fetch profile data.");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, token]);

  // Handle file selection for the new profile picture
  const handleImageChange = (e) => {
    console.log("File selected:", e.target.files[0]);
    setImage(e.target.files[0]);
  };

  // Handle profile picture update
  const handleProfilePictureUpdate = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

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
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log("Response from server:", response.data);
      setUserData((prevData) => ({
        ...prevData,
        profilePictureUrl: response.data.profilePictureUrl,
      }));
      alert("Profile picture updated successfully!");
    } catch (err) {
      console.error("Error updating profile picture:", err);
      alert("Failed to update profile picture.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-start gap-6">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
              <img
                src={userData ? userData.profilePictureUrl : './user.jpg'} 
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
            >
              <Camera className="h-5 w-5" />
            </button>

            <input
              id="profile-image-input"
              type="file"
              className="hidden"
              onChange={(e) => {
                console.log("File selected:", e.target.files[0]); // Проверяем, что файл выбран
                handleImageChange(e);
                handleProfilePictureUpdate();
              }}
            />
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
              <h1 className="text-2xl font-bold mb-2">{userData ? userData.name : 'Loading...'}</h1>
                <p className="text-gray-600">{userData ? userData.email : 'Loading...'}</p>
              </div>
              <Link to={`/update-user/${userData ? userData.id : ''}`}>
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
                <p className="text-2xl font-bold">{userStats.totalParticipants}</p>
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

      {/* Created Events */}
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
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString()} • {event.participants} participants
                    </p>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
 };

 export default ProfilePage;