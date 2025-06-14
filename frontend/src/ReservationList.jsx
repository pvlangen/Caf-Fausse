import React, { useEffect, useState } from "react";
import { getReservations } from "./api";

export default function ReservationList() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    getReservations().then(setReservations).catch(console.error);
  }, []);

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>📋 Reservations Overview</h2>
      {reservations.length === 0 ? (
        <p>No reservations yet.</p>
      ) : (
        <div style={gridStyle}>
          {reservations.map((r, i) => (
            <div key={i} style={cardStyle}>
              <div style={headerStyle}>
                <strong>{r.name}</strong> ({r.email})
              </div>
              <div style={infoStyle}>
                <span>🕒 {r.date ? new Date(r.date).toLocaleString() : "No date"}</span><br />
                <span>👥 {r.persons} people</span><br />
                <span>🍽️ Table {r.table_number ?? "—"}</span><br />
                {r.comment && <em>💬 {r.comment}</em>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const containerStyle = {
  maxWidth: "900px",
  margin: "2rem auto",
  padding: "1rem",
  fontFamily: "Arial, sans-serif",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "1.5rem",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "1rem",
};

const cardStyle = {
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "1rem",
  backgroundColor: "#fdfdfd",
  boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
};

const headerStyle = {
  fontSize: "1.1rem",
  marginBottom: "0.5rem",
};

const infoStyle = {
  color: "#333",
  lineHeight: "1.4",
};