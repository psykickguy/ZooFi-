"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./auth.css";
import { MagicCard } from "../../components/magicui/magic-card"; // ✅ Added for card styling
import { Button } from "../../components/ui/button"; // ✅ UI Button
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"; // ✅ Card components
import { Input } from "../../components/ui/input"; // ✅ Input component
import { Label } from "../../components/ui/label"; // ✅ Label component
import { useTheme } from "next-themes"; // ✅ Theme hook for styling

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    walletAddress: "",
    password: "",
  });
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/signup", form);
      nav("/explore");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  const { theme } = useTheme(); // ✅ Theme for gradientColor

  return (
    // ✅ REPLACED old layout with Card UI
    <Card className="auth-container p-0 max-w-sm w-full shadow-none border-none">
      <MagicCard
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        className="p-0"
      >
        <CardHeader className="border-b border-border p-4 [.border-b]:pb-4">
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Create an account to mint and explore memes
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="p-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Username"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="walletAddress">Wallet Address</Label>
                <Input
                  id="walletAddress"
                  name="walletAddress"
                  value={form.walletAddress}
                  onChange={handleChange}
                  placeholder="Wallet Address"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </div>
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>
          </CardContent>
          <CardFooter className="p-4 border-t border-border [.border-t]:pt-4">
            <Button className="w-full" type="submit">
              Sign Up
            </Button>
          </CardFooter>
        </form>
      </MagicCard>
    </Card>
  );
}
