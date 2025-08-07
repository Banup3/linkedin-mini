// src/pages/Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const res = await axios.post('http://localhost:5000/api/auth/login', form);
  //   login(res.data.user, res.data.token);
  //   navigate('/');
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', form);
    setError(''); 
    login(res.data.user, res.data.token);
    navigate('/');
  } catch (error) {
    const errorMsg = error.response?.data?.error || "Login failed. Please try again.";
    // alert(errorMsg);
    setError(errorMsg); // You can replace this with a nicer UI message
    console.error("Login error:", errorMsg);
  }
};
const [error, setError] = useState('');
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="col-11 col-sm-8 col-md-6 col-lg-4">

      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h4 className="text-center mb-4">Sign In</h4>
        {error && <div className="alert alert-danger mt-2">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" name="password" className="form-control" value={form.password} onChange={handleChange} required />
          </div>
          <button className="btn btn-primary w-100">Login</button>
        </form>
        <p className="text-center mt-3 mb-0">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
      </div>
    </div>
  );
};

export default Login;
