import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const API_URL = "http://localhost:8000/api/v1/users";

  const decodeToken = (token) => {
    try {
      const base64Url = token.split(".")[1]; 
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); 
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((char) => `%${("00" + char.charCodeAt(0).toString(16)).slice(-2)}`)
          .join("")
      );
      const decoded = JSON.parse(jsonPayload); 
      console.log("Decoded Token:", decoded);
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
  
  const requestPasswordReset = async (email) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/password-reset/request",
        { email }
      );
      return response.data; // Handle success (even if email doesn't exist)
    } catch (error) {
      console.error("Error requesting password reset:", error);
      throw error.response?.data?.message || "Password reset request failed.";
    }
  };
  
  const verifyPasswordResetToken = async (token) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/users/password-reset/verify?auth=${token}`
      );
      return response.data; // Handle success
    } catch (error) {
      console.error("Error verifying password reset token:", error);
      throw error.response?.data?.message || "Token verification failed.";
    }
  };
  
  const updatePassword = async (token, password) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/users/password-reset/update?auth=${token}`,
        { password }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating password:", error);
      throw error.response?.data?.message || "Password update failed.";
    }
  };
  // Initialize user state on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const user = decodeToken(storedToken);
      if (user) {
        setUser(user);
        setToken(storedToken);
      }
    }
  }, []);

  // Register a new user
  const registerUser = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      const { token: newToken, user: newUser } = response.data;

      setToken(newToken);
      setUser(newUser);
      localStorage.setItem("token", newToken);

      return response.data;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error.response?.data?.message || "Registration failed.";
    }
  };

  // Login a user
  const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      setUser(response.data.user);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
  
      // Decode the token manually
      const decoded = decodeToken(response.data.token);
      console.log("Decoded Token in Login:", decoded);
  
      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error.response?.data?.message || "Login failed.";
    }
  };
  
  // Logout a user
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };


  useEffect(() => {
    const interceptor = axios.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, [token]);

  // Get all users
  const getAllUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error.response?.data?.message || "Failed to fetch users.";
    }
  };

  // Update a user by ID
  const updateUser = async (id, userData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, userData);
      return response.data.user;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error.response?.data?.message || "Failed to update user.";
    }
  };

  // Delete a user by ID
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return { message: "User deleted successfully." };
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error.response?.data?.message || "Failed to delete user.";
    }
  };


  
  
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        registerUser,
        login,
        logout,
        getAllUsers,
        updateUser,
        deleteUser,
        requestPasswordReset,
        verifyPasswordResetToken,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
