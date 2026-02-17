// Minimal API client for backend communication.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.error || 'Something went wrong.');
  }

  return response.json();
}

export function sendChatMessage(message, userId = 'demo-user') {
  return request('/chat', {
    method: 'POST',
    body: JSON.stringify({ message, userId })
  });
}

export function fetchWeeklyMoods(userId = 'demo-user') {
  return request(`/moods/weekly?userId=${encodeURIComponent(userId)}`);
}

export function saveJournal(entry, userId = 'demo-user') {
  return request('/journal', {
    method: 'POST',
    body: JSON.stringify({ entry, userId })
  });
}

export function fetchRecentJournal(userId = 'demo-user') {
  return request(`/journal/recent?userId=${encodeURIComponent(userId)}`);
}
