import React, { useState, useEffect } from "react";
import axios from "axios";

function Summary() {
  const styles = {
    container: {
      margin: "100px auto",
      maxWidth: "600px",
      padding: "20px",
      backgroundColor: "#f7f7f7",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    },
    heading: {
      textAlign: "center",
      fontSize: "24px",
      marginBottom: "20px",
      color: "#333",
    },
    list: {
      listStyleType: "none",
      padding: 0,
    },
    listItem: {
      backgroundColor: "#fff",
      padding: "15px",
      margin: "10px 0",
      borderRadius: "5px",
      boxShadow: "0 1px 5px rgba(0, 0, 0, 0.1)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    subject: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#333",
    },
    time: {
      fontSize: "14px",
      color: "#666",
    },
  };
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await axios.get("http://localhost:5000/appointments");
      setAppointments(response.data);
    };
    fetchAppointments();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}> Appointments</h2>
      <ul style={styles.list}>
        {appointments.map((appt) => (
          <li key={appt.Id} style={styles.listItem}>
            <span style={styles.subject}>{appt.Subject}</span>
            <span style={styles.time}>
              {new Date(appt.StartTime).toLocaleString()} -{" "}
              {new Date(appt.EndTime).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Summary;
