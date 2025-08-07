
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const PostForm = ({ onPost }) => {
  const [content, setContent] = useState('');
  const { token } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/posts`,
      { content },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setContent('');
    onPost(); 
  };

  return (
   <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <textarea
            className="form-control mb-2"
            placeholder="Share something with your community..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">Post</button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
