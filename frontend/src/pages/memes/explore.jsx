import React, { useEffect, useState } from "react";
import api from "../../services/api.js";
import MemeCard from "../../components/MemeCard.jsx";
import "./memes.css";

const Explore = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const res = await api.get("/memes/explore");
        setMemes(res.data.memes || []); // you may need to match the response shape
        setLoading(false);
      } catch (err) {
        console.error("Failed to load memes", err);
        setLoading(false);
      }
    };

    fetchMemes();
  }, []);

  return (
    <div className="explore-page">
      <h2>🔥 Explore Memes</h2>
      {loading ? (
        <p>Loading...</p>
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
