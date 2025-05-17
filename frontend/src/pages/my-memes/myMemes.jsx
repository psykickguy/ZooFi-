import React, { useEffect, useState } from "react";
import axios from "axios";

function MyMemes() {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/my-memes", {
          withCredentials: "include",
        });
        console.log("Fetched my memes:", res.data);
        setMemes(res.data.memes || []);
      } catch (err) {
        console.error("Error fetching memes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMemes();
  }, []);

  if (loading) return <p>Loading your memes...</p>;

  return (
    <div className="myMemes">
      <h1>My Memes</h1>

      {memes.length === 0 ? (
        <p>You haven’t minted or bought any memes yet.</p>
      ) : (
        <div className="meme-grid">
          {memes.map((meme) => (
            <div key={meme._id} className="meme-card">
              <img src={meme.imageUrl?.url} alt={meme.title} width="200" />
              <h3>{meme.title}</h3>
              <p>{meme.description}</p>
              <p>
                <strong>Category:</strong> {meme.category}
              </p>
              <p>
                <strong>Level:</strong> {meme.memeLevel}
              </p>
              <p>
                <strong>Minted At:</strong>{" "}
                {new Date(meme.mintedAt).toDateString()}
              </p>
              <div className="meme-actions">
                <a href={`/memes/${meme._id}`}>View</a>
                <a href={`/memes/${meme._id}/edit`}>Edit</a>
                <a href={`/memes/${meme._id}/sell`}>Sell</a>
                <a href={`/memes/${meme._id}/transfer`}>Transfer</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyMemes;
