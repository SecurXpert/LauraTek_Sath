// src/api/instance.ts
import axios from "axios";

export const BASE_URL = "http://192.168.0.105:8000"; // Change in dev/prod as needed

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