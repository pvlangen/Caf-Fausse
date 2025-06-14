import React, { useEffect, useState } from "react";
import { getMenu, addMenuItem, deleteMenuItem } from "./api";

export default function MenuEditor() {
  const [menu, setMenu] = useState(null);
  const [newItems, setNewItems] = useState({});
  const [error, setError] = useState(null);

  const categoryLabels = {
    starters: "Starters",
    main_courses: "Main Courses",
    desserts: "Desserts",
    beverages: "Beverages",
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await getMenu();
    if (data) setMenu(data);
  };

  const handleInputChange = (category, field, value) => {
    setNewItems(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const handleAdd = async (category) => {
    const item = newItems[category];
    if (!item || !item.title || !item.description || !item.price) {
      setError("All fields are required.");
      return;
    }

    setError(null);
    const response = await addMenuItem(category, item);
    if (!response.error) {
      setNewItems(prev => ({ ...prev, [category]: {} }));
      fetchMenu();
    } else {
      setError(response.error || "Failed to add item.");
    }
  };

  const handleDelete = async (category, id) => {
    const response = await deleteMenuItem(category, id);
    setMenu(prevMenu => ({
      ...prevMenu,
      [category]: prevMenu[category].filter(item => item.id !== id),
    }));
  };

  if (!menu) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px" }}>
      <h1 style={{ textAlign: "center" }}>🍽️ Edit Menu</h1>
      {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}

      {Object.entries(categoryLabels).map(([key, label]) => (
        <section key={key} style={{ marginBottom: "40px" }}>
          <h2>{label}</h2>

          {/* Menu Table */}
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "16px" }}>
            <thead>
              <tr>
                <th align="left">Title</th>
                <th align="left">Description</th>
                <th align="right">Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {(menu[key] || []).map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td align="right">${parseFloat(item.price).toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(key, item.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "red",
                        fontSize: "1.2rem",
                        cursor: "pointer"
                      }}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add Item Form */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
            <input
              placeholder="Title"
              value={newItems[key]?.title || ""}
              onChange={(e) => handleInputChange(key, "title", e.target.value)}
              style={{ flex: 2 }}
            />
            <input
              placeholder="Description"
              value={newItems[key]?.description || ""}
              onChange={(e) => handleInputChange(key, "description", e.target.value)}
              style={{ flex: 4 }}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Price"
              value={newItems[key]?.price || ""}
              onChange={(e) => handleInputChange(key, "price", e.target.value)}
              style={{ flex: 1 }}
            />
            <button onClick={() => handleAdd(key)} style={{ flexShrink: 0 }}>
              ➕
            </button>
          </div>
        </section>
      ))}
    </div>
  );
}