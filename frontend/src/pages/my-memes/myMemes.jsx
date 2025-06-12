import React, { useEffect, useState } from "react";
import axios from "axios";
import FuzzyText from "../../components/FuzzyText";
import "./memes.css";
import Masonry from "../memes/Masonry";
import { Link } from "react-router-dom";

function MyMemes() {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/my-memes`,
          {
            withCredentials: true,
          }
        );
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
      {/* <h1></h1> */}
      <FuzzyText baseIntensity={0.2} hoverIntensity={0.5} enableHover={true}>
        My Memes
      </FuzzyText>
      <br />

      {memes.length === 0 ? (
        <p>You haven’t minted or bought any memes yet.</p>
      ) : (
        <div className="meme-grid">
          <Masonry
            data={memes.map((meme) => ({
              id: meme._id,
              height: 400,
              image: meme.imageUrl?.url || "/fallback.jpg",
              content: (
                <Link
                  to={`/meme/${meme._id}`}
                  key={meme._id}
                  style={{ textDecoration: "none" }}
                >
                  <img
                    src={meme.imageUrl?.url || "/fallback.jpg"}
                    alt={meme.title || "meme"}
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
        </div>
      )}
    </div>
  );
}

export default MyMemes;
