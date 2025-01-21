import React, { useEffect, useState, useContext } from "react";
import { EventContext } from "../../contexts/EventContext";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { format } from "date-fns";
import { Pencil, Trash } from "lucide-react"; // Importing icons from lucide-react

const ManageEvents = () => {
  const { getMyEvents, deleteEvent } = useContext(EventContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await getMyEvents();
        setEvents(fetchedEvents || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, [getMyEvents]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(id);
        setEvents(events.filter((event) => event.id !== id));
        alert("Event deleted successfully!");
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Failed to delete event.");
      }
    }
  };

  const columns = [
    { name: "Event Name", selector: (row) => row.name, sortable: true, wrap: true },
    { name: "Event Description", selector: (row) => row.description, sortable: true, $hide: "md" },
    { name: "Location", selector: (row) => row.location, sortable: true, $hide: "md" },
    { name: "Capacity", selector: (row) => row.capacity, sortable: true, $hide: "md" },
    { name: "Event Date", selector: (row) => format(new Date(row.date), "MM/dd/yyyy h:mm a"), sortable: true, wrap: true },
    { name: "Event Type", selector: (row) => row.eventType, sortable: true, $hide: "md" },
    { name: "Event Status", selector: (row) => row.status, sortable: true, $hide: "md" },
    { name: "Actions", cell: (row) => (
      <div className="flex gap-2">
        <Link
          to={`/update-event/${row.id}`}
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
    ), ignoreRowClick: true},
  ];

  if (loading) return <div>Loading events...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Events</h1>
      <Link
        to="/create-event"
        className="inline-block px-4 py-2 mb-6 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
        style={{ whiteSpace: "nowrap" }}
      >
        Create New Event
      </Link>

      <div className="overflow-x-auto">
        <DataTable
          title="All Events"
          columns={columns}
          data={events}
          pagination
          highlightOnHover
          responsive
        />
      </div>
    </div>
  );
};

export default ManageEvents;