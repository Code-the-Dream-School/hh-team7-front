import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import axios from "axios";

const CheckIn = () => {
  const [eventDetails, setEventDetails] = useState(null);

  const handleScan = async (result) => {
    if (result) {
      try {
        const qrData = JSON.parse(decodeURIComponent(result.text));
        const { eventId } = qrData;

        const response = await axios.get(`${API_BASE_URL}/events/${eventId}`);
        setEventDetails(response.data);
        alert("Check-in successful!");
      } catch (err) {
        console.error("Error checking in:", err);
      }
    }
  };

  return (
    <div>
      <h2>Event Check-In</h2>
      <QrReader
        onResult={(result, error) => {
          if (result) handleScan(result);
          if (error) console.error(error);
        }}
      />
      {eventDetails && (
        <div>
          <h3>Event Details</h3>
          <p>{eventDetails.name}</p>
          <p>{eventDetails.location}</p>
          <p>{new Date(eventDetails.date).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default CheckIn;