import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

const Signup = () => {
  const [role, setRole] = useState('business');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    businessType: '',
    contact: '',
    description: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const payload = {
        ...formData,
        role,
      };

      if (role === 'user') {
        delete payload.businessType;
        delete payload.contact;
        delete payload.description;
      }

      await axios.post('http://localhost:5000/api/auth/register', payload);
      setMessage('✅ Registration successful! You can now log in.');
    } catch (err) {
      console.error(err);
      setError('❌ Registration failed. Please try again.');
    }
  };

  return (
    <div className="form-page">
      <div className="form-box">
        <h2 className="form-title">Sign Up</h2>

        <div className="role-toggle">
          <button className={role === 'business' ? 'active' : ''} onClick={() => setRole('business')}>
            Business
          </button>
          <button className={role === 'user' ? 'active' : ''} onClick={() => setRole('user')}>
            User
          </button>
        </div>

        {error && <p className="form-error">{error}</p>}
        {message && <p className="form-success">{message}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

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

          {role === 'business' && (
            <>
              <input
                type="text"
                name="businessType"
                placeholder="Business Type"
                value={formData.businessType}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="contact"
                placeholder="Contact Info"
                value={formData.contact}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Short Business Description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </>
          )}

          <button type="submit" className="form-submit">Register</button>
        </form>

        <p className="form-footer">Already have an account? <a href="/">Login</a></p>
      </div>
    </div>
  );
};

export default Signup;
