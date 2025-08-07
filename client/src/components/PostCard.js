// src/components/PostCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
     <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h6 className="card-subtitle mb-1 text-muted">
          <Link to={`/profile/${post.user._id}`} className="text-decoration-none">{post.user.name}</Link>
        </h6>
        <p className="card-text">{post.content}</p>
        <small className="text-muted">{new Date(post.createdAt).toLocaleString()}</small>
      </div>
    </div>
  );
};

export default PostCard;
