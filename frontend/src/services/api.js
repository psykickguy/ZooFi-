import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // Adjust if needed
});

export default api;
