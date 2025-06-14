import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ setIsLoggedIn }) {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "admin123") {
      setIsLoggedIn(true);
      navigate("/admin");
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "24px" }}>
      <h2>Admin Login</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter admin password"
        style={{ padding: "8px", width: "100%", marginBottom: "12px" }}
      />
      <button onClick={handleLogin} style={{ padding: "8px 16px" }}>
        Login
      </button>
    </div>
  );
}