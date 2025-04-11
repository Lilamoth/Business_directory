import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // make sure this file exists

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [role, setRole] = useState('business');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { ...formData, role });
      const { token, user } = res.data;
      if (user.role !== role) {
        setError(`⚠️ You're logging in as "${role}" but your account is registered as "${user.role}".`);
        return;
      }
      onLogin(user._id, token, user.role);
    } catch (err) {
      console.error(err);
      setError('❌ Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="login-title">Welcome to BizDirectory</h2>
        <p className="login-sub">Please login to continue</p>

        <div className="role-selector">
          <button className={role === 'business' ? 'active' : ''} onClick={() => setRole('business')}>
            Business
          </button>
          <button className={role === 'user' ? 'active' : ''} onClick={() => setRole('user')}>
            User
          </button>
        </div>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit-btn">Login</button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
