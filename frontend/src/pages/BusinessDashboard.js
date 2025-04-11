import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BusinessProfile from './BusinessProfile';
import AddProductForm from '../components/AddProductForm';
import BusinessProducts from './BusinessProducts';
import FinanceChart from '../components/FinanceChart';

const BusinessDashboard = ({ businessId, token, onLogout }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showProducts, setShowProducts] = useState(true);
  const [filter, setFilter] = useState('all');
  const [financeData, setFinanceData] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products/business/${businessId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const fetchFinanceData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/finance/business/${businessId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFinanceData(res.data);
    } catch (err) {
      console.error('Error fetching finance data:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchFinanceData();
  }, [businessId]);

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
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-black text-white p-6">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Dashboard Header */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <span role="img" aria-label="folder">📁</span> Business Dashboard
          </h1>
        </div>

        {/* Profile and Add Product (Side by side on lg+) */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-[#1f2937] rounded-lg shadow-md p-6">
            <BusinessProfile businessId={businessId} token={token} onProfileUpdated={fetchProducts} />
          </div>

          <div className="bg-[#1f2937] rounded-lg shadow-md p-6">
            <AddProductForm businessId={businessId} token={token} onProductAdded={fetchProducts} />

            <div className="mt-4 flex justify-between items-center">
              <button
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
                onClick={() => setShowProducts(!showProducts)}
              >
                {showProducts ? 'Hide Products' : 'View Products'}
              </button>

              {showProducts && (
                <select
                  className="bg-gray-700 text-white px-3 py-2 rounded text-sm"
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

        {/* Products */}
        {showProducts && (
          <div className="bg-[#111827] p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span role="img" aria-label="box">📦</span> Your Products
            </h2>
            <BusinessProducts products={filteredProducts} />
          </div>
        )}

        {/* Finance Chart */}
        {financeData?.revenueHistory && (
          <div className="bg-[#1f1f3a] p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              📊 Financial Overview
            </h2>
            <FinanceChart revenueHistory={financeData.revenueHistory} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessDashboard;
