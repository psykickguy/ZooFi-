import React, { useEffect, useState } from "react";
import api from "../../services/api.js";
import MemeCard from "../../components/MemeCard.jsx";
import "./memes.css";

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
    <div className="explore-page" style={{ padding: "20px" }}>
      <h2>🔥 Explore Memes</h2>

      <form
        onSubmit={handleSubmit}
        className="filters"
        style={{ marginBottom: "20px" }}
      >
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
        >
          <option value="">All Categories</option>
          <option value="Animal">Animal</option>
          <option value="Anime">Anime</option>
          <option value="Dank">Dank</option>
        </select>

        <select
          name="memeLevel"
          value={filters.memeLevel}
          onChange={handleChange}
        >
          <option value="">All Levels</option>
          <option value="Common">Common</option>
          <option value="Rare">Rare</option>
          <option value="Epic">Epic</option>
          <option value="Legendary">Legendary</option>
        </select>

        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={filters.tags}
          onChange={handleChange}
        />

        <select name="sortBy" value={filters.sortBy} onChange={handleChange}>
          <option value="">Sort By</option>
          <option value="popularity">Most Popular</option>
          <option value="recent">Most Recent</option>
        </select>

        <button type="submit">Apply Filters</button>
      </form>

      {loading ? (
        <p>Loading memes...</p>
      ) : memes.length === 0 ? (
        <p>No memes found.</p>
      ) : (
        <div className="meme-grid">
          {memes.map((meme) => (
            <MemeCard key={meme._id} meme={meme} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;
