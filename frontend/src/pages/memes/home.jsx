// // src/pages/Home.jsx
// import React from "react";

// const Home = () => {
//   return (
//     <div className="text-center p-10">
//       <h1 className="text-4xl font-bold mb-4">Welcome to ZooFi 🦍</h1>
//       <p className="text-lg">
//         Mint. Share. Explore the funniest memes on Web3.
//       </p>
//     </div>
//   );
// };

// export default Home;

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
          {/* <PixelCard variant="blue"> */}
          <div className="relative bg-gradient-to-br from-[#1a1a1a] to-black rounded-2xl p-6 md:p-10 border border-white/10 shadow-xl shadow-pink-500/10">
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
          </div>
          {/* </PixelCard> */}
        </Section>
      </FadeContent>

      <ScrollReveal
        baseOpacity={0}
        enableBlur={true}
        baseRotation={5}
        blurStrength={10}
        containerClassName="my-20"
        textClassName="space-y-4"
      >
        <Section>
          <HeroVideoDialog
            className="block"
            animationStyle="from-center"
            videoSrc="https://www.example.com/dummy-video"
            thumbnailSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp91mofXYaK8RLg8wYKiFzIhiRNuiHabvtjg&s"
            thumbnailAlt="Dummy Video Thumbnail"
          />
        </Section>
      </ScrollReveal>
      {/* <ScrollReveal
        baseOpacity={0}
        enableBlur={true}
        baseRotation={5}
        blurStrength={10}
        containerClassName="my-20"
        textClassName="space-y-4"
      >
        <Section>
          <BentoDemo />
        </Section>
      </ScrollReveal> */}

      {/* 2. Trending Memes */}
      <ScrollReveal
        baseOpacity={0}
        enableBlur={true}
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
                enableOnHover={true}
                className="custom-class"
              >
                Trending Memes 🔥
              </GlitchText>
            </>
          }
          linkTo="/explore"
        >
          <br />
          <ScrollLinked />
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow">Meme 1</div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">Meme 2</div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">Meme 3</div>
        </div> */}
        </Section>
      </ScrollReveal>

      <Section>
        {/* Pass Sample Data to FunkyLeaderboard */}
        <FunkyLeaderboard
        // topMemes={[
        //   { _id: "1", title: "Meme A", popularityScore: 95 },
        //   { _id: "2", title: "Meme B", popularityScore: 88 },
        //   { _id: "3", title: "Meme C", popularityScore: 70 },
        // ]}
        // topUsers={[
        //   { _id: "u1", userId: { username: "UserOne" }, score: 100 },
        //   { _id: "u2", userId: { username: "UserTwo" }, score: 90 },
        //   { _id: "u3", userId: { username: "UserThree" }, score: 80 },
        // ]}
        />
      </Section>

      {/* 3. Leaderboard */}
      <Section id="leaderboard" title="Leaderboard 🏆" linkTo="/leaderboard">
        <div className="flex flex-col md:flex-row justify-center items-start gap-12">
          {/* Top 3 Memes */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4">Top 3 Memes 😂</h3>
            <div className="flex justify-center items-end gap-8">
              <div className="flex flex-col items-center">
                <div className="bg-yellow-400 w-16 h-32 rounded-t-full shadow-md">
                  🥇
                </div>
                <p className="mt-2 font-bold">1st</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-gray-300 w-16 h-24 rounded-t-full shadow-md">
                  🥈
                </div>
                <p className="mt-2 font-bold">2nd</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-orange-300 w-16 h-20 rounded-t-full shadow-md">
                  🥉
                </div>
                <p className="mt-2 font-bold">3rd</p>
              </div>
            </div>
          </div>

          {/* Top 3 Users */}
          {/* <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4">Top 3 Users 👤</h3>
            <div className="flex justify-center items-end gap-8">
              <div className="flex flex-col items-center">
                <div className="bg-yellow-400 w-16 h-32 rounded-t-full shadow-md">
                  🥇
                </div>
                <p className="mt-2 font-bold">1st</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-gray-300 w-16 h-24 rounded-t-full shadow-md">
                  🥈
                </div>
                <p className="mt-2 font-bold">2nd</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-orange-300 w-16 h-20 rounded-t-full shadow-md">
                  🥉
                </div>
                <p className="mt-2 font-bold">3rd</p>
              </div>
            </div>
          </div> */}
        </div>
      </Section>

      {/* 4. My Memes & Mint */}
      <Section id="my-memes" title="My Memes 🎨" linkTo="/my-memes">
        <p className="mb-6">View and manage your memes here.</p>
        <Link
          to="/mint"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Mint a Meme
        </Link>
      </Section>

      {/* 5. Login / Signup */}
      <Section id="auth" title="Join ZooFi 🚀" linkTo="/login">
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
      </Section>
      {/* <CustomFooter /> */}
    </div>
  );
};

export default Home;
