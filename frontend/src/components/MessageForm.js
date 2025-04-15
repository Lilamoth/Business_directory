import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MessageForm.css';

const MessageForm = ({ token }) => {
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  // Fetch recipient list (all users except self)
  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/businesses', {
          headers: { Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Y3MTg2MjMzN2JiMDliODJlYWMyZTEiLCJyb2xlIjoiYnVzaW5lc3MiLCJpYXQiOjE3NDQ1OTcxNjksImV4cCI6MTc0NDY4MzU2OX0.CCjba1zqPlspWvZ0CTtK5XQT7qw6SZcmyDWCdzdbvIk'}` },
        });
        setRecipients(res.data);
      } catch (err) {
        console.error('Error fetching recipients:', err);
      }
    };

    fetchRecipients();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await axios.post(
        'http://localhost:5000/api/messages',
        {
          recipient: selectedRecipient,
          content,
        },
        {
          headers: { Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Y3MTg2MjMzN2JiMDliODJlYWMyZTEiLCJyb2xlIjoiYnVzaW5lc3MiLCJpYXQiOjE3NDQ1OTcxNjksImV4cCI6MTc0NDY4MzU2OX0.CCjba1zqPlspWvZ0CTtK5XQT7qw6SZcmyDWCdzdbvIk'}` },
        }
      );
      setMessage('✅ Message sent!');
      setContent('');
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to send message');
    }
  };

  return (
    <div className="message-form">
      <h3 className="form-title">Send a Message</h3>
      {message && <p className="status-msg">{message}</p>}

      <form onSubmit={handleSubmit}>
        <select
          value={selectedRecipient}
          onChange={(e) => setSelectedRecipient(e.target.value)}
          required
        >
          <option value="">Select a recipient</option>
          {recipients.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>

        <textarea
          rows={4}
          placeholder="Type your message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <button type="submit" className="form-submit">Send</button>
      </form>
    </div>
  );
};

export default MessageForm;
