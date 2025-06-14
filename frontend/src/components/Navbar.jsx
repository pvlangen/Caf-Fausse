import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ isLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">Café Fausse</div>
      
      <button className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/reservations">Reservations</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/gallery">Gallery</Link></li>
        <li><Link to="/newsletter">Newsletter</Link></li>
        {isLoggedIn
          ? <li><Link to="/admin">Admin</Link></li>
          : <li><Link to="/login">Login</Link></li>
        }
      </ul>
    </nav>
  );
}

const linkStyle = {
  color: "white",
  margin: "0 12px",
  textDecoration: "none",
  fontWeight: "bold"
};
