// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Optional: you can remove if unused
import '../styles/theme.css'; // Make sure theme styles are applied

const Navbar = ({ token, role, onLogout }) => {
  return (
    <nav className="card dashboard-header" style={{ background: '#111', padding: '1rem 2rem', borderRadius: '0 0 12px 12px' }}>
      <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#fff' }}>BizDirectory</h2>
      <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
        {!token && (
          <>
            <li><Link to="/login" className="glow-btn small">Login</Link></li>
            <li><Link to="/signup" className="glow-btn small">Sign Up</Link></li>
          </>
        )}

        {token && role === 'business' && (
          <>
            <li><Link to="/dashboard" className="glow-btn small">Dashboard</Link></li>
            <li><Link to="/messages" className="glow-btn small">Messages</Link></li>
            <li><Link to="/activity-log" className="glow-btn small">Activity Log</Link></li>
            <li>
              <button onClick={onLogout} className="btn" style={{ backgroundColor: '#e11d48' }}>
                Logout
              </button>
            </li>
          </>
        )}

        {token && role === 'user' && (
          <>
            <li><Link to="/user-dashboard" className="glow-btn small">Dashboard</Link></li>
            <li><Link to="/messages" className="glow-btn small">Messages</Link></li>
            <li>
              <button onClick={onLogout} className="btn" style={{ backgroundColor: '#e11d48' }}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
