export default function HomePage() {
  return (
    <div style={{
      maxWidth: "900px",
      width: "100%",
      margin: "0 auto",
      padding: "16px",
      textAlign: "center",
      boxSizing: "border-box"
    }}>
      <img
        src="/images/logo-cafe-fausse.webp"
        alt="Café Fausse Logo"
        style={{
          maxWidth: "200px",
          width: "100%",
          height: "auto",
          margin: "24px auto 16px",
          display: "block"
        }}
      />
      <h1 style={{ fontSize: "2em", margin: "16px 0" }}>Welcome to Café Fausse!</h1>
      <p style={{ fontSize: "1em", margin: "16px 0" }}>Experience refined elegance, warm ambiance, and exquisite dining.</p>
      <img
        src="/images/home-cafe-fausse.webp"
        alt="Interior"
        style={{
          width: "100%",
          height: "auto",
          margin: "24px auto",
          borderRadius: "12px",
          display: "block"
        }}
      />

      <section style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "1.5em", margin: "16px 0" }}>Contact Information</h2>
        <p style={{ fontSize: "0.9em", margin: "16px 0" }}>
          📍 1234 Culinary Ave, Suite 100, Washington, DC 20002<br />
          📞 (202) 555-4567<br />
          ✉️ info@cafefausse.com
        </p>
      </section>

      <section style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "1.5em", margin: "16px 0" }}>Opening Hours</h2>
        <ul style={{ listStyle: "none", padding: 0, fontSize: "0.9em" }}>
          <li>Monday–Saturday: 5:00 PM – 11:00 PM</li>
          <li>Sunday: 5:00 PM – 9:00 PM</li>
        </ul>
      </section>
    </div>
  );
}
