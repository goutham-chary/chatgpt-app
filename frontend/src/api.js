import { API_BASE_URL } from './types';

export const api = {
  async getSessions() {
    const res = await fetch(`${API_BASE_URL}/api/sessions`);
    return res.json();
  },

  async createSession(title) {
    const res = await fetch(`${API_BASE_URL}/api/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    return res.json();
  },

  async getSessionHistory(sessionId) {
    const res = await fetch(`${API_BASE_URL}/api/sessions/${sessionId}/history`);
    return res.json();
  },

  async sendMessage(sessionId, message) {
    const res = await fetch(`${API_BASE_URL}/api/sessions/${sessionId}/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    return res.json();
  },
};
