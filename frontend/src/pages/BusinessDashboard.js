import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BusinessProfile from './BusinessProfile';
import AddProductForm from '../components/AddProductForm';
import BusinessProducts from './BusinessProducts';
import FinanceChart from '../components/FinanceChart';
import '../styles/theme.css';

const BusinessDashboard = ({ businessId, token, onLogout }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(true);
  const [filter, setFilter] = useState('all');
  const [financeData, setFinanceData] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products/business/${businessId}`, {
        headers: { Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Y3MTg2MjMzN2JiMDliODJlYWMyZTEiLCJyb2xlIjoiYnVzaW5lc3MiLCJpYXQiOjE3NDQ1OTcxNjksImV4cCI6MTc0NDY4MzU2OX0.CCjba1zqPlspWvZ0CTtK5XQT7qw6SZcmyDWCdzdbvIk'}` }
      });
      setProducts(res.data);
    } catch (err) {
      console.error('❌ Error fetching products:', err);
    }
  };

  const fetchFinanceData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/finance/business/${businessId}`, {
        headers: { Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Y3MTg2MjMzN2JiMDliODJlYWMyZTEiLCJyb2xlIjoiYnVzaW5lc3MiLCJpYXQiOjE3NDQ1OTcxNjksImV4cCI6MTc0NDY4MzU2OX0.CCjba1zqPlspWvZ0CTtK5XQT7qw6SZcmyDWCdzdbvIk'}` }
      });
      setFinanceData(res.data);
    } catch (err) {
      console.error('❌ Error fetching finance data:', err);
    }
  };

  useEffect(() => {
    if (businessId && token) {
      fetchProducts();
      fetchFinanceData();
    }
  }, [businessId, token]);

  useEffect(() => {
    if (filter === 'available') {
      setFilteredProducts(products.filter(p => p.available));
    } else if (filter === 'unavailable') {
      setFilteredProducts(products.filter(p => !p.available));
    } else {
      setFilteredProducts(products);
    }
  }, [products, filter]);

  return (
    <div className="business-dashboard">
      <div className="dashboard-container">

        {/* Header */}
        <div className="dashboard-header">
          <h1>🧾 Business Dashboard</h1>
          <p>Manage your profile, products, and finances.</p>
        </div>

        {/* Profile + Product Form (Side-by-side layout) */}
        <div className="dashboard-flex">
          <div className="profile-section">
            <h2 className="section-title">👤 Profile</h2>
            <BusinessProfile
              businessId={businessId}
              token={token}
              onProfileUpdated={fetchProducts}
            />
          </div>

          <div className="product-section">
            <h2 className="section-title">➕ Add Product</h2>
            <AddProductForm
              businessId={businessId}
              token={token}
              onProductAdded={fetchProducts}
            />

            <div className="actions">
              <button
                className="toggle-btn"
                onClick={() => setShowProducts(!showProducts)}
              >
                {showProducts ? 'Hide Products' : 'View Products'}
              </button>

              {showProducts && (
                <select
                  className="filter"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                </select>
              )}
            </div>
          </div>
        </div>

        {/* Products Section */}
        {showProducts && (
          <div className="card">
            <h2>📦 Your Products</h2>
            <BusinessProducts products={filteredProducts} />
          </div>
        )}

        {/* Financial Chart */}
        <div className="card">
          <h2 className="text-center">📊 Financial Overview</h2>
          {financeData?.revenueHistory?.length > 0 ? (
            <FinanceChart revenueHistory={financeData.revenueHistory} />
          ) : (
            <p className="text-center">No financial data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard;
