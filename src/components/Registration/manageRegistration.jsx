import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateRegistration from "./CreateRegistration";
import styled from "styled-components";
import "../../App.css";

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";
const token = localStorage.getItem("token");

const Container = styled.div`
  padding: 1rem;
  @media (min-width: 1024px) {
    padding: 2rem;
  }
  @media (min-width: 640px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;

  @media (min-width: 1024px) {
    font-size: 2rem;
  }
  @media (min-width: 640px) {
    font-size: 1.75rem;
  }
`;
const Button = styled.button`
  @media (min-width: 1024px) {
    padding: 1rem 2rem;
  }
  @media (min-width: 640px) {
    padding: 0.75rem 1.5rem;
  }
`;

const ManageRegistration = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setLoading(true);
        console.log("Token in localStorage:", localStorage.getItem("token"));

        const response = await axios.get(`${apiBaseUrl}/registrations`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("API Response:", response.data);

        // Handle both single object and array responses from the api
        if (Array.isArray(response.data)) {
          setRegistrations(response.data);
        } else if (
          typeof response.data === "object" &&
          response.data !== null
        ) {
          setRegistrations(Array.isArray(response.data) ? response.data : []);
          // setRegistrations([response.data]);
        } else {
          throw new Error(
            "Invalid response format: expected an array or object."
          );
        }
      } catch (err) {
        console.error("Error fetching registrations:", err);
        setError("Failed to fetch registrations. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  const handleRegistrationCreated = (newRegistration) => {
    setRegistrations((prev) => [...prev, newRegistration]);
    setIsFormVisible(false);
  };

  //update
  const handleUpdate = async (id) => {
    const updatedStatus = window.prompt(
      "Enter the new status for the registration (Confirmed/Canceled):"
    );
    const updatedEventId = window.prompt("Enter the new Event ID:");

    if (!updatedStatus || !updatedEventId) return;

    try {
      const payload = {
        eventId: parseInt(updatedEventId, 10),
        status: updatedStatus.charAt(0).toUpperCase() + updatedStatus.slice(1),
      };

      const response = await axios.put(
        `${apiBaseUrl}/registrations/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setRegistrations((prev) =>
        prev.map((registration) =>
          registration.id === id
            ? { ...registration, ...response.data }
            : registration
        )
      );
      alert("Registration updated successfully!");
    } catch (err) {
      console.error("Failed to update registration:", err);
      setError("Failed to update registration. Please try again.");
    }
  };

  // Handle delete action
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this registration?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${apiBaseUrl}/registrations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRegistrations((prevRegistrations) =>
        prevRegistrations.filter((registration) => registration.id !== id)
      );
      alert("Registration deleted successfully.");
    } catch (err) {
      console.error("Failed to delete registration:", err);
      setError("Failed to delete registration. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Container className="container">
      <div className="p-4 lg:p-8">
        <Title className="text-2xl lg:text-3xl font-bold mb-6">
          Registrations
        </Title>
        <Button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4 transition-all duration-200"
        >
          {isFormVisible ? "Close Form" : "Create New Registration"}
        </Button>
        {isFormVisible && (
          <CreateRegistration
            onRegistrationCreated={handleRegistrationCreated}
          />
        )}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Loading State */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className=" table-container bg-white shadow-md rounded border">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-2 sm:px-4 py-2">User Name</th>
                  <th className="border px-2 sm:px-4 py-2">User ID</th>

                  <th className="border px-2 sm:px-4 py-2">Status</th>
                  <th className="border px-2 sm:px-4 py-2">Created At</th>

                  <th className="border px-2 sm:px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {registrations.length > 0 ? (
                  registrations.map((registration) => (
                    <tr key={registration.id} className="hover:bg-gray-100">
                      <td className="border px-2 sm:px-4 py-2">
                        {registration.eventId || "N/A"}
                      </td>
                      <td className="border px-2 sm:px-4 py-2">
                        {registration.UserId || "N/A"}
                      </td>
                      <td className="border px-2 sm:px-4 py-2">
                        {registration.status || "N/A"}
                      </td>
                      <td className="border px-2 sm:px-4 py-2">
                        {registration.createdAt
                          ? new Date(registration.createdAt).toLocaleString()
                          : "N/A"}
                      </td>
                      <td className="border px-2 sm:px-4 py-2">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() =>
                              handleUpdate(
                                registration.id,
                                registration.status,
                                registration.event_id
                              )
                            }
                            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                          >
                            Update
                          </button>

                          <Button
                            onClick={() => handleDelete(registration.id)}
                            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center text-gray-500 py-4">
                      No registrations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ManageRegistration;
