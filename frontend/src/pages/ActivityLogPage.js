// src/pages/ActivityLogPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ActivityLogPage = ({ token }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/activities/my', {
          headers: {
            Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Y3MTg2MjMzN2JiMDliODJlYWMyZTEiLCJyb2xlIjoiYnVzaW5lc3MiLCJpYXQiOjE3NDQyNDcxMDQsImV4cCI6MTc0NDMzMzUwNH0.VGwNtSSO3BV_WemvUS8ROvwxx8nGGjKYTUnQ_gl8rWU'}`
          }
        });
        setLogs(res.data);
      } catch (err) {
        console.error('Error fetching logs:', err);
      }
    };

    fetchLogs();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-black text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">📋 Activity Log</h1>
        {logs.length === 0 ? (
          <p className="text-gray-400">No activity logs yet.</p>
        ) : (
          <div className="space-y-4">
            {logs.map((log, index) => (
              <div
                key={index}
                className="bg-[#1e293b] p-4 rounded-lg border border-[#334155] shadow"
              >
                <p className="text-white font-semibold">{log.action}</p>
                <p className="text-sm text-gray-400">{new Date(log.timestamp).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityLogPage;
