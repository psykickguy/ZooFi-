import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../../services/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null until checked
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/api/status");
        setIsLoggedIn(res.data.isLoggedIn);
        setUser(res.data.user || null);
      } catch (err) {
        console.error("Auth check failed", err);
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
