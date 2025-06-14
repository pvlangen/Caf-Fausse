const BASE_URL = "http://localhost:8080";

// Subscribes a user to the newsletter
export async function subscribeToNewsletter(name, email) {
  const response = await fetch(`${BASE_URL}/newsletter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email }),
  });

  return response.json();
}

// Retrieves all subscribers
export async function getSubscribers() {
  const response = await fetch(`${BASE_URL}/subscribers`);
  return response.json();
}

// Retrieves all reservations
export async function getReservations() {
  const response = await fetch(`${BASE_URL}/reservations`);
  return response.json();
}

// Makes a new reservation
export async function makeReservation(name, email, date, comment, persons, phone) {
  try {
    const response = await fetch(`${BASE_URL}/reservations/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, date, comment, persons, phone }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || "Unknown error", details: data.details };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message || "Network error" };
  }
}

// Gets all available timeslots for a given date and number of people
export async function getAvailableSlots(date, peopleCount) {
  const response = await fetch(`${BASE_URL}/available-slots?date=${date}&peopleCount=${peopleCount}`);
  return response.json();
}

// Fetches the full menu
export async function getMenu() {
  try {
    const response = await fetch(`${BASE_URL}/menu`);
    if (!response.ok) throw new Error("Failed to fetch menu");
    return await response.json();
  } catch (err) {
    console.error("❌ Error fetching menu:", err);
    return null;
  }
}

// Adds a new item to a menu category
export async function addMenuItem(category, item) {
  const response = await fetch(`${BASE_URL}/menu/item`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category, item }),
  });
  return response.json();
}

// Deletes an item from a menu category
export async function deleteMenuItem(category, id) {
  const response = await fetch(`${BASE_URL}/menu/item`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category, id }),
  });
  return response.json();
}