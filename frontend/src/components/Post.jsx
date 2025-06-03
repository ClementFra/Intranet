import React, { useState } from "react";
import ResponseForm from "./ResponseForm";

export default function Post({ post }) {
  const [currentPost, setCurrentPost] = useState(post);

  const handleReplyAdded = (updatedPost) => {
    setCurrentPost(updatedPost); // Mets à jour le post avec la nouvelle réponse reçue
  };

  return (
    <div className="border p-4 mb-4 rounded shadow">
      <div className="mb-2 text-gray-700">{currentPost.content}</div>
      <div className="text-sm text-gray-500 mb-2">
        Posté par {currentPost.author?.username || "Anonyme"} le{" "}
        {new Date(currentPost.createdAt).toLocaleString()}
      </div>

      {/* Liste des réponses */}
      {currentPost.responses?.map((response, idx) => (
        <div
          key={idx}
          className="border-t pt-2 mt-2 text-sm text-gray-600"
        >
          {response.content} — <i>{response.author?.username || "Anonyme"}</i>
        </div>
      ))}

      {/* Formulaire réponse */}
      <ResponseForm postId={currentPost._id} onReplyAdded={handleReplyAdded} />
    </div>
  );
}