import React from "react";
import ReservationForm from "../ReservationForm";

export default function ReservationsPage() {
  return (
    <div style={{ maxWidth: "900px", width: "100%", margin: "0 auto", padding: "16px", textAlign: "center" }}>
      <img
        src="/images/logo-cafe-fausse.webp"
        alt="Café Fausse Logo"
        style={{
          maxWidth: "100px", // Adjust size to match the MenuPage
          width: "100%",
          height: "auto",
          margin: "0 auto 16px",
          display: "block"
        }}
      />
      <h1>Reservations</h1>
      <ReservationForm />
    </div>
  );
}