import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MessagingPage.css';

const MessagingPage = ({ token }) => {
  const [recipientId, setRecipientId] = useState('');
  const [message, setMessage] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [inbox, setInbox] = useState([]);
  const [sent, setSent] = useState([]);
  const [success, setSuccess] = useState('');

  const headers = {
    headers: {
      Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Y3MTg2MjMzN2JiMDliODJlYWMyZTEiLCJyb2xlIjoiYnVzaW5lc3MiLCJpYXQiOjE3NDQyNDcxMDQsImV4cCI6MTc0NDMzMzUwNH0.VGwNtSSO3BV_WemvUS8ROvwxx8nGGjKYTUnQ_gl8rWU'}`,
    },
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/all', headers)
      .then(res => setRecipients(res.data))
      .catch(err => console.error('Error fetching recipients:', err));

    axios.get('http://localhost:5000/api/messages/inbox', headers)
      .then(res => setInbox(res.data))
      .catch(err => console.error('Error fetching inbox:', err));

    axios.get('http://localhost:5000/api/messages/sent', headers)
      .then(res => setSent(res.data))
      .catch(err => console.error('Error fetching sent:', err));
  }, [token]);

  const sendMessage = async (e) => {
    e.preventDefault();
    setSuccess('');

    if (!recipientId || !message) return;

    try {
      await axios.post(
        'http://localhost:5000/api/messages',
        { recipient: recipientId, content: message },
        headers
      );
      setMessage('');
      setSuccess('✅ Message sent!');
      setTimeout(() => setSuccess(''), 2000);
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  return (
    <div className="message-page">
      <h2 className="page-title">📧 Messaging Center</h2>

      <div className="message-box">
        <select
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
        >
          <option value="">Select recipient</option>
          {recipients.map(user => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>

        <textarea
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

        <button className="send-button" onClick={sendMessage}>Send Message</button>
        {success && <p className="success-text">{success}</p>}
      </div>

      <div className="message-columns">
        <div className="message-section">
          <h3>📥 Inbox</h3>
          {inbox.length === 0 ? (
            <p>No messages received.</p>
          ) : (
            inbox.map((msg, i) => (
              <div key={i} className="message-card">
                <div className="avatar">{msg.sender?.name?.[0] || 'U'}</div>
                <div>
                  <strong>{msg.sender?.name}</strong>
                  <p>{msg.content}</p>
                  <small>{new Date(msg.createdAt).toLocaleString()}</small>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="message-section">
          <h3>📤 Sent</h3>
          {sent.length === 0 ? (
            <p>No messages sent.</p>
          ) : (
            sent.map((msg, i) => (
              <div key={i} className="message-card sent">
                <div className="avatar">{msg.recipient?.name?.[0] || 'U'}</div>
                <div>
                  <strong>To: {msg.recipient?.name}</strong>
                  <p>{msg.content}</p>
                  <small>{new Date(msg.createdAt).toLocaleString()}</small>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;
