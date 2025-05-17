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
import axios from "axios";

export default function MyMemesScroll() {
  const [myMemes, setMyMemes] = useState([]);
  const ref = useRef(null);
  const { scrollXProgress } = useScroll({ container: ref });
  const maskImage = useScrollOverflowMask(scrollXProgress);

  useEffect(() => {
    const fetchMyMemes = async () => {
      try {
        // const response = await fetch("http://localhost:8080/api/my-memes");
        // const data = await response.json();
        const res = await axios.get("http://localhost:8080/api/my-memes", {
          withCredentials: "include",
        });
        // const data = await res.json();
        const memesArray = Array.isArray(res.data)
          ? res.data
          : res.data.memes || [];

        const processedMemes = memesArray.map((meme) => {
          const rawUrl =
            typeof meme.imageUrl === "string"
              ? meme.imageUrl
              : meme.imageUrl?.url || "";
          return {
            imageUrl: `http://localhost:8080/memes/api/image-proxy?url=${encodeURIComponent(
              rawUrl
            )}`,
            title: meme.title,
            id: meme._id,
          };
        });

        setMyMemes(processedMemes);
      } catch (error) {
        console.error("Error fetching your memes:", error);
      }
    };

    fetchMyMemes();
  }, []);

  return (
    <NeonGradientCard>
      <div id="my-meme-scroll">
        <motion.ul
          ref={ref}
          style={{
            WebkitMaskImage: maskImage,
            maskImage: maskImage,
          }}
        >
          {myMemes.map((meme, index) => (
            <li key={index}>
              <Link to={`/meme/${meme.id}`}>
                <TiltedCard
                  imageSrc={meme.imageUrl}
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
        <MyStyleSheet />
      </div>
    </NeonGradientCard>
  );
}

function useScrollOverflowMask(scrollXProgress) {
  const maskImage = useMotionValue(
    `linear-gradient(90deg, #000, #000 0%, #000 80%, #0000)`
  );

  useMotionValueEvent(scrollXProgress, "change", (value) => {
    if (value === 0) {
      animate(
        maskImage,
        `linear-gradient(90deg, #000, #000 0%, #000 80%, #0000)`
      );
    } else if (value === 1) {
      animate(
        maskImage,
        `linear-gradient(90deg, #0000, #000 20%, #000 100%, #000)`
      );
    } else if (
      scrollXProgress.getPrevious() === 0 ||
      scrollXProgress.getPrevious() === 1
    ) {
      animate(
        maskImage,
        `linear-gradient(90deg, #0000, #000 20%, #000 80%, #0000)`
      );
    }
  });

  return maskImage;
}

function MyStyleSheet() {
  return (
    <style>{`
      #my-meme-scroll {
        left: 50%;
        transform: translateX(-50%);
        width: 60vw;
        position: relative;
        // padding: 0 1rem;
      }

      #my-meme-scroll ul {
        display: flex;
        list-style: none;
        height: 380px;
        overflow-x: scroll;
        padding: 20px 0;
        margin: 0 auto;
        gap: 20px;
      }

      #my-meme-scroll::-webkit-scrollbar {
        display: none;
      }

      #my-meme-scroll {
        scrollbar-width: none;
      }

      #my-meme-scroll li {
        flex: 0 0 300px;
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: visible;
        border-radius: 8px;
      }

      #my-meme-scroll li img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
      }
    `}</style>
  );
}
