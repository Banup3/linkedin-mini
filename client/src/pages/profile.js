
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostCard from '../components/PostCard';

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    const API_BASE = process.env.REACT_APP_API_BASE_URL;

    const res1 = await axios.get(`${API_BASE}api/auth/profile/${id}`);
    setProfile(res1.data);

    const res2 = await axios.get(`${API_BASE}api/posts/user/${id}`);
    setPosts(res2.data);
  };

  fetchData();
}, [id]);


  return (
    <div className="container mt-4">
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <h4>{profile.name}</h4>
          <p className="text-muted">{profile.email}</p>
          <p>{profile.bio}</p>
        </div>
      </div>

      <h5>User Posts</h5>
      {posts.map(post => <PostCard key={post._id} post={post} />)}
    </div>
  );
};

export default Profile;
