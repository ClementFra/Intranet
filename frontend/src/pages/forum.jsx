import { useState, useEffect, useContext } from "react";
import axios from "../utils/axiosInstance";
import AuthContext from "../context/AuthContext";
import { formatDate } from "../utils/formatDate";

const Forum = () => {
  const { token, user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    axios.get("/posts", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setPosts(res.data));
  }, []);

  const handleLike = async (postId, type) => {
    await axios.post(`/posts/${postId}/${type}`, {}, { headers: { Authorization: `Bearer ${token}` } });
    const updated = await axios.get("/posts", { headers: { Authorization: `Bearer ${token}` } });
    setPosts(updated.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/posts", { content: newPost }, { headers: { Authorization: `Bearer ${token}` } });
    const updated = await axios.get("/posts", { headers: { Authorization: `Bearer ${token}` } });
    setPosts(updated.data);
    setNewPost("");
  };

  return (
    <div className="forum">
      <form onSubmit={handleSubmit}>
        <textarea value={newPost} onChange={(e) => setNewPost(e.target.value)} required />
        <button>Poster</button>
      </form>

      <div className="posts">
        {posts.map(post => (
          <div key={post._id} className="post">
            <img src={post.avatar || "/default-avatar.png"} alt="avatar" />
            <div>
              <p>{post.author}</p>
              <p>{post.content}</p>
              <p>{formatDate(post.createdAt)}</p>
              <button onClick={() => handleLike(post._id, "like")}>👍 {post.likes.length}</button>
              <button onClick={() => handleLike(post._id, "dislike")}>👎 {post.dislikes.length}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;