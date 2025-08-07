import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import PostForm from '../components/postform';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { token } = useContext(AuthContext);

  const fetchPosts = async () => {
    const API_BASE = process.env.REACT_APP_API_BASE_URL;
    try {
      const res = await axios.get(`${API_BASE}api/posts`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add this to protect route if needed
        },
      });
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  // 🔥 Add this to trigger posts loading on initial render
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3 d-none d-md-block">
          <div className="bg-light p-3 rounded shadow-sm">
            <h6>Welcome!</h6>
            <p>This is a LinkedIn-like platform.</p>
          </div>
        </div>

        <div className="col-md-6">
          {token && <PostForm onPost={fetchPosts} />}
          {posts.map(post => <PostCard key={post._id} post={post} />)}
        </div>

        <div className="col-md-3 d-none d-md-block">
          <div className="bg-light p-3 rounded shadow-sm">
            <h6>Suggestions</h6>
            <p>Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
