"use client";

// src/pages/users/login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./auth.css"; // Assuming you have some CSS for styling
import { MagicCard } from "../../components/magicui/magic-card";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useTheme } from "next-themes";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/login", form);
      localStorage.setItem("isLoggedIn", "true");
      window.dispatchEvent(new Event("loginStatusChanged"));
      nav("/explore");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  const { theme } = useTheme();

  return (
    <Card className="auth-container p-0 max-w-sm w-full shadow-none border-none">
      <MagicCard
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        className="p-0"
      >
        <CardHeader className="border-b border-border p-4 [.border-b]:pb-4">
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="p-4">
            {/* <form> */}
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="username"
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Username"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </div>
            </div>
            {/* </form> */}
          </CardContent>
          <CardFooter className="p-4 border-t border-border [.border-t]:pt-4">
            <Button className="w-full" type="submit">
              Login
            </Button>
          </CardFooter>
        </form>
      </MagicCard>
    </Card>
  );
}
