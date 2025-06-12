"use client";

import { useState, useEffect, useRef } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import TiltedCard from "./TiltedCard";
import { Link } from "react-router-dom";
import { NeonGradientCard } from "../../components/magicui/neon-gradient-card";

export default function ScrollLinked() {
  const [memes, setMemes] = useState([]);
  const ref = useRef(null);
  const { scrollXProgress } = useScroll({ container: ref });
  const maskImage = useScrollOverflowMask(scrollXProgress);

  // Fetch trending memes on component mount
  useEffect(() => {
    const fetchTrendingMemes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/memes`,
          {
            credentials: "include", // optional: only if you're using cookies/session
          }
        );
        const data = await response.json();

        console.log("Fetched memes:", data); // Debugging line

        const topMemes = data.slice(0, 300).map((meme) => {
          const rawUrl =
            typeof meme.imageUrl === "string"
              ? meme.imageUrl
              : meme.imageUrl?.url || "";
          return {
            imageUrl: `${
              import.meta.env.VITE_BACKEND_URL
            }/memes/api/image-proxy?url=${encodeURIComponent(rawUrl)}`,

            title: meme.title,
            id: meme._id,
          };
        });

        setMemes(topMemes);
      } catch (error) {
        console.error("Error fetching trending memes:", error);
      }
    };

    fetchTrendingMemes();
  }, []);

  return (
    <NeonGradientCard>
      <div id="example">
        <motion.ul
          ref={ref}
          style={{
            WebkitMaskImage: maskImage,
            maskImage: maskImage,
          }}
        >
          {memes.map((meme, index) => (
            <li key={index}>
              <Link to={`/meme/${meme.id}`}>
                <TiltedCard
                  imageSrc={meme.imageUrl}
                  // altText={`Meme ${index + 1}`}
                  altText={``}
                  captionText={meme.title}
                  containerHeight="auto"
                  containerWidth="300px"
                  imageHeight="300px"
                  imageWidth="300px"
                  rotateAmplitude={12}
                  scaleOnHover={1.2}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={true}
                  overlayContent={
                    <p className="tilted-card-demo-text">{meme.title}</p>
                  }
                />
              </Link>
            </li>
          ))}
        </motion.ul>
        <StyleSheet />
      </div>
    </NeonGradientCard>
  );
}

const left = `0%`;
const right = `100%`;
const leftInset = `20%`;
const rightInset = `80%`;
const transparent = `#0000`;
const opaque = `#000`;

function useScrollOverflowMask(scrollXProgress) {
  const maskImage = useMotionValue(
    `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
  );

  useMotionValueEvent(scrollXProgress, "change", (value) => {
    if (value === 0) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
      );
    } else if (value === 1) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`
      );
    } else if (
      scrollXProgress.getPrevious() === 0 ||
      scrollXProgress.getPrevious() === 1
    ) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
      );
    }
  });

  return maskImage;
}

function StyleSheet() {
  return (
    <style>{`
      #example {
  left: 50%;
  transform: translateX(-50%);
        width: 60vw;
        // max-width: 400px;
        position: relative;
        // overflow: visible; 
      }

      #example ul {
        display: flex;
        list-style: none;
        height: 380px;
        // background-color: green;
        overflow-x: scroll;
        padding: 20px 0;
        margin: 0 auto;
        gap: 20px;
        // overflow: visible; 
      }

      /* Hide the scrollbar */
      #example::-webkit-scrollbar {
        display: none;
      }

      /* For Firefox */
      #example {
        scrollbar-width: none;
      }

      #example li {
        flex: 0 0 300px;
        background: var(--accent, #ff0088);
        background-color: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: visible;
        border-radius: 8px;

      }

      #example li img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
      }
    `}</style>
  );
}
