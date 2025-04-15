import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BusinessProductModal from '../components/BusinessProductModal';
import '../pages/UserDashboard.css';

const UserDashboard = ({ userId, token }) => {
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [recipientBusiness, setRecipientBusiness] = useState(null);

  // ✅ Log token for debug (optional)
  useEffect(() => {
    console.log('📦 Token from props:', token);
  }, [token]);

  // ✅ Fetch businesses using dynamic token
  useEffect(() => {
    if (!token) return;

    axios
      .get('http://localhost:5000/api/businesses', {
        headers: {
          Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Y3MTg2MjMzN2JiMDliODJlYWMyZTEiLCJyb2xlIjoiYnVzaW5lc3MiLCJpYXQiOjE3NDQ1OTcxNjksImV4cCI6MTc0NDY4MzU2OX0.CCjba1zqPlspWvZ0CTtK5XQT7qw6SZcmyDWCdzdbvIk'}`
        }
      })
      .then(res => setBusinesses(res.data))
      .catch(err => console.error('Error fetching businesses:', err));
  }, [token]);

  // ✅ Filter businesses by search
  useEffect(() => {
    const filtered = businesses.filter((biz) =>
      biz.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (biz.description || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBusinesses(filtered);
  }, [searchTerm, businesses]);

  // ✅ Send message to business
  const handleSendMessage = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/messages',
        {
          recipient: recipientBusiness._id,
          content: messageContent,
        },
        {
          headers: {
            Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Y3MTg2MjMzN2JiMDliODJlYWMyZTEiLCJyb2xlIjoiYnVzaW5lc3MiLCJpYXQiOjE3NDQ1OTcxNjksImV4cCI6MTc0NDY4MzU2OX0.CCjba1zqPlspWvZ0CTtK5XQT7qw6SZcmyDWCdzdbvIk'}`
          },
        }
      );
      alert('✅ Message sent successfully!');
      setMessageModalOpen(false);
      setMessageContent('');
    } catch (err) {
      console.error('Error sending message:', err);
      alert('❌ Failed to send message.');
    }
  };

  return (
    <div className="user-dashboard">
      <h1>📇 Explore Businesses</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search businesses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="business-grid">
        {filteredBusinesses.map((biz) => (
          <div key={biz._id} className="business-card">
            <div className="biz-icon">{biz.name.slice(0, 2).toUpperCase()}</div>
            <div className="biz-info">
              <h3>{biz.name}</h3>
              <p>{biz.description || 'No description provided.'}</p>
              <div className="tag">{biz.businessType || 'Other'}</div>
            </div>
            <div className="biz-actions">
              <button onClick={() => setSelectedBusiness(biz._id)}>View Products</button>
              <button
                className="msg-btn"
                onClick={() => {
                  setRecipientBusiness(biz);
                  setMessageModalOpen(true);
                }}
              >
                Message
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Modal for viewing products */}
      {selectedBusiness && (
        <BusinessProductModal
          businessId={selectedBusiness}
          onClose={() => setSelectedBusiness(null)}
        />
      )}

      {/* ✅ Modal for sending message */}
      {messageModalOpen && recipientBusiness && (
        <div className="message-modal">
          <div className="message-box">
            <h2>📨 Message {recipientBusiness.name}</h2>
            <textarea
              placeholder="Type your message here..."
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              rows={5}
            />
            <div className="message-buttons">
              <button onClick={handleSendMessage}>Send</button>
              <button onClick={() => setMessageModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
