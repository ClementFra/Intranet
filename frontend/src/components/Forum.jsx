import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import PostForm from "./PostForm";
import Post from "./Post";

export default function Forum() {
  const [posts, setPosts] = useState([]);
  const { token } = useContext(AuthContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/forum/posts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data.posts);
      } catch (err) {
        setError("Erreur lors du chargement des posts");
      }
    };
    fetchPosts();
  }, [token]);

  const addPost = (post) => {
    setPosts([post, ...posts]);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Forum</h1>
      <PostForm onPostAdded={addPost} />
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {posts.length === 0 && <p>Aucun post pour l’instant.</p>}
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}