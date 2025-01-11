import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageRegistration = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8000/api/v1/registrations",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("API Response:", response.data);

        // Handle both single object and array responses from the api
        if (Array.isArray(response.data)) {
          setRegistrations(response.data);
        } else if (
          typeof response.data === "object" &&
          response.data !== null
        ) {
          setRegistrations([response.data]);
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

  // Handle delete action
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this registration?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/api/v1/registrations/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Registrations</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded border">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-4 py-2">User Name</th>
              <th className="border px-4 py-2">User Email</th>
              <th className="border px-4 py-2">Event Name</th>
              <th className="border px-4 py-2">Event Date</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Payment Status</th>
              <th className="border px-4 py-2">Notes</th>
              <th className="border px-4 py-2">Check-in Time</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.length > 0 ? (
              registrations.map((registration) => (
                <tr key={registration.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{registration.user_name}</td>
                  <td className="border px-4 py-2">
                    {registration.user_email}
                  </td>
                  <td className="border px-4 py-2">
                    {registration.event_name}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(registration.event_date).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">{registration.status}</td>
                  <td className="border px-4 py-2">
                    {registration.payment_status || "N/A"}
                  </td>
                  <td className="border px-4 py-2">
                    {registration.notes || "N/A"}
                  </td>
                  <td className="border px-4 py-2">
                    {registration.check_in_time
                      ? new Date(registration.check_in_time).toLocaleString()
                      : "N/A"}
                  </td>
                  <td className="border px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => handleDelete(registration.id)}
                      className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
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
    </div>
  );
};

export default ManageRegistration;
