import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Pencil, Trash } from "lucide-react"; // Import icons from lucide-react
import { format } from "date-fns";

const ManageUsers = () => {
  const { token, getAllUsers, deleteUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers || []); // Fallback to an empty array if fetchedUsers is null
      } catch (err) {
        setError(err.message || "Failed to fetch users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [getAllUsers]);

  // Handle user deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        setUsers(users.filter((user) => user.id !== id));
        alert("User deleted successfully!");
      } catch (err) {
        console.error("Error deleting user:", err);
        alert("Failed to delete user.");
      }
    }
  };

  // Define columns for DataTable
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      grow: 2, // Increase column width
      cell: (row) => <span className="truncate">{row.name}</span>, // Truncate text if too long
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      hide: "md", // Hide on mobile view
      grow: 3, // Increase column width
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
      hide: "md", // Hide on mobile view
      grow: 1, // Increase column width
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <Link
            to={`/update-user/${row.id}`}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Pencil className="h-5 w-5" />
          </Link>
          <button
            onClick={() => handleDelete(row.id)}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            <Trash className="h-5 w-5" />
          </button>
        </div>
      ),
      button: true,
      allowOverflow: true,
    },
  ];

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error fetching users: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <DataTable
        title="All Users"
        columns={columns}
        data={users}
        pagination
        highlightOnHover
        responsive
        striped
      />
    </div>
  );
};

export default ManageUsers;