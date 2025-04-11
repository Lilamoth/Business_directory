import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

const FinanceChart = ({ businessId, token }) => {
  const [financeData, setFinanceData] = useState([]);

  const fetchFinance = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/finance/business/${businessId}`, {
        headers: {
          Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Y3MTg2MjMzN2JiMDliODJlYWMyZTEiLCJyb2xlIjoiYnVzaW5lc3MiLCJpYXQiOjE3NDQyNDcxMDQsImV4cCI6MTc0NDMzMzUwNH0.VGwNtSSO3BV_WemvUS8ROvwxx8nGGjKYTUnQ_gl8rWU'}`,
        },
      });
      setFinanceData(res.data);
    } catch (err) {
      console.error('Error fetching finance data:', err);
    }
  };

  useEffect(() => {
    fetchFinance();
  }, [businessId]);

  const data = {
    labels: financeData.map((f) => f.year),
    datasets: [
      {
        label: 'Revenue',
        data: financeData.map((f) => f.revenue),
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.4,
      },
      {
        label: 'CAGR',
        data: financeData.map((f) => f.cagr),
        borderColor: 'orange',
        tension: 0.4,
      },
    ],
  };

  return (
    <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px' }}>
      <h3>📈 Financial Statistics</h3>
      {financeData.length > 0 ? (
        <Line data={data} />
      ) : (
        <p style={{ color: '#000' }}>Loading finance data...</p>
      )}
    </div>
  );
};

export default FinanceChart;
