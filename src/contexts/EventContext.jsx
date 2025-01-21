import React, { createContext, useState } from "react";
import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
  
    const API_URL = `${apiBaseUrl}/events`;
  
    // Fetch all events
    const getMyEvents = async () => {
      try {
        const response = await axios.get(API_URL + '/my-events', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching events:", error);
        throw error.response.data.message;
      }
    };
  
    // Create a new event
    const createEvent = async (eventData) => {
        try {
          const response = await axios.post(
            `${apiBaseUrl}/events`, 
            eventData,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Add any required headers
              },
              withCredentials: true, // Enable cookies for this request
            }
          );
          return response.data; // Return the response data from the API
        } catch (error) {
          console.error("Error creating event:", error);
          throw error.response?.data?.message || "Failed to create event.";
        }
      };
  
    // Update an existing event
    const updateEvent = async (id, updateData) => {
      try {
        const response = await axios.put(`${API_URL}/${id}`, updateData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error updating event:", error);
        throw error.response.data.message;
      }
    };
  
    // Delete an event
    const deleteEvent = async (id) => {
      try {
        await axios.delete(`${API_URL}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Error deleting event:", error);
        throw error.response.data.message;
      }
    };
  
    return (
      <EventContext.Provider
        value={{
          user,
          token,
          getMyEvents,
          createEvent,
          updateEvent,
          deleteEvent,
        }}
      >
        {children}
      </EventContext.Provider>
    );
  };
  