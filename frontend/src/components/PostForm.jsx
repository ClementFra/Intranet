import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function PostForm({ onPostAdded }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Le contenu ne peut pas être vide");
      return;
    }
    setError(null);

    try {
      const res = await axios.post(
        "http://localhost:5000/forum",
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onPostAdded(res.data.post);
      setContent("");
    } catch (err) {
      setError("Erreur lors de l'ajout du post");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows="3"
        placeholder="Écrivez votre post..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Poster
      </button>
    </form>
  );
}