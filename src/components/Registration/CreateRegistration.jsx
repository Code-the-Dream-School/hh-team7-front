import React, { useContext, useState } from "react";
import { UserAuthContext } from "../../contexts/UserAuthContext";
import axios from "axios";
import "../../App.css";
import QRcodeGenerator from "./QRcodeGenerator";
import { useNavigate } from "react-router-dom";

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

const CreateRegistration = ({ onRegistrationCreated }) => {
  const { token } = useContext(UserAuthContext); // Access token and context function
  const [eventId, setEventId] = useState(""); // State for event ID
  const [status, setStatus] = useState("Confirmed"); // Default status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [username, setUsername] = useState("");
  const [qrCodeValue, setQrCodeValue] = useState("");
  const navigate = useNavigate();

  const sendEmailConfirmation = async (registration) => {
    try {
      await axios.post(`${apiBaseUrl}/send-email`, {
        email: registration.email,
        subject: "Event Registration Confirmation",
        body: "Thank you for registering! Your unique QR code is attached.",
        qrCode: qrCodeValue,
      });
      console.log("Email sent successfully.");
    } catch (err) {
      console.error("Error sending email:", err);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const registrationData = {
        eventId: parseInt(eventId, 10),
        status: status.charAt(0).toUpperCase() + status.slice(1).toLowerCase(), // Ensure status matches ENUM format
      };
      console.log("registrationData", registrationData);
      console.log("Token:", token);

      const response = await axios.post(
        `${apiBaseUrl}/registrations`,
        registrationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.data);
      //set the qr code
      setQrCodeValue(
        JSON.stringify({
          id: response.data.id,
          eventId: response.data.eventId,
          status: response.data.status,
          username: username,
          createdAt: response.data.createdAt,
        })
      );
      onRegistrationCreated(response.data);

      setSuccess("Registration created successfully!");
      sendEmailConfirmation(response.data);
      navigate(`/profile/${response.data.userId}`);

      setEventId("");
      setUsername("");
    } catch (err) {
      //console.error("Error creating registration:", err);
      setError(
        err.response?.data?.message ||
          "Failed to create registration. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Create Event Registration
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      {loading && <p className="text-blue-500">Processing...</p>}

      {/* Registration Form */}
      <form
        onSubmit={handleSubmit}
        className="responsive-form bg-white shadow-md rounded px-4 py-6 md:px-8 md:py-10"
      >
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block font-bold mb-2 text-gray-700"
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
            htmlFor="eventId"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Event ID
          </label>
          <input
            type="number"
            id="eventId"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter the Event ID"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-sm md:text-base font-bold mb-2 text-gray-700"
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
            <option value="Canceled">Canceled</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Create Registration"}
          </button>
        </div>
      </form>
      {qrCodeValue && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Your QR Code:</h2>
          <QRcodeGenerator value={qrCodeValue} />
        </div>
      )}
    </div>
  );
};

export default CreateRegistration;
