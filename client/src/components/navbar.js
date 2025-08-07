
import React, { useContext,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
 
  const [searchQuery, setSearchQuery] = useState('');

const [searchResults, setSearchResults] = useState({ users: [], posts: [] });


const handleSearchChange = async (e) => {
  const input = e.target.value;
  setSearchQuery(input);

   if (input.trim() === '') {
    setSearchResults({ users: [], posts: [] });
    return;
  }

  try {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/search?q=${input}`);
    setSearchResults(res.data);
  } catch (err) {
    console.error('Search error:', err);
  }
};

const handleSuggestionClick = (text) => {
   setSearchQuery(text);
  setSearchResults({ users: [], posts: [] });
};


  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm px-3 py-2">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src="assets/2496097.png" alt="logo" width="34" height="34" />
          <span className="ms-2 fw-bold">LinkedIn</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
          <div className="collapse navbar-collapse" id="navbarContent">
       
          <div className="ms-md-3 my-2 my-md-0 w-100" style={{ maxWidth: '300px' }}>
            <div className="input-group">
              
              <div className="position-relative w-100">
  <div className="input-group">
    <span className="input-group-text bg-light border-end-0">
      <i className="bi bi-search"></i>
    </span>
    <input
      className="form-control border-start-0"
      type="text"
      placeholder="Search"
      value={searchQuery}
      onChange={handleSearchChange}
      onBlur={() => {
    setTimeout(() => {
      setSearchResults({ users: [], posts: [] });
    }, 150); 
  }}
  onFocus={handleSearchChange}
    />
  </div>

 
 {searchResults.users?.length > 0 || searchResults.posts?.length > 0 ? (
  <ul className="list-group position-absolute w-100 z-3" style={{ top: '100%', left: 0 }}>
    {searchResults.users?.map((user) => (
  <li key={user._id} className="list-group-item list-group-item-action" onClick={() => handleSuggestionClick(user.name)}>
    <Link to={`/profile/${user._id}`}>
      {user.name} <small>({user.email})</small>
    </Link>
  </li>
))}

    {searchResults.posts?.map((post) => (
  <li key={post._id} className="list-group-item list-group-item-action" onClick={() => handleSuggestionClick(post.content)}>
    <Link to={`/post/${post._id}`}>
      Post by <strong>{post.author?.name || 'Unknown'}</strong>: {post.content.slice(0, 30)}...
    </Link>
  </li>
))}

  </ul>
) : null}


</div>

            </div>
          </div>
          <div className="d-flex flex-wrap justify-content-center gap-3 mx-auto mt-2 mt-md-0">
            <NavItem icon="bi-house-fill" label="Home" to="/" />
            <NavItem icon="bi-people-fill" label="My Network" to="/network" />
            <NavItem icon="bi-briefcase-fill" label="Jobs" to="/jobs" />
            <NavItem icon="bi-chat-dots-fill" label="Messaging" to="/messaging" />
            <NavItem icon="bi-bell-fill position-relative" label="Notifications" to="/notifications" />
          </div>
          <div className="d-flex flex-column flex-md-row align-items-md-center gap-2 ms-md-auto mt-3 mt-md-0">
            {user ? (
              <>
                <div className="dropdown">
                  <button className="btn btn-light dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown">
                    <i className="bi bi-person-circle me-1"></i> Me
                  </button>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to={`/profile/${user.id}`}>View Profile</Link></li>
                    <li><button className="dropdown-item" onClick={() => { logout(); navigate('/'); }}>Logout</button></li>
                  </ul>
                </div>

                <div className="dropdown">
                  <button className="btn btn-light dropdown-toggle" data-bs-toggle="dropdown">
                    <i className="bi bi-grid-3x3-gap-fill me-1"></i> For Business
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Page 1</a></li>
                  </ul>
                </div>

                <button className="btn btn-warning btn-sm">Try Premium for ₹0</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-primary btn-sm">Login</Link>
                <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ icon, label, to, badge }) => (
  <Link to={to} className="text-dark text-decoration-none position-relative">
    <div className="d-flex flex-column align-items-center">
      <i className={`bi ${icon} fs-5`}></i>
      <small>{label}</small>
      {badge && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {badge}
        </span>
      )}
    </div>
  </Link>
);

export default Navbar;
