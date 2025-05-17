import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FadeContent from "../memes/FadeContent";

function Mint() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    imageUrl: null,
  });
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "imageUrl") {
      const file = files[0];
      setFormData({ ...formData, imageUrl: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();
      for (let key in formData) {
        payload.append(key, formData[key]);
      }

      await axios.post("http://localhost:8080/api/my-memes", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      alert("🎉 Meme minted successfully!");

      navigate("/my-memes");
    } catch (err) {
      if (err.response?.status === 401) {
        alert("⚠️ Please log in to mint a meme.");
        navigate("/login"); // 🔁 React Router redirect
        // window.location.href = "/login"; // or use your React Router redirect logic
      } else {
        console.error("Mint error:", err);
        alert("❌ Failed to mint meme");
      }
    }
  };

  return (
    <FadeContent
      blur={true}
      duration={1000}
      easing="ease-out"
      initialOpacity={0}
    >
      {/* // <div className="relative z-10 min-h-screen bg-gradient-to-br from-black to-gray-800 text-white p-10"> */}
      <div className="mt-[7rem] relative z-10 max-w-2xl mx-auto bg-white/10 rounded-2xl p-8 shadow-lg">
        <div
          className="mb-6 text-center text-pink-400"
          style={{
            fontFamily: "Bangers, cursive",
            fontSize: "2.5rem",
            fontWeight: "bold",
          }}
        >
          💥 Mint a Meme NFT
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-2 rounded bg-gray-900 text-white border border-pink-500"
            type="text"
            name="title"
            placeholder="Meme Title"
            required
            value={formData.title}
            onChange={handleChange}
          />
          <textarea
            className="w-full p-2 rounded bg-gray-900 text-white border border-pink-500"
            name="description"
            placeholder="Description"
            required
            value={formData.description}
            onChange={handleChange}
          />
          <input
            className="w-full p-2 rounded bg-gray-900 text-white border border-pink-500"
            type="file"
            name="imageUrl"
            accept="image/*"
            required
            onChange={handleChange} // ✅ only onChange, no `value`!
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-xl border-2 border-white/30"
            />
          )}
          <input
            className="w-full p-2 rounded bg-gray-900 text-white border border-pink-500"
            type="text"
            name="category"
            placeholder="Category (e.g., Humor, Animals)"
            required
            value={formData.category}
            onChange={handleChange}
          />
          <input
            className="w-full p-2 rounded bg-gray-900 text-white border border-pink-500"
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            value={formData.tags}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full py-3 rounded bg-pink-500 hover:bg-pink-600 text-white font-bold transition duration-300"
          >
            🚀 Mint Meme
          </button>
        </form>
      </div>
    </FadeContent>
    //{" "}
    //  </div>
  );
}

export default Mint;
