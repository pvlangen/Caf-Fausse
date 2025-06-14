const BASE_URL = "http://localhost:8080";

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

export async function getSubscribers() {
  const response = await fetch(`${BASE_URL}/subscribers`);
  return response.json();
}
