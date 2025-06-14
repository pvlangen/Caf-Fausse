import React, { useState } from "react";
import { makeReservation } from "./api";

export default function ReservationForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    people: 1,
    comment: "",
    phone: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setHasInteracted(true);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    console.log("Submitting reservation:", form);
    try {
      const res = await makeReservation(form.name, form.email, form.date, form.comment, form.people, form.phone);
      console.log("API response:", res);
      if (res.success) {
        setMessage("✅ Reservation successfully submitted!");
        setForm({ name: "", email: "", date: "", time: "", people: 1, comment: "", phone: "" });
        setHasInteracted(false);
      } else {
        setMessage("❌ Error: " + (res.error || "Unknown error occurred."));
      }
    } catch (err) {
      console.error("Error submitting reservation:", err);
      setMessage("❌ Error submitting reservation.");
    }
    setLoading(false);
  };

  const isFormValid = form.name.trim() !== "" && form.email.trim() !== "" && form.date.trim() !== "";

  const isReservationDateValid = () => {
    const reservationDateTime = new Date(`${form.date}T${form.time}`);
    const now = new Date();
    const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    return reservationDateTime >= twoHoursFromNow;
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reservatie</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input type="date" name="date" value={form.date} onChange={handleChange} required />
      <input type="time" name="time" value={form.time} onChange={handleChange} required />
      <input type="number" name="people" value={form.people} min="1" onChange={handleChange} />
      <input type="text" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
      <textarea name="comment" placeholder="Comment" value={form.comment} onChange={handleChange} />
      {hasInteracted && isFormValid && isReservationDateValid() && (
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Reserve"}
        </button>
      )}
      {message && <p style={{ color: message.includes("✅") ? "green" : "red" }}>{message}</p>}
    </form>
  );
}