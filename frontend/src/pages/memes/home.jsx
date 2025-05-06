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

import BentoDemo from "./BentoDemo.jsx";

const Section = ({ id, title, linkTo, children }) => (
  <section
    id={id}
    className="min-h-screen flex flex-col justify-center items-center px-[10vw] py-16 border-b border-gray-300"
  >
    <Link to={linkTo}>
      <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center hover:underline">
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
      <Section id="about" title="Welcome to ZooFi 🦍" linkTo="/about">
        <p className="text-lg md:text-xl leading-relaxed">
          ZooFi is the ultimate Web3 meme platform. Discover hilarious content,
          mint your own memes as NFTs, explore trending creations, and climb the
          leaderboard to earn fame and rewards. Unleash your inner meme-lord in
          the world of crypto!
        </p>
      </Section>

      <Section>
        <BentoDemo />
      </Section>

      {/* 2. Trending Memes */}
      <Section id="trending" title="Trending Memes 🔥" linkTo="/trending">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder for meme cards */}
          <div className="bg-gray-100 p-6 rounded-lg shadow">Meme 1</div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">Meme 2</div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">Meme 3</div>
        </div>
      </Section>

      {/* 3. Leaderboard */}
      <Section id="leaderboard" title="Leaderboard 🏆" linkTo="/leaderboard">
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
    </div>
  );
};

export default Home;
