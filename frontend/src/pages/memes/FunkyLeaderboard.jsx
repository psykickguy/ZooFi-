// import React from "react";
import { useState, useEffect, useRef } from "react";

function FunkyLeaderboard() {
  const [topMemes, setTopMemes] = useState([]);
  const [topUsers, setTopUsers] = useState([]);

  // Slice and sort for fallback (in case not already sorted)
  const top3Memes = topMemes
    .slice(0, 3)
    .sort((a, b) => b.popularityScore - a.popularityScore);
  const top3Users = topUsers.slice(0, 3).sort((a, b) => b.score - a.score);

  // Fetch trending memes on component mount
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch("http://localhost:8080/memes/leaderboard");
        const data = await response.json();

        // Fetch only top 3 memes and users directly from the API
        setTopMemes(data.topMemes.slice(0, 3)); // Slice top 3 memes
        setTopUsers(data.topUsers.slice(0, 3)); // Slice top 3 users

        console.log("Fetched memes:", data); // Debugging line
      } catch (error) {
        console.error("Error fetching trending memes:", error);
      }
    };

    fetchLeaderboardData();
  }, []);

  const positions = ["2nd", "1st", "3rd"];
  const barHeights = ["h-24", "h-36", "h-20"]; // Medium, Tall, Small
  const medals = ["🥈", "🥇", "🥉"];

  return (
    <section
      id="leaderboard"
      className="py-12 bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100"
    >
      <h2 className="text-3xl font-bold text-center mb-10">
        🏆 Meme Battle Royale: Top 3
      </h2>

      {/* Conditional Rendering for Loading */}
      {topMemes.length || topUsers.length ? (
        <div className="flex flex-col md:flex-row justify-around items-center gap-10 px-4 md:px-12">
          {/* Memes Graph */}
          <div className="w-full md:w-1/2 text-center">
            <h3 className="text-2xl font-bold mb-4">Top 3 Memes 😂</h3>
            <div className="flex justify-center items-end gap-8">
              {top3Memes.map((meme, index) => (
                <div key={meme._id} className="flex flex-col items-center">
                  <div
                    className={`w-20 ${barHeights[index]} bg-pink-400 rounded-t-xl shadow-lg flex items-center justify-center text-3xl`}
                  >
                    {medals[index]}
                  </div>
                  <p className="mt-2 text-sm font-semibold">
                    {positions[index]}
                  </p>
                  <p className="text-xs italic max-w-[5rem] truncate">
                    {meme.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Users Graph */}
          <div className="w-full md:w-1/2 text-center">
            <h3 className="text-2xl font-bold mb-4">Top 3 Users 👤</h3>
            <div className="flex justify-center items-end gap-8">
              {top3Users.map((user, index) => (
                <div key={user._id} className="flex flex-col items-center">
                  <div
                    className={`w-20 ${barHeights[index]} bg-purple-400 rounded-t-xl shadow-lg flex items-center justify-center text-3xl`}
                  >
                    {medals[index]}
                  </div>
                  <p className="mt-2 text-sm font-semibold">
                    {positions[index]}
                  </p>
                  <p className="text-xs italic max-w-[5rem] truncate">
                    {user.userId?.username || "Anon"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-white text-center">Loading leaderboard...</p>
      )}
    </section>
  );
}

export default FunkyLeaderboard;
