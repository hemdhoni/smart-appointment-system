import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments/my");
      setAppointments(res.data.data);
    } catch (err) {
      alert("Failed to load appointments");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const cancelAppointment = async (id) => {
    try {
      await API.delete(`/appointments/${id}`);
      fetchAppointments();
    } catch (err) {
      alert(err.response?.data?.message || "Cancellation failed");
    }
  };

  return (
    <div>
      <h2>My Appointments</h2>

      <button onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>

      <hr />

      {appointments.length === 0 ? (
        <p>No appointments booked.</p>
      ) : (
        appointments.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p>Date: {new Date(item.date).toDateString()}</p>
            <p>
              Time: {item.startTime} - {item.endTime}
            </p>

            <button onClick={() => cancelAppointment(item._id)}>
              Cancel
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default MyAppointments;