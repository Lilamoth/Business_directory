import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to <span>BizDirectory</span></h1>
        <p className="hero-subtitle">
          Discover top businesses, explore services, and connect with trusted professionals.
        </p>
        <div className="hero-buttons">
          <a href="/signup" className="btn primary">Get Started</a>
          <a href="/dashboard" className="btn secondary">Explore</a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
