import React, { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import axios from "axios";

const CreateEventForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false); // Toggle for form visibility
  const [events, setEvents] = useState([]);

  const token = "Bearer " + localStorage.getItem("token");

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/events", {
        headers: {
          Authorization: token,
        },
      });
      setEvents(response.data);
    } catch (err) {
      console.error("Error fetching events:", err.message);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccess(null);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/events",
        {
          ...data,
          capacity: parseInt(data.capacity, 10),
          ticketPricing: parseFloat(data.ticketPricing),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      setSuccess("Event created successfully!");

      setIsFormOpen(false);

      setEvents((prevEvents) => [...prevEvents, response.data]);
    } catch (err) {
      console.error("Error creating event:", err.message);
      setSuccess("Failed to create event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl bg-black bg-opacity-50 rounded-lg p-8 text-white">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Event Management</h1>
        <p className="text-lg">Create and manage your events!!</p>
      </div>

      {/* Toggle Form Button */}
      <div className="text-center">
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600"
          onClick={() => setIsFormOpen(!isFormOpen)}
        >
          {isFormOpen ? "Collapse Form" : "Create Event"}
        </button>
      </div>

      {/* Collapsible Form */}
      {isFormOpen && (
        <div className="bg-white text-gray-900 rounded-lg p-6 mt-8 shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Create Event
          </h2>
          {success && (
            <p
              className={
                success.includes("successfully")
                  ? "text-green-500 text-center mb-4"
                  : "text-red-500 text-center mb-4"
              }
            >
              {success}
            </p>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Role Selection */}
            <div className="mb-4">
              <label htmlFor="role" className="block text-gray-700 mb-2">
                Select Role
              </label>
              <select
                {...register("role", { required: "Role is required" })}
                id="role"
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
              >
                <option value="">Select your role</option>
                <option value="organizer">Organizer</option>
                <option value="attendee">Attendee</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role.message}</p>
              )}
            </div>

            {/* Other Form Fields */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Event Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Event name is required" })}
                id="name"
                placeholder="Enter event name"
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            {/* date */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                {...register("date", { required: "Event date is required" })}
                id="date"
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
              />
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date.message}</p>
              )}
            </div>
            {/* time */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Time
              </label>
              <input
                type="time"
                {...register("time", { required: "Event time is required" })}
                id="time"
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
              />
              {errors.time && (
                <p className="text-red-500 text-sm">{errors.time.message}</p>
              )}
            </div>
            {/* location */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                {...register("location", {
                  required: "Event location is required",
                })}
                id="location"
                placeholder="Enter location"
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
              />
              {errors.location && (
                <p className="text-red-500 text-sm">
                  {errors.location.message}
                </p>
              )}
            </div>
            {/* capacity */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Capacity
              </label>
              <input
                type="number"
                {...register("capacity", {
                  required: "Event capacity is required",
                })}
                id="capacity"
                placeholder="Enter capacity"
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
              />
              {errors.capacity && (
                <p className="text-red-500 text-sm">
                  {errors.capacity.message}
                </p>
              )}
            </div>
            {/* ticketPricing */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Ticket Pricing
              </label>
              <input
                type="number"
                {...register("ticketPricing", {
                  required: "Event ticket pricing is required",
                })}
                id="ticketPricing"
                placeholder="Enter ticket pricing"
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
              />
              {errors.ticketPricing && (
                <p className="text-red-500 text-sm">
                  {errors.ticketPricing.message}
                </p>
              )}
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Event"}
            </button>
          </form>
        </div>
      )}

      {/* Display Events as Cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((eventItem) => (
          <div
            key={eventItem.id}
            className="bg-white text-gray-900 rounded-lg shadow-lg p-6 border border-gray-300"
          >
            <h3 className="text-lg font-semibold">{eventItem.name}</h3>
            <p className="text-sm">Date: {eventItem.date}</p>
            <p className="text-sm">
              Time:{" "}
              {new Date(`1970-01-01T${eventItem.time}`).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
            <p className="text-sm">Location: {eventItem.location}</p>
            <p className="text-sm">Capacity: {eventItem.capacity}</p>
            <p className="text-sm">Ticket Price: ${eventItem.ticketPricing}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateEventForm;
