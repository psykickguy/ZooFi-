import React from "react";
import { Link } from "react-router-dom";

const MemeCard = ({ meme }) => {
  return (
    <div className="meme-card">
      <img src={meme.imageUrl} alt={meme.title} />
      <h4>{meme.title}</h4>
      <p>
        🔥 {meme.popularityScore} • {meme.category}
      </p>
      <Link to={`/meme/${meme._id}`}>View</Link>
    </div>
  );
};

export default MemeCard;
