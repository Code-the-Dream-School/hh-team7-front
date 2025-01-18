import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import { EVENT_CATEGORIES } from "@/enums";

const UpdateEvent = () => {
  const { token } = useContext(AuthContext);
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    capacity: "",
    status: "Draft",
    eventType: "In-person",
    price: "",
    isPrivate: false,
    registrationDeadline: "",
    category: "",
  });
  const [file, setFile] = useState(null); 
  const [previewUrl, setPreviewUrl] = useState(null); 
  const [existingBannerUrl, setExistingBannerUrl] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/events/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const fetchedEvent = response.data;

        setEventData({
          ...fetchedEvent,
          date: new Date(fetchedEvent.date).toISOString().slice(0, 16), 
          registrationDeadline: new Date(fetchedEvent.registrationDeadline).toISOString().slice(0, 16),
        });
        setExistingBannerUrl(fetchedEvent.eventBannerUrl); 
      } catch (err) {
        console.error("Error fetching event data:", err);
        setError("Failed to fetch event data.");
      }
    };

    fetchEvent();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        alert("File size exceeds 5MB.");
        return;
      }
      if (!selectedFile.type.startsWith("image/")) {
        alert("Only image files are allowed.");
        return;
      }
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile)); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      for (const key in eventData) {
        formData.append(key, eventData[key]);
      }

      if (file) {
        formData.append("file", file); 
      }

      await axios.put(
        `${API_BASE_URL}/events/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Event updated successfully!");
      navigate("/manage-events");
    } catch (err) {
      console.error("Error updating event:", err);
      setError(err.response?.data?.message || "Failed to update event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Update Event</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Event Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={eventData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="md:col-span-1">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="md:col-span-1">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Event Date
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="md:col-span-1">
            <label htmlFor="registrationDeadline" className="block text-sm font-medium text-gray-700">
              Registration Deadline
            </label>
            <input
              type="datetime-local"
              id="registrationDeadline"
              name="registrationDeadline"
              value={eventData.registrationDeadline}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="md:col-span-1">
            <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
              Capacity
            </label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={eventData.capacity}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
              min="1"
            />
          </div>

          <div className="md:col-span-1">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={eventData.price}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              min="0"
            />
          </div>

          <div className="md:col-span-1">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={eventData.status}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Canceled">Canceled</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="md:col-span-1">
            <label htmlFor="eventType" className="block text-sm font-medium text-gray-700">
              Event Type
            </label>
            <select
              id="eventType"
              name="eventType"
              value={eventData.eventType}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="In-person">In-person</option>
              <option value="Virtual">Virtual</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div className="md:col-span-1">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={eventData.category}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {EVENT_CATEGORIES.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-1">
            <label htmlFor="file" className="block text-sm font-medium text-gray-700">
              Event Banner
            </label>
            {existingBannerUrl && (
              <div className="mb-4">
                <p className="text-sm text-gray-500">Current Banner:</p>
                <img src={existingBannerUrl} alt="Event Banner" className="w-64 h-auto rounded-md" />
              </div>
            )}
            {previewUrl && (
              <div className="mb-4">
                <p className="text-sm text-gray-500">New Banner Preview:</p>
                <img src={previewUrl} alt="New Event Banner" className="w-64 h-auto rounded-md" />
              </div>
            )}
            <input
              type="file"
              id="file"
              name="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="md:col-span-1">
            <label htmlFor="isPrivate" className="block text-sm font-medium text-gray-700">
              Private Event
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="checkbox"
                id="isPrivate"
                name="isPrivate"
                checked={eventData.isPrivate}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isPrivate" className="ml-2 text-sm text-gray-700">Yes</label>
            </div>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={eventData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Updating..." : "Update Event"}
        </button>
      </form>
    </div>
  );
};

export default UpdateEvent;