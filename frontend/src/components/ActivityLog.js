import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ActivityLog = ({ token }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities/my', {
      headers: {
        Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Y3MTg2MjMzN2JiMDliODJlYWMyZTEiLCJyb2xlIjoiYnVzaW5lc3MiLCJpYXQiOjE3NDQyNDcxMDQsImV4cCI6MTc0NDMzMzUwNH0.VGwNtSSO3BV_WemvUS8ROvwxx8nGGjKYTUnQ_gl8rWU'}`
      }
    })
    .then(res => setLogs(res.data))
    .catch(err => console.error('Failed to fetch activity logs:', err));
  }, [token]);

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg mt-6 text-white">
      <h2 className="text-xl font-bold mb-4">🕒 Activity Log</h2>
      <ul className="space-y-3 max-h-64 overflow-y-auto">
        {logs.map((log, index) => (
          <li key={index} className="border-b border-gray-700 pb-2">
            <span className="font-semibold">{log.action}</span>
            <div className="text-sm text-gray-400">{new Date(log.timestamp).toLocaleString()}</div>
          </li>
        ))}
        {logs.length === 0 && <p className="text-gray-400">No activity recorded yet.</p>}
      </ul>
    </div>
  );
};

export default ActivityLog;
