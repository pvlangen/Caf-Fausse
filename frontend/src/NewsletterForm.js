// src/NewsletterForm.js
import React, { useState } from "react";
import { subscribeToNewsletter } from "./api"; // als je api.js hebt

export default function NewsletterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await subscribeToNewsletter(name, email);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required />
      <button type="submit">Subscribe</button>
      {status === "success" && <div>Subscription successful!</div>}
      {status === "error" && <div>Error during subscription.</div>}
    </form>
  );
}
