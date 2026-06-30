// src/api/instance.ts
import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL; // Change in dev/prod as needed

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Global loading toast / spinner can be added here later
// api.interceptors.request.use(...)
// api.interceptors.response.use(...)

export default api;
