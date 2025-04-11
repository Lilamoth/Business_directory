import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-hero">
      <div className="overlay" />
      <div className="hero-content">
        <h1 className="hero-title">Welcome to <span className="brand">BizDirectory</span></h1>
        <p className="hero-subtitle">
          Discover, Connect, and Grow with the Most Trusted Businesses Near You.
        </p>
        <div className="hero-buttons">
          <a href="/signup" className="btn hero-btn">Get Started</a>
          <a href="/login" className="btn hero-btn-alt">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
