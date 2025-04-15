// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import BusinessDashboard from './pages/BusinessDashboard';
import UserDashboard from './pages/UserDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import MessagingPage from './pages/MessagingPage';
import Home from './pages/Home';
import './styles/theme.css';
import ActivityLogPage from './pages/ActivityLogPage';


function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);

  const handleLogin = (id, authToken, userRole) => {
    // ✅ Strip any accidental "b_" or "u_" prefix before saving
    const cleanId = id.replace(/^b_/, '').replace(/^u_/, '');
    setUserId(cleanId);
    setToken(authToken);
    setRole(userRole);
  };

  const handleLogout = () => {
    setUserId(null);
    setToken(null);
    setRole(null);
  };

  return (
    <Router>
      <MainRouter
        token={token}
        userId={userId}
        role={role}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
    </Router>
  );
}

// Separate component for conditional Navbar rendering
const MainRouter = ({ token, userId, role, onLogin, onLogout }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      {!isHomePage && <Navbar onLogout={onLogout} token={token} role={role} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/login"
          element={
            token && role
              ? role === 'business'
                ? <Navigate to="/dashboard" />
                : <Navigate to="/user-dashboard" />
              : <Login onLogin={onLogin} />
          }
        />

        <Route
          path="/dashboard"
          element={
            token && role === 'business'
              ? <BusinessDashboard businessId={userId} token={token} onLogout={onLogout} />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/user-dashboard"
          element={
            token && role === 'user'
              ? <UserDashboard userId={userId} token={token} />
              : <Navigate to="/login" />
          }
        />

        <Route
          path="/messages"
          element={token ? <MessagingPage token={token} /> : <Navigate to="/login" />}
        />

        <Route
          path="/activity-log"
          element={token && role === 'business' ? <ActivityLogPage token={token} /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
};

export default App;
