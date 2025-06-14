import { useState } from "react";
import { subscribeToNewsletter } from "../api/newsletter";

export default function NewsletterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await subscribeToNewsletter(name, email);
      if (res.error) {
        setMessage("❌ " + res.error);
      } else {
        setMessage("✅ Subscription successful!");
        setName("");
        setEmail("");
      }
    } catch (err) {
      setMessage("❌ Something went wrong.");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input 
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder="Name"
          required 
        />
      </label>
      <label>
        Email:
        <input 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          type="email" 
          placeholder="Email"
          required 
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Subscribe"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}
