import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">🏢 BizDirectory</h2>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/messages">Messages</Link>
        <Link to="/activity-log">Activity Log</Link>
        <Link to="/settings">Settings</Link>
        <button className="logout-btn">Logout</button>
      </nav>
    </div>
  );
};

export default Sidebar;
