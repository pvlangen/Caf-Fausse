import React, { useEffect, useState } from "react";
import { getMenu } from "../api";

// fallback in case API fails
const fallbackMenu = {
  intro: "Discover our gourmet selections crafted for the discerning palate.",
  starters: [
    { title: "Bruschetta", description: "Fresh tomatoes, basil, olive oil, and toasted baguette slices", price: 8.5 },
    { title: "Caesar Salad", description: "Crisp romaine with homemade Caesar dressing", price: 9.0 },
  ],
  main_courses: [
    { title: "Grilled Salmon", description: "Served with lemon butter sauce and seasonal vegetables", price: 22.0 },
    { title: "Ribeye Steak", description: "12 oz prime cut with garlic mashed potatoes", price: 28.0 },
    { title: "Vegetable Risotto", description: "Creamy Arborio rice with wild mushrooms", price: 18.0 },
  ],
  desserts: [
    { title: "Tiramisu", description: "Classic Italian dessert with mascarpone", price: 7.5 },
    { title: "Cheesecake", description: "Creamy cheesecake with berry compote", price: 7.0 },
  ],
  beverages: [
    { title: "Red Wine (Glass)", description: "A selection of Italian reds", price: 10.0 },
    { title: "White Wine (Glass)", description: "Crisp and refreshing", price: 9.0 },
    { title: "Craft Beer", description: "Local artisan brews", price: 6.0 },
    { title: "Espresso", description: "Strong and aromatic", price: 3.0 },
  ],
};

export default function MenuPage() {
  const [menu, setMenu] = useState(fallbackMenu);

  useEffect(() => {
    (async () => {
      const fetched = await getMenu();
      if (fetched) setMenu(fetched);
    })();
  }, []);

  const categoryMap = {
    starters: "Starters",
    main_courses: "Main Courses",
    desserts: "Desserts",
    beverages: "Beverages",
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px", textAlign: "center" }}>
      <img
        src="/images/logo-cafe-fausse.webp"
        alt="Café Fausse Logo"
        style={{
          maxWidth: "100px",
          width: "100%",
          height: "auto",
          margin: "0 auto 16px",
          display: "block",
        }}
      />
      <h1>Our Menu</h1>
      <p style={{ marginBottom: "32px" }}>{menu.intro || fallbackMenu.intro}</p>

      {Object.entries(categoryMap).map(([key, label]) => (
        <section key={key} style={{ marginBottom: "40px" }}>
          <h2 style={{ borderBottom: "1px solid #ccc", paddingBottom: "8px" }}>{label}</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {menu[key]?.map((item) => (
              <li key={item.id || item.title} style={{ marginBottom: "16px" }}>
                <div style={{ fontWeight: "bold" }}>
                  {item.title}
                  <span style={{ float: "right" }}>${parseFloat(item.price).toFixed(2)}</span>
                </div>
                <div style={{ fontStyle: "italic", color: "#666" }}>{item.description}</div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}