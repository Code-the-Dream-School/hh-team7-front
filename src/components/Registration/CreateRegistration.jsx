import React, { useContext, useState } from "react";
import { UserAuthContext } from "../../contexts/UserAuthContext";
import axios from "axios";

const CreateRegistration = () => {
  const { token, createRegistration } = useContext(UserAuthContext); // Access token and context function
  const [eventid, setEventid] = useState(""); // State for event ID
  const [status, setStatus] = useState("Confirmed"); // Default status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [username, setUsername] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const registrationData = {
        eventid: parseInt(eventid, 10),
        status: status.charAt(0).toUpperCase() + status.slice(1).toLowerCase(), // Ensure status matches ENUM format
      };
      console.log("registrationData", registrationData);
      console.log("Token:", token);

      const response = await axios.post(
        "http://localhost:8000/api/v1/registrations",
        registrationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Handle success
      console.log("Response:", response.data);
      setSuccess("Registration created successfully!");
      setEventid("");
    } catch (err) {
      // Handle error
      console.error("Error creating registration:", err);
      setError(
        err.response?.data?.message ||
          "Failed to create registration. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Create Event Registration</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      {loading && <p className="text-blue-500">Processing...</p>}

      {/* Registration Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            User Name
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="eventid"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Event ID
          </label>
          <input
            type="number"
            id="eventid"
            value={eventid}
            onChange={(e) => setEventid(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter the Event ID"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Create Registration"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRegistration;
