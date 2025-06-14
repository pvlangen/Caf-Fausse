import React, { useEffect, useState } from "react";
import { getSubscribers } from "./api";

export default function SubscribersList() {
  const [subscribers, setSubscribers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSubscribers()
      .then(setSubscribers)
      .catch(err => {
        console.error("Error fetching subscribers:", err);
        setError("⚠️ Could not fetch the list of subscribers");
      });
  }, []);

  if (error) {
    return <div style={errorStyle}>{error}</div>;
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>📬 Newsletter Subscribers</h2>
      {subscribers.length === 0 ? (
        <p>No subscribers yet.</p>
      ) : (
        <div style={gridStyle}>
          {subscribers.map((subscriber) => (
            <div key={subscriber.id} style={cardStyle}>
              <div style={infoStyle}>
                <strong>{subscriber.name}</strong>
                <br />
                <span>{subscriber.email}</span>
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

const infoStyle = {
  color: "#333",
  lineHeight: "1.4",
};

const errorStyle = {
  textAlign: "center",
  color: "red",
  padding: "1rem",
};