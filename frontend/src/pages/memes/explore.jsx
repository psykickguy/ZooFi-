import React, { useEffect, useState } from "react";
import api from "../../services/api.js";
import MemeCard from "../../components/MemeCard.jsx";
import "./memes.css";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import FuzzyText from "../../components/FuzzyText";
import Masonry from "./Masonry";
import { Link } from "react-router-dom";
import { NeonGradientCard } from "../../components/magicui/neon-gradient-card";
import { InteractiveHoverButton } from "../../components/magicui/interactive-hover-button";
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
import { ShineBorder } from "../../components/magicui/shine-border";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
// import { Input } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";

const categories = ["All Categories", "Animal", "Anime", "Dank"];
const memeLevels = ["All Levels", "Common", "Rare", "Epic", "Legendary"];
const sortOptions = ["Sort By", "popularity", "recent"];

const Explore = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    category: "",
    memeLevel: "",
    tags: "",
    sortBy: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const fetchMemes = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await api.get(`/memes/explore?${query}`);
      setMemes(res.data.memes || []);
    } catch (err) {
      console.error("Failed to load memes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMemes();
  };

  return (
    // <NeonGradientCard className="w-100vw h-110vh">
    <div className="explore-page" style={{ padding: "20px" }}>
      <div className="header">
        <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover={true}>
          Explore Memes
        </FuzzyText>
        <br />

        <form
          onSubmit={handleSubmit}
          className="filters"
          style={{
            marginBottom: "20px",
            backgroundColor: "red",
            gap: "1rem",
            display: "flex", // Added display
            flexWrap: "wrap", // Wrap to avoid overflow on small screens
            alignItems: "center", // Optional: Align items center
          }}
        >
          {/* <InteractiveHoverButton> */}
          <div className="inline-block">
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                // backgroundColor: "red",
                borderRadius: "5px",
                display: "inline-block",
              }}
            >
              <Select
                name="category"
                value={filters.category}
                onValueChange={(value) =>
                  handleChange({ target: { name: "category", value } })
                }
              >
                {" "}
                {/* <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} /> */}
                <SelectTrigger className="w-[180px] bg-transparent border border-gray-300 focus:outline-none shadow-none">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="Animal">Animal</SelectItem>
                    <SelectItem value="Anime">Anime</SelectItem>
                    <SelectItem value="Dank">Dank</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </motion.div>
          </div>

          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              // backgroundColor: "red",
              borderRadius: "5px",
              display: "inline-block",
            }}
          >
            <Select
              name="memeLevel"
              value={filters.memeLevel}
              onValueChange={(value) =>
                handleChange({ target: { name: "memeLevel", value } })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Levels</SelectLabel>
                  <SelectItem value="Common">Common</SelectItem>
                  <SelectItem value="Rare">Rare</SelectItem>
                  <SelectItem value="Epic">Epic</SelectItem>
                  <SelectItem value="Legendary">Legendary</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundColor: "red",
              borderRadius: "5px",
              display: "inline-block",
            }}
          >
            <Input
              type="text"
              name="tags"
              placeholder="Tags (comma-separated)"
              value={filters.tags}
              onChange={handleChange}
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundColor: "red",
              borderRadius: "5px",
              display: "inline-block",
            }}
          >
            <Select
              name="sortBy"
              value={filters.sortBy}
              onValueChange={(value) =>
                handleChange({ target: { name: "sortBy", value } })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort By</SelectLabel>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="recent">Most Recent</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundColor: "red",
              borderRadius: "5px",
              display: "inline-block",
            }}
          >
            <button type="submit">Apply Filters</button>
          </motion.div>
        </form>
      </div>

      <div className="explore-content">
        {/* <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} /> */}
        {loading ? (
          <p>Loading memes...</p>
        ) : memes.length === 0 ? (
          <p>No memes found.</p>
        ) : (
          // <div className="meme-grid">
          //   {memes.map((meme) => (
          //     <MemeCard key={meme._id} meme={meme} />
          //   ))}
          <Masonry
            data={memes.map((meme) => ({
              id: meme._id,
              height: 400,
              content: (
                <Link
                  to={`/meme/${meme._id}`}
                  key={meme._id}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    src={meme.imageUrl.url}
                    alt={meme.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "12px",
                      cursor: "pointer",
                    }}
                  />
                </Link>
              ),
            }))}
          />
        )}
      </div>
    </div>
    // </NeonGradientCard>
  );
};

export default Explore;
