import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const user = post.user;

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h6 className="card-subtitle mb-1 text-muted">
          {user ? (
            <Link to={`/profile/${user._id}`} className="text-decoration-none">
              {user.name}
            </Link>
          ) : (
            <span>Unknown User</span>
          )}
        </h6>
        <p className="card-text">{post.content}</p>
        <small className="text-muted">{new Date(post.createdAt).toLocaleString()}</small>
      </div>
    </div>
  );
};

export default PostCard;
