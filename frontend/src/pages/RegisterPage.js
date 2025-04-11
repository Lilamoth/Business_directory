import React, { useState } from 'react';
import axios from 'axios';
import './AuthForm.css'; // Optional, for styling

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    businessType: '',
    contact: '',
    description: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        ...formData,
        role: 'business'
      });
      setMessage('✅ Registered successfully. You can now log in.');
    } catch (err) {
      setMessage('❌ Registration failed.');
      console.error(err);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Register Your Business</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Business Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="businessType" placeholder="Business Type" onChange={handleChange} />
        <input type="text" name="contact" placeholder="Contact Info" onChange={handleChange} />
        <textarea name="description" placeholder="Short Description" onChange={handleChange}></textarea>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
