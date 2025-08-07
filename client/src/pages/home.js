// src/pages/Home.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import PostForm from '../components/postform';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { token } = useContext(AuthContext);

  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:5000/api/posts');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Optional Sidebar */}
        <div className="col-md-3 d-none d-md-block">
          <div className="bg-light p-3 rounded shadow-sm">
            <h6>Welcome!</h6>
            <p>This is a LinkedIn-like platform.</p>
          </div>
        </div>

        {/* Main Feed */}
        <div className="col-md-6">
          {token && <PostForm onPost={fetchPosts} />}
          {posts.map(post => <PostCard key={post._id} post={post} />)}
        </div>

        {/* Optional Right Sidebar */}
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
