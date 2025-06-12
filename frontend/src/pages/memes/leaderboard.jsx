import React, { useEffect, useState } from "react";
import { Flame, Crown } from "lucide-react";
import { NeonGradientCard } from "../../components/magicui/neon-gradient-card";
import GlitchText from "./GlitchText";
import FuzzyText from "../../components/FuzzyText";
import ScrollReveal from "./ScrollReveal";
import FadeContent from "./FadeContent";

function Leaderboard() {
  const [topMemes, setTopMemes] = useState([]);
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/memes/leaderboard`
        );
        const data = await res.json();
        setTopMemes(data.topMemes.slice(0, 5));
        setTopUsers(data.topUsers.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
      }
    };
    fetchLeaderboard();
  }, []);

  const getRankBadge = (index) => {
    const colors = [
      "bg-gradient-to-r from-yellow-400 to-red-500",
      "bg-gradient-to-r from-gray-400 to-gray-600",
      "bg-gradient-to-r from-yellow-300 to-orange-400",
    ];
    return `text-white text-xs font-bold px-2 py-1 rounded-full shadow ${
      colors[index] || "bg-purple-400"
    }`;
  };

  return (
    <div className="w-[65vw] mt-20 mx-auto p-6 bg-transparent rounded-xl shadow-xl animate-fade-in">
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.5}
        enableHover={true}
        className="z-10"
      >
        {/* <h1 className="text-5xl font-extrabold text-center mb-4 text-purple-700 drop-shadow-lg"> */}
        Meme Leaderboard Party
        {/* </h1> */}
      </FuzzyText>
      <br />
      <br />

      {/* Top Memes */}
      <FadeContent
        blur={true}
        duration={1000}
        easing="ease-out"
        initialOpacity={0}
      >
        <NeonGradientCard className="w-full h-full mb-8">
          <section>
            <h2 className="text-3xl font-bold flex items-center gap-3 text-red-500">
              <Flame className="w-7 h-7 animate-bounce" /> Hottest Memes 🔥
            </h2>
            <ul className="mt-6 space-y-4">
              {topMemes.map((meme, index) => (
                <li
                  key={meme._id}
                  className="bg-white hover:scale-[1.02] hover:shadow-lg transition transform duration-200 px-6 py-4 rounded-lg flex justify-between items-center border border-gray-200"
                >
                  <span className="font-semibold flex items-center gap-2">
                    <span className={getRankBadge(index)}>#{index + 1}</span>
                    <span className="text-indigo-600 text-lg">
                      {meme.title}
                    </span>
                  </span>
                  <span className="text-sm text-gray-700">
                    🚀 Score: {meme.popularityScore}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </NeonGradientCard>
      </FadeContent>

      {/* Top Users */}
      <ScrollReveal
        baseOpacity={0}
        enableBlur={true}
        baseRotation={5}
        blurStrength={10}
        containerClassName="my-20"
        textClassName="space-y-4"
      >
        <NeonGradientCard className="w-full h-full">
          <section>
            <h2 className="text-3xl font-bold flex items-center gap-3 text-yellow-500">
              <Crown className="w-7 h-7 animate-pulse" /> Royal Users 👑
            </h2>
            <ul className="mt-6 space-y-4">
              {topUsers.map((entry, index) => (
                <li
                  key={entry._id}
                  className="bg-white hover:scale-[1.02] hover:shadow-lg transition transform duration-200 px-6 py-4 rounded-lg flex justify-between items-center border border-gray-200"
                >
                  <span className="font-semibold flex items-center gap-2">
                    <span className={getRankBadge(index)}>#{index + 1}</span>
                    <span className="text-blue-600 text-lg">
                      {entry.userId.username}
                    </span>
                  </span>
                  <span className="text-sm text-gray-700">
                    🧠 Score: {entry.score} • 🎨 Mints: {entry.totalMints}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </NeonGradientCard>
      </ScrollReveal>
    </div>
  );
}

export default Leaderboard;
