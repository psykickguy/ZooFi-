import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./memes.css";
import FuzzyText from "../../components/FuzzyText";
import { NeonGradientCard } from "../../components/magicui/neon-gradient-card";
import DecryptedText from "./DecryptedText";

function MemeDetails() {
  const { id } = useParams(); // ✅ Get ID from route

  const [meme, setMeme] = useState([]);
  const [creator, setCreator] = useState([]);
  const [mintHistory, setMintHistory] = useState([]);
  const [listing, setListing] = useState([]);

  useEffect(() => {
    const fetchMeme = async () => {
      try {
        const res = await fetch(`http://localhost:8080/memes/${id}`); // ✅ inject id
        if (!res.ok) throw new Error(await res.text()); // handle non-JSON errors
        const data = await res.json();
        setMeme(data.meme);
        setCreator(data.creator);
        setMintHistory(data.mintHistory);
        setListing(data.listing);
      } catch (err) {
        console.error("Failed to fetch Meme:", err);
      }
    };
    fetchMeme();
  }, []);

  return (
    <div className="meme-page">
      <div className="header">
        <div
          style={{
            fontFamily: "Bangers, cursive",
            fontSize: "2.5rem",
            fontWeight: "bold",
            // textAlign: "center", // uncomment if needed
          }}
        >
          {meme?.title || "Untitled Meme"}
        </div>
        {/* <h1>🤘 {meme?.title || "Untitled Meme"} 🤘</h1> */}
      </div>
      <br />
      <div className="meme-content">
        {/* <NeonGradientCard className="w-full h-full"> */}
        <img
          src={meme?.imageUrl?.url}
          alt="Meme"
          style={{
            width: "30vw",
            height: "auto",
            // height: "60vh",
            borderRadius: "15px",
            marginBottom: "20px",
            zIndex: 998,
          }}
        />
        {/* </NeonGradientCard> */}
        <div className="meme-details">
          <div className="creator">
            @{meme?.creatorId?.username || "Unknown"}
          </div>
          <div className="description">{meme?.description}</div>
          <br />
          {/* <p></p> */}
          <div
            style={{
              fontFamily: "'Galindo', cursive",
              fontSize: "1.15rem",
              fontWeight: 500,
              marginBottom: "1rem",
              paddingLeft: "1rem",
            }}
          >
            Category:
            <span
              style={{
                fontFamily: "'Galindo', cursive",
                fontSize: "1.15rem",
                fontWeight: 500,
                marginLeft: "0.25rem",
                // marginBottom: "0.25rem",
                padding: "0.25rem 1.25rem",
                borderRadius: "100rem",
                backgroundColor: "#f0554d",
                border: "1px solid #222",
              }}
            >
              {meme?.category}
            </span>
          </div>
          <div
            style={{
              fontFamily: "'Galindo', cursive",
              fontSize: "1.15rem",
              fontWeight: 500,
              marginBottom: "1rem",
              paddingLeft: "1rem",
            }}
          >
            Rarity:
            <span
              style={{
                fontFamily: "'Galindo', cursive",
                fontSize: "1.15rem",
                fontWeight: 500,
                marginLeft: "0.25rem",
                // marginBottom: "0.25rem",
                padding: "0.25rem 1.25rem",
                borderRadius: "100rem",
                backgroundColor: "#f0554d",
                border: "1px solid #222",
              }}
            >
              {meme?.memeLevel}
            </span>
          </div>
          <div
            style={{
              fontFamily: "'Galindo', cursive",
              fontSize: "1.15rem",
              fontWeight: 500,
              marginBottom: "1rem",
              paddingLeft: "1rem",
            }}
          >
            Popularity:
            <span
              style={{
                fontFamily: "'Galindo', cursive",
                fontSize: "1.15rem",
                fontWeight: 500,
                marginLeft: "0.25rem",
                // marginBottom: "0.25rem",
                padding: "0.25rem 1.25rem",
                borderRadius: "100rem",
                backgroundColor: "#f0554d",
                border: "1px solid #222",
              }}
            >
              {meme?.popularityScore}
            </span>
          </div>

          <div
            style={{
              borderTop: "#f0554d 4px solid",
              borderBottom: "#f0554d 4px solid",
              fontFamily: "'Galindo', cursive",
              fontSize: "1.15rem",
              fontWeight: 500,
              marginBottom: "1rem",
              padding: "0.75rem",
              textAlign: "start",
              // display: "flex",
              // flex: "row",
            }}
          >
            {/* Tags: */}
            <div>
              {meme?.tags?.map((tag, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: "'Galindo', cursive",
                    fontSize: "1rem",
                    fontWeight: 500,
                    backgroundColor: "#f0554d",
                    padding: "6px 12px",
                    margin: "5px",
                    borderRadius: "1.5rem",
                    display: "inline-block",
                    border: "1px solid #222",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div style={{ paddingLeft: "1rem" }}>
            <p
              style={{
                fontFamily: "'Galindo', cursive",
                fontSize: "1rem",
                fontWeight: 500,
              }}
            >
              Minted At: {new Date(meme?.mintedAt).toDateString()}
            </p>

            {mintHistory.length > 0 ? (
              <>
                <h3
                  style={{
                    marginTop: "1rem",
                    fontFamily: "'Galindo', cursive",
                    fontSize: "1rem",
                    fontWeight: 500,
                  }}
                >
                  Minting History:
                </h3>
                <ul>
                  {mintHistory.map((tx, index) => (
                    <li
                      key={index}
                      style={{
                        fontFamily: "'Galindo', cursive",
                        fontSize: "1rem",
                        fontWeight: 500,
                      }}
                    >
                      Minted by {tx.userId?.username || tx.userId} on{" "}
                      {new Date(tx.mintedAt).toDateString()} via {tx.network}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p
                style={{
                  fontFamily: "'Galindo', cursive",
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
              >
                No minting history yet.
              </p>
            )}

            {listing ? (
              <div
                style={{
                  background: "#eaffd0",
                  borderRadius: "12px",
                  textAlign: "center",
                  marginTop: "1rem",
                  padding: "0.5rem",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Galindo', cursive",
                    fontSize: "1rem",
                    fontWeight: 500,
                  }}
                >
                  For Sale!
                </h3>
                <p
                  style={{
                    fontFamily: "'Galindo', cursive",
                    fontSize: "1rem",
                    fontWeight: 500,
                  }}
                >
                  Price: {listing.price} SUI
                </p>
                <button
                  style={{
                    background: "#00c851",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    cursor: "pointer",
                    padding: "0.5rem 1rem",
                  }}
                >
                  🚀 Buy Now
                </button>
              </div>
            ) : (
              <p
                style={{
                  marginTop: "20px",
                  fontFamily: "'Galindo', cursive",
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
              >
                This meme is not for sale.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemeDetails;
