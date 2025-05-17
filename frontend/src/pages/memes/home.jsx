// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

// import BentoDemo from "./BentoDemo.jsx";
import HeroVideoDialog from "../../components/magicui/hero-video-dialog";
import ScrollReveal from "./ScrollReveal";
import FadeContent from "./FadeContent";
import FuzzyText from "../../components/FuzzyText";
import CustomFooter from "../../components/Footer";
import ASCIIText from "./ASCIIText";
import FallingText from "./FallingText";
import PixelCard from "./PixelCard";
import ScrollLinked from "./ScrollLinked";
import GlitchText from "./GlitchText";
import FunkyLeaderboard from "./FunkyLeaderboard";
import { NeonGradientCard } from "../../components/magicui/neon-gradient-card";
import MyMemesScroll from "./MyMemesScroll";
import AuthSection from "./AuthSection";

const Section = ({ id, title, linkTo, children }) => (
  <section
    id={id}
    className="min-h-screen flex flex-col justify-center items-center px-[10vw] py-16 border-b border-gray-300"
  >
    <Link to={linkTo}>
      <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-white">
        {title}
      </h2>
    </Link>
    <div className="w-full max-w-6xl text-center">{children}</div>
  </section>
);

const Home = () => {
  return (
    <div className="w-full">
      {/* 1. Project Description */}
      <FadeContent
        blur={true}
        duration={1000}
        easing="ease-out"
        initialOpacity={0}
      >
        <Section
          id="about"
          title={
            <>
              <FuzzyText
                baseIntensity={0.2}
                hoverIntensity={0.5}
                enableHover={true}
              >
                Welcome to ZooFi-
              </FuzzyText>
            </>
          }
          linkTo="/about"
        >
          <br />
          <NeonGradientCard className="w-full">
            {/* <PixelCard variant="blue"> */}
            {/* <div className="relative bg-gradient-to-br from-[#1a1a1a] to-black rounded-2xl p-6 md:p-10 border border-white/10 shadow-xl shadow-pink-500/10"> */}
            <p className="text-xl md:text-2xl leading-relaxed text-white font-medium tracking-wide animate-fade-in-up">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 font-bold">
                ZooFi
              </span>{" "}
              is the wildest Web3 meme jungle 🐒. Dive into a world where memes
              aren't just funny—they're mintable, tradeable, and legendary.
              Climb the meme-lord leaderboard, flex your creations as NFTs, and
              earn rewards for your viral genius.
            </p>
            <div className="absolute -top-4 -right-4 bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md animate-pulse">
              Meme On 🚀
            </div>
            {/* </div> */}
          </NeonGradientCard>
          {/* </PixelCard> */}
        </Section>
      </FadeContent>

      <ScrollReveal
        baseOpacity={0}
        enableBlur={false}
        baseRotation={5}
        blurStrength={10}
        containerClassName="my-20"
        textClassName="space-y-4"
      >
        <Section>
          <NeonGradientCard className="w-full">
            <HeroVideoDialog
              className="block"
              animationStyle="from-center"
              videoSrc="https://www.example.com/dummy-video"
              thumbnailSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp91mofXYaK8RLg8wYKiFzIhiRNuiHabvtjg&s"
              thumbnailAlt="Dummy Video Thumbnail"
            />
          </NeonGradientCard>
        </Section>
      </ScrollReveal>

      {/* 2. Trending Memes */}
      <ScrollReveal
        baseOpacity={0}
        enableBlur={false}
        baseRotation={5}
        blurStrength={10}
        containerClassName="my-20"
        textClassName="space-y-4"
      >
        <Section
          id="trending"
          title={
            <>
              <GlitchText
                speed={1}
                enableShadows={true}
                enableOnHover={false}
                className="custom-class"
              >
                Trending Memes
              </GlitchText>
            </>
          }
          linkTo="/explore"
        >
          <br />
          <ScrollLinked />
        </Section>
      </ScrollReveal>

      <ScrollReveal
        baseOpacity={0}
        enableBlur={false}
        baseRotation={5}
        blurStrength={10}
        containerClassName="my-20"
        textClassName="space-y-4"
      >
        <Section>
          <FunkyLeaderboard />
        </Section>
      </ScrollReveal>

      {/* 4. My Memes & Mint */}
      {/* <Section id="my-memes" title="My Memes 🎨" linkTo="/my-memes">
        <p className="mb-6">View and manage your memes here.</p>
        <Link
          to="/mint"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Mint a Meme
        </Link>
      </Section> */}

      <ScrollReveal
        baseOpacity={0}
        enableBlur={false}
        baseRotation={5}
        blurStrength={10}
        containerClassName="my-20"
        textClassName="space-y-4"
      >
        <Section
          id="my-memes"
          title={
            <>
              <GlitchText
                speed={1}
                enableShadows={true}
                enableOnHover={false}
                className="custom-class"
              >
                My Memes
              </GlitchText>
            </>
          }
          linkTo="/my-memes"
        >
          <br />
          <MyMemesScroll />
        </Section>
      </ScrollReveal>

      {/* 5. Login / Signup */}
      {/* <Section id="auth" title="Join ZooFi 🚀" linkTo="/login">
        <p className="mb-6">
          Login or sign up to start minting and sharing memes.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
          >
            Sign Up
          </Link>
        </div>
      </Section> */}

      {/* <ScrollReveal
        baseOpacity={0}
        enableBlur={false}
        baseRotation={5}
        blurStrength={10}
        containerClassName="my-20"
        textClassName="space-y-4"
      >
        <AuthSection />
      </ScrollReveal> */}

      {/* <CustomFooter /> */}
    </div>
  );
};

export default Home;
