import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

export const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const API_URL = `${apiBaseUrl}`;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Create a new registration
  const createRegistration = async (registrationData) => {
    if (!token) {
      throw new Error("Token is missing. Please log in.");
    }

    try {
      const response = await axios.post(
        `${API_URL}/registrations`,
        registrationData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating registration:", error);
      throw error;
    }
  };

  return (
    <UserAuthContext.Provider value={{ token, createRegistration }}>
      {children}
    </UserAuthContext.Provider>
  );
};
