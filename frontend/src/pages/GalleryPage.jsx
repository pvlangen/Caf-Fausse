import React from "react";
import ModalImage from "react-modal-image";
import './GalleryPage.css'; // Import the CSS file

export default function GalleryPage() {
  const images = [
    { small: "/images/gallery-cafe-interior.webp", large: "/images/gallery-cafe-interior-large.webp", alt: "Interior view of the café" },
    { small: "/images/gallery-ribeye-steak.webp", large: "/images/gallery-ribeye-steak-large.webp", alt: "Ribeye steak served at Café Fausse" },
    { small: "/images/gallery-ceasar-salad-small.webp", large: "/images/gallery-ceasar-salad-large.webp", alt: "Menu item: Caesar Salad" },
    { small: "/images/gallery-special-event.webp", large: "/images/gallery-special-event-large.webp", alt: "Special dining event at Café Fausse" },
    
  ];

  return (
    <div style={{
      maxWidth: "900px",
      width: "100%",
      margin: "0 auto",
      padding: "16px",
      textAlign: "center"
    }}>
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
      <h1>Gallery</h1>
      <p>Photos of our interior, dishes, and events.</p>

      {images.map((image, index) => (
        <div key={index} style={{ margin: "16px 0" }}>
          <ModalImage
            small={image.small}
            large={image.large}
            alt={image.alt}
            hideDownload={true}
            hideZoom={false}
            className="gallery-image"
          />
        </div>
      ))}

      <section style={{ marginTop: "32px" }}>
        <h2>Feature Awards</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>Culinary Excellence Award – 2022</li>
          <li>Restaurant of the Year – 2023</li>
          <li>Best Fine Dining Experience – Foodie Magazine, 2023</li>
        </ul>
      </section>

      <section style={{ marginTop: "32px" }}>
        <h2>Customer Reviews</h2>
        <blockquote style={{ fontStyle: "italic", color: "#666" }}>
          "Exceptional ambiance and unforgettable flavors." – Gourmet Review
        </blockquote>
        <blockquote style={{ fontStyle: "italic", color: "#666" }}>
          "A must-visit restaurant for food enthusiasts." – The Daily Bite
        </blockquote>
      </section>
    </div>
  );
}
  