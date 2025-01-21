import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

const API_URL = `${apiBaseUrl}/public-events?page=1&limit=10`;


export const fetchEvents = async (page = 1, limit = 10, category = "", search = "") => {
    try {
      const response = await axios.get(API_URL, {
        params: { page, limit, category, search },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  };
  
  