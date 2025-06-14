const BASE_URL = "http://localhost:8080";

export async function makeReservation(name, email, date, comment, persons, phone) {
  const response = await fetch(`${BASE_URL}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, date, comment, persons, phone }),
  });
  return response.json();
}

export async function getReservations() {
  const response = await fetch(`${BASE_URL}/reservations`);
  return response.json();
}
