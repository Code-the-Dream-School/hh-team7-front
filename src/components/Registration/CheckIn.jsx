import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import axios from "axios";

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

const CheckIn = () => {
  const [scanResult, setScanResult] = useState(null);

  const handleScan = async (result) => {
    if (result) {
      try {
        const response = await axios.post(`${apiBaseUrl}/check-in`, {
          qrCodeData: result,
        });
        alert("Check-in successful!");
        console.log(response.data);
      } catch (err) {
        console.error("Check-in error:", err);
      }
    }
  };

  return (
    <div>
      <h2>Event Check-In</h2>
      <QrReader
        onResult={(result, error) => {
          if (result) handleScan(result.text);
          if (error) console.error(error);
        }}
      />
      {scanResult && <p>Scanned Data: {scanResult}</p>}
    </div>
  );
};

export default CheckIn;
