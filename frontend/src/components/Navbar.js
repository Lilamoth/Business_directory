// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ token, role, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">BizDirectory</h1>
      </div>

      <div className="navbar-right">
        {!token && (
          <>
            <Link to="/login" className="nav-btn">Login</Link>
            <Link to="/signup" className="nav-btn">Sign Up</Link>
          </>
        )}

        {token && role === 'business' && (
          <>
            <Link to="/dashboard" className="nav-btn">Dashboard</Link>
            <Link to="/messages" className="nav-btn">Messages</Link>
            <Link to="/activity-log" className="nav-btn">Activity Log</Link>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </>
        )}

        {token && role === 'user' && (
          <>
            <Link to="/user-dashboard" className="nav-btn">Dashboard</Link>
            <Link to="/messages" className="nav-btn">Messages</Link>
            <button onClick={onLogout} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
