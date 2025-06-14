import React, { useState, useEffect } from "react";
import { makeReservation, getAvailableSlots } from "./api";

export default function ReservationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(""); // alleen datum
  const [time, setTime] = useState(""); // uur
  const [availableSlots, setAvailableSlots] = useState([]);
  const [comment, setComment] = useState("");
  const [peopleCount, setPeopleCount] = useState("");
  const [status, setStatus] = useState("");
  const [phone, setPhone] = useState("");

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

  function formatSlotLabel(timeStr) {
    const [hourStr] = timeStr.split(":");
    const hour = parseInt(hourStr, 10);
    const endHour = (hour + 1) % 24;
  
    const format = (h) => {
      const suffix = h >= 12 ? "PM" : "AM";
      const display = h % 12 === 0 ? 12 : h % 12;
      return `${display}${suffix}`;
    };
  
    return `${format(hour)} - ${format(endHour)}`;
  }

  // 🧠 Wanneer datum verandert → haal nieuwe slots op
  useEffect(() => {
    if (!date) {
      setAvailableSlots([]);
      setTime("");
      return;
    }

    const fetchSlots = async () => {
      try {
        const data = await getAvailableSlots(date, peopleCount);
        const slots = data || [];
    
        const formatted = slots.map((timeStr) => ({
          value: timeStr,
          label: formatSlotLabel(timeStr)
        }));
    
        setAvailableSlots(formatted);
        setTime("");
      } catch (err) {
        console.error("Failed to fetch time slots", err);
        setAvailableSlots([]);
      }
    };

    fetchSlots();
  }, [date, peopleCount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Reservation is being submitted...");

    try {
      const datetime = `${date}T${time}`;
      const res = await makeReservation(name, email, datetime, comment, peopleCount, phone);
      if (res.success) {
        setStatus(res.message || "Reservation successful!");
        setName("");
        setEmail("");
        setDate("");
        setTime("");
        setComment("");
        setPeopleCount("");
        setPhone("");
      } else {
        setStatus(res.error || "Reservation failed.");
      }
    } catch (err) {
      setStatus("Error during reservation.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <input placeholder="Name" value={name} onChange={handleChange(setName)} required style={inputStyle} />
      <input placeholder="E-mail" type="email" value={email} onChange={handleChange(setEmail)} required style={inputStyle} />
      <input type="number" placeholder="Number of Guests" title="Number of Guests" max="20" value={peopleCount} onChange={handleChange(setPeopleCount)} required style={inputStyle} min="1" />
      <input type="date" value={date} onChange={handleChange(setDate)} min={today} required style={inputStyle} />
      {availableSlots.length > 0 && peopleCount > 0 && (
        <select value={time} onChange={handleChange(setTime)} required style={inputStyle}>
          <option value="">Select time slot</option>
          {availableSlots.map((slot) => (
            <option key={slot.value} value={slot.value}>
              {slot.label}
            </option>
          ))}
        </select>
      )}
      <input placeholder="Phone Number (optional)" value={phone} onChange={handleChange(setPhone)} style={inputStyle} />
      <textarea placeholder="Comment (optional)" value={comment} onChange={handleChange(setComment)} style={textareaStyle} />
      <button type="submit" style={buttonStyle}>Reserve</button>
      {status && <div style={statusStyle}>{status}</div>}
    </form>
  );
}

const formStyle = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "16px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const inputStyle = {
  width: "100%",
  marginBottom: "12px",
  padding: "10px",
  boxSizing: "border-box",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const textareaStyle = {
  ...inputStyle,
  height: "80px",
  resize: "vertical",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
};

const statusStyle = {
  marginTop: "12px",
  textAlign: "center",
};