
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Register from './pages/register';
import Login from './pages//login';
import Home from './pages/home';
import Profile from './pages/profile';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
