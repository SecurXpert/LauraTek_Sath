// src/services/api.ts
import axios from 'axios';

const API_BASE = 'http://192.168.0.103:8000';   // <-- change if your IP/port changes

const api = axios.create({
  baseURL: API_BASE,
  timeout: 12_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Add the Bearer token to every request (except login)
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Centralised error handling – you can expand this later
 */
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message ?? err.message ?? 'Network error';
    return Promise.reject(new Error(message));
  }
);

export default api;