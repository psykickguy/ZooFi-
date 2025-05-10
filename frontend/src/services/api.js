// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/", // all your auth routes live under /api
  withCredentials: true, // send cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
