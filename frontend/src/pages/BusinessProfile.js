import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BusinessProfile.css'; // 👈 We’ll add new styles here

const BusinessProfile = ({ businessId, token, onProfileUpdated }) => {
  const [business, setBusiness] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    businessType: '',
    contact: '',
    description: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/businesses/${businessId}`, {
          headers: { Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Y3MTg2MjMzN2JiMDliODJlYWMyZTEiLCJyb2xlIjoiYnVzaW5lc3MiLCJpYXQiOjE3NDQyNDcxMDQsImV4cCI6MTc0NDMzMzUwNH0.VGwNtSSO3BV_WemvUS8ROvwxx8nGGjKYTUnQ_gl8rWU'}` }
        });
        setBusiness(res.data);
        setFormData({
          name: res.data.name || '',
          businessType: res.data.businessType || '',
          contact: res.data.contact || '',
          description: res.data.description || ''
        });
      } catch (err) {
        console.error('Error fetching business:', err);
      }
    };
    fetchBusiness();
  }, [businessId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/api/businesses/${businessId}`, formData, {
        headers: { Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Y3MTg2MjMzN2JiMDliODJlYWMyZTEiLCJyb2xlIjoiYnVzaW5lc3MiLCJpYXQiOjE3NDQyNDcxMDQsImV4cCI6MTc0NDMzMzUwNH0.VGwNtSSO3BV_WemvUS8ROvwxx8nGGjKYTUnQ_gl8rWU'}` }
      });
      setBusiness(res.data);
      setEditing(false);
      setMessage('✅ Profile updated!');
      onProfileUpdated && onProfileUpdated(); // refresh products
    } catch (err) {
      console.error('Update error:', err);
      setMessage('❌ Failed to update profile');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete your business profile?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/businesses/${businessId}`, {
        headers: { Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Y3MTg2MjMzN2JiMDliODJlYWMyZTEiLCJyb2xlIjoiYnVzaW5lc3MiLCJpYXQiOjE3NDQyNDcxMDQsImV4cCI6MTc0NDMzMzUwNH0.VGwNtSSO3BV_WemvUS8ROvwxx8nGGjKYTUnQ_gl8rWU'}` }
      });
      alert('✅ Profile deleted. Logging out...');
      window.location.reload();
    } catch (err) {
      console.error('Delete error:', err);
      alert('❌ Failed to delete profile');
    }
  };

  if (!business) return <p className="loading-text">Loading business profile...</p>;

  return (
    <div className="profile-container">
      {!editing ? (
        <div className="profile-view">
          <h2>{business.name}</h2>
          <p><strong>Type:</strong> {business.businessType}</p>
          <p><strong>Contact:</strong> {business.contact}</p>
          <p><strong>Description:</strong> {business.description}</p>
          <div className="btn-group">
            <button className="btn edit" onClick={() => setEditing(true)}>Edit Profile</button>
            <button className="btn delete" onClick={handleDelete}>Delete Profile</button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleUpdate} className="profile-edit-form">
          <h2>Edit Profile</h2>
          <input type="text" name="name" placeholder="Business Name" value={formData.name} onChange={handleChange} required />
          <input type="text" name="businessType" placeholder="Business Type" value={formData.businessType} onChange={handleChange} required />
          <input type="text" name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}></textarea>
          <div className="btn-group">
            <button type="submit" className="btn save">Save</button>
            <button type="button" className="btn cancel" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default BusinessProfile;
