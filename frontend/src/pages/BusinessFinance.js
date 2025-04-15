import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FinanceChart from '../components/FinanceChart';

const BusinessFinance = ({ businessId, token }) => {
  const [finance, setFinance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFinance = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/finance/business/${businessId}`, {
          headers: {
            Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Y3MTg2MjMzN2JiMDliODJlYWMyZTEiLCJyb2xlIjoiYnVzaW5lc3MiLCJpYXQiOjE3NDQ1OTcxNjksImV4cCI6MTc0NDY4MzU2OX0.CCjba1zqPlspWvZ0CTtK5XQT7qw6SZcmyDWCdzdbvIk'}`
          }
        });
        setFinance(res.data);
      } catch (err) {
        console.error('Error fetching finance:', err);
      } finally {
        setLoading(false);
      }
    };

    if (businessId && token) {
      fetchFinance();
    }
  }, [businessId, token]);

  if (loading) return <div className="text-white text-center">Loading finance data...</div>;

  if (!finance) return <div className="text-red-400 text-center">No financial data available.</div>;

  return (
    <div className="p-6 bg-gray-800 rounded shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">📊 Business Financial Metrics</h2>

      <FinanceChart revenueHistory={finance.revenueHistory || []} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-black">
        <div className="p-4 bg-white rounded shadow">📈 <strong>CAGR:</strong> {finance.CAGR ?? 'N/A'}%</div>
        <div className="p-4 bg-white rounded shadow">💹 <strong>ROI:</strong> {finance.ROI ?? 'N/A'}%</div>
        <div className="p-4 bg-white rounded shadow">💰 <strong>Profit Margin:</strong> {finance.profitMargin ?? 'N/A'}%</div>
        <div className="p-4 bg-white rounded shadow">📍 <strong>Customer Retention:</strong> {finance.customerRetentionRate ?? 'N/A'}%</div>
      </div>
    </div>
  );
};

export default BusinessFinance;
