// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/",
  withCredentials: true, // send cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
