// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import api from "../services/api.js";

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    api
      .get("/auth/check-auth")
      .then((res) => {
        setIsLoggedIn(res.data.isLoggedIn);
        setUser(res.data.user || null);
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUser(null);
      });
  }, []);

  return { isLoggedIn, user };
}
