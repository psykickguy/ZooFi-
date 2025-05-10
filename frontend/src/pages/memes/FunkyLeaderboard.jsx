import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import GlitchText from "./GlitchText";
import { NeonGradientCard } from "../../components/magicui/neon-gradient-card";
import { Link } from "react-router-dom";

function FunkyLeaderboard() {
  const [topMemes, setTopMemes] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const barHeights = [190, 250, 130]; // Order: 2nd, 1st, 3rd
  const medals = ["🥈", "🥇", "🥉"];
  const memeColors = ["bg-yellow-400", "bg-blue-500", "bg-red-500"];
  const userColors = ["bg-purple-400", "bg-green-500", "bg-pink-500"];
  const positions = ["2nd", "1st", "3rd"];

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const res = await fetch("http://localhost:8080/memes/leaderboard");
        const data = await res.json();
        setTopMemes(data.topMemes.slice(0, 3));
        setTopUsers(data.topUsers.slice(0, 3));
      } catch (err) {
        console.error("Leaderboard fetch error:", err);
      }
    };
    fetchLeaderboardData();
  }, []);

  const renderBar = (item, index, type = "meme") => {
    const height = barHeights[index];
    const bgColor = type === "meme" ? memeColors[index] : userColors[index];
    const label =
      type === "meme"
        ? item.title
        : item.userId?.username || item.username || "Anon";

    const content = (
      <div className="flex flex-col items-center w-[80px] cursor-pointer">
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: isInView ? height : 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          className={`w-full ${bgColor} rounded-t-xl shadow-lg flex items-center justify-center text-3xl overflow-hidden`}
          whileHover={{ scaleX: 1.3, originY: 1 }}
        >
          {medals[index]}
        </motion.div>
        <p className="mt-2 text-sm font-semibold">{positions[index]}</p>
        <p className="text-xs italic text-center truncate max-w-[80px]">
          {label}
        </p>
      </div>
    );

    return type === "meme" ? (
      <Link key={item._id} to={`/meme/${item._id}`} className="text-white">
        {content}
      </Link>
    ) : (
      <div key={item._id || index}>{content}</div>
    );
  };

  return (
    <NeonGradientCard className="w-full h-160">
      <section ref={sectionRef} className="py-12 px-4 bg-transparent">
        <GlitchText
          speed={1}
          enableShadows={true}
          enableOnHover={false}
          className="text-3xl font-bold text-center mb-10"
        >
          🏆 Meme Battle Royal
        </GlitchText>
        <br />
        {topMemes.length || topUsers.length ? (
          <div className="flex flex-col md:flex-row justify-around items-center gap-8">
            {/* Meme Leaderboard */}
            <div className="w-full md:w-1/2 text-center">
              <h3 className="text-2xl font-bold mb-4">Top 3 Memes 😂</h3>
              <div className="flex justify-center items-end gap-6">
                {topMemes.map((meme, i) => renderBar(meme, i, "meme"))}
              </div>
            </div>

            {/* User Leaderboard */}
            <div className="w-full md:w-1/2 text-center">
              <h3 className="text-2xl font-bold mb-4">Top 3 Users 👤</h3>
              <div className="flex justify-center items-end gap-6">
                {topUsers.map((user, i) => renderBar(user, i, "user"))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-white text-center text-sm">
            Loading leaderboard...
          </p>
        )}
      </section>
    </NeonGradientCard>
  );
}

export default FunkyLeaderboard;
