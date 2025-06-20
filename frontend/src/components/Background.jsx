import "./styles.css";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useRef, useLayoutEffect, useEffect, useState } from "react";
import { motion, useTransform, useScroll, useTime } from "framer-motion";
import { degreesToRadians, progress, mix } from "popmotion";
import { IconCloud } from "./magicui/icon-cloud";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import Particles from "./Particles";
import Parallax from "./Parallax";

// import CustomFooter from "./Footer.jsx";

import dogeImg from "../assets/dogecoin.png";

const color = "#111111";

const Icosahedron = () => (
  <mesh rotation-x={0.35}>
    <icosahedronGeometry args={[1, 0]} />
    <meshBasicMaterial wireframe color={color} />
  </mesh>
);

const Star = ({ p }) => {
  const ref = useRef(null);

  const texture = useLoader(TextureLoader, dogeImg); // ✅ only one texture per star

  useLayoutEffect(() => {
    const distance = mix(5, 15, Math.random());
    const yAngle = mix(
      degreesToRadians(80),
      degreesToRadians(100),
      Math.random()
    );
    const xAngle = degreesToRadians(360) * p;

    if (ref.current) {
      ref.current.position.setFromSphericalCoords(distance, yAngle, xAngle);
    }
  }, [p]);

  useFrame(({ camera }) => {
    if (ref.current) {
      ref.current.lookAt(camera.position);
    }
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[0.3, 0.3]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  );
};

function Scene({ numStars = 400 }) {
  const gl = useThree((state) => state.gl);
  const { scrollYProgress } = useScroll();
  const yAngle = useTransform(
    scrollYProgress,
    [0, 1],
    [0.001, degreesToRadians(180)]
  );
  const distance = useTransform(scrollYProgress, [0, 1], [10, 3]);
  const time = useTime();

  useFrame(({ camera }) => {
    camera.position.setFromSphericalCoords(
      distance.get(),
      yAngle.get(),
      time.get() * 0.0005
    );
    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);
  });

  useLayoutEffect(() => {
    gl.setPixelRatio(0.3);
  }, [gl]);

  const stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push(<Star key={i} p={progress(0, numStars, i)} />);
  }

  return <>{stars}</>;
}

export default function Background() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1.5]);

  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchTrendingMemes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/memes`
        );
        const data = await response.json();

        const topMemes = data.slice(0, 300).map((meme) => {
          const rawUrl =
            typeof meme.imageUrl === "string"
              ? meme.imageUrl
              : meme.imageUrl?.url || "";

          return `${
            import.meta.env.VITE_BACKEND_URL
          }/memes/api/image-proxy?url=${encodeURIComponent(rawUrl)}`;
        });

        setImages(topMemes);
      } catch (error) {
        console.error("Error fetching trending memes:", error);
      }
    };

    fetchTrendingMemes();
  }, []);

  return (
    <div className="canvas-bg relative w-full h-screen">
      <Canvas gl={{ antialias: false }}>
        <Scene />
      </Canvas>

      <motion.div
        style={{
          scale,
        }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <IconCloud images={images} />
      </motion.div>
      {/* <div style={{ width: "100%", height: "600px", position: "fixed" }}> */}
      {/* <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={500}
        particleSpread={10}
        speed={0.5}
        particleBaseSize={150}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      /> */}
      <Parallax />
      {/* </div> */}
      {/* <CustomFooter /> */}
    </div>
  );
}
