export default function AboutPage() {
    return (
      <div style={{
        maxWidth: "900px",
        width: "100%",
        margin: "0 auto",
        padding: "16px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box"
      }}>
        <img
          src="/images/logo-cafe-fausse.webp"
          alt="Café Fausse Logo"
          style={{
            maxWidth: "100px",
            width: "100%",
            height: "auto",
            margin: "0 auto 16px",
            display: "block"
          }}
        />
        <h1 style={{ fontSize: "2em", margin: "16px 0" }}>About Us</h1>
        <p style={{ fontSize: "1em", margin: "16px 0" }}>Learn more about our story, team, and vision.</p>
  
        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5em", margin: "16px 0" }}>About Café Fausse</h2>
          <p style={{ fontSize: "0.9em", margin: "16px 0" }}>
            Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez, Café Fausse blends traditional Italian flavors
            with modern culinary innovation. Our mission is to provide an unforgettable dining experience that reflects both quality and creativity.
          </p>
        </section>
  
        <section style={{ marginBottom: "32px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 style={{ fontSize: "1.5em", margin: "16px 0" }}>Our Founders</h2>
          <img
            src="/images/antonio-rossi-maria-lopez.webp"
            alt="Chef Antonio Rossi and Restaurateur Maria Lopez"
            style={{
              width: "100%",
              maxWidth: "200px",
              height: "auto",
              borderRadius: "100px",
              objectFit: "cover",
              marginBottom: "16px"
            }}
          />
          <p style={{ fontSize: "0.9em", margin: "16px 0" }}>
            <strong>Chef Antonio Rossi</strong> honed his culinary skills in the bustling kitchens of Italy, where he developed a passion for traditional flavors and innovative techniques. His dedication to excellence is evident in every dish, as he strives to create a symphony of taste and presentation.
          </p>
          <p style={{ fontSize: "0.9em", margin: "16px 0" }}>
            <strong>Maria Lopez</strong>, a visionary restaurateur, brings her expertise in hospitality and management to Café Fausse. Her commitment to creating a warm and inviting atmosphere ensures that every guest feels like part of the family.
          </p>
          <p style={{ fontSize: "0.9em", margin: "16px 0" }}>
            Together, Antonio and Maria are committed to using locally sourced ingredients to craft dishes that are not only delicious but also sustainable. Their shared vision is to offer an unforgettable dining experience that celebrates the best of Italian cuisine.
          </p>
        </section>
  
        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5em", margin: "16px 0" }}>Our Commitment</h2>
          <p style={{ fontSize: "0.9em", margin: "16px 0" }}>
            At Café Fausse, we believe in the power of excellent food to bring people together. Our commitment to using locally sourced ingredients ensures that every dish is fresh, flavorful, and supports our local community. We invite you to join us for an unforgettable dining experience that delights the senses and warms the heart.
          </p>
        </section>
  
        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5em", margin: "16px 0" }}>Opening Hours</h2>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "0.9em" }}>
            <li>Monday–Saturday: 5:00 PM – 11:00 PM</li>
            <li>Sunday: 5:00 PM – 9:00 PM</li>
          </ul>
        </section>
  
        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5em", margin: "16px 0" }}>Contact</h2>
          <p style={{ fontSize: "0.9em", margin: "16px 0" }}>
            📍 1234 Culinary Ave, Suite 100, Washington, DC 20002<br />
            📞 (202) 555-4567<br />
            ✉️ info@cafefausse.com
          </p>
        </section>
  
        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "1.5em", margin: "16px 0" }}>Find Us on the Map</h2>
          <div style={{
            borderRadius: "12px",
            overflow: "hidden",
            maxWidth: "100%",
            height: "400px",
            marginTop: "16px"
          }}>
            <iframe
              title="Café Fausse Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.0000000000005!2d-77.00000000000001!3d38.900000000000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b7b7b7b7b7b7%3A0x7b7b7b7b7b7b7b7b!2s1234%20Culinary%20Ave%2C%20Suite%20100%2C%20Washington%2C%20DC%2020002!5e0!3m2!1sen!2sus!4v1717843839391!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </div>
    );
  }
  
  