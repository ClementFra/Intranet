import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function ResponseForm({ postId, onReplyAdded }) {
  const { token } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);

  if (!token) return null; // Ne pas afficher si pas connecté

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Le contenu ne peut pas être vide");
      return;
    }
    setError(null);

    try {
      const res = await axios.post(
        `http://localhost:5000/forum/${postId}/responses`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onReplyAdded(res.data.post); // Met à jour le post avec la nouvelle réponse
      setContent("");
    } catch (err) {
      setError("Erreur lors de l'ajout de la réponse");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-2">
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows="2"
        placeholder="Écrivez votre réponse..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
      >
        Répondre
      </button>
    </form>
  );
}