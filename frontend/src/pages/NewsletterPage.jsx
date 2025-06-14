import NewsletterForm from "../NewsletterForm";

export default function NewsletterPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
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
      <h1 style={{ textAlign: "center" }}>Newsletter Subscription</h1>
      <p style={{ textAlign: "center" }}>
        Subscribe to stay informed about special events, menu updates, and more.
      </p>

      <div style={{
        margin: "32px 0",
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        backgroundColor: "#f9f9f9"
      }}>
        <h2 style={{ textAlign: "center" }}>Sign Up</h2>
        <NewsletterForm />
      </div>
    </div>
  );
}
