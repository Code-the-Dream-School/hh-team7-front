import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserAuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const API_URL = "http://localhost:8000/api/v1";

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          await axios.get(`${API_URL}/validate-token`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch (err) {
          console.error("Token is invalid, logging out user.");
          setToken(null);
          localStorage.removeItem("token");
        }
      }
    };
    validateToken();
  }, [token]);

  // Create a new registration
  const createRegistration = async (registrationData) => {
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
  };

  return (
    <UserAuthContext.Provider value={{ token, createRegistration }}>
      {children}
    </UserAuthContext.Provider>
  );
};
