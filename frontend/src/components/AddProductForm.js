import React, { useState } from 'react';
import axios from 'axios';
import './AddProductForm.css';


const AddProductForm = ({ token, businessId, onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    available: true,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = { ...formData, businessId };

      await axios.post('http://localhost:5000/api/products', productData, {
        headers: {
          Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2Y3MTg2MjMzN2JiMDliODJlYWMyZTEiLCJyb2xlIjoiYnVzaW5lc3MiLCJpYXQiOjE3NDQ1OTcxNjksImV4cCI6MTc0NDY4MzU2OX0.CCjba1zqPlspWvZ0CTtK5XQT7qw6SZcmyDWCdzdbvIk'}`
        }
      });

      setMessage('✅ Product added successfully!');
      setFormData({
        name: '',
        description: '',
        price: '',
        available: true,
      });

      if (onProductAdded) onProductAdded(); // Refresh products
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to add product.');
    }
  };

  return (
    <div className="form-card">
      <h2 className="text-lg font-semibold text-center mb-2">Add New Product</h2>
      {message && <p className="text-center text-sm mb-2">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Enter product name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Enter product description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Enter price"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <label>
        <div style={{ display: 'center', alignItems: 'left', gap: '0.5rem', marginTop: '1rem' }}>
  <input
    type="checkbox"
    name="available"
    checked={formData.available}
    onChange={handleChange}
    id="available"
  />
  <label htmlFor="available" style={{ margin: 0 }}>Available</label>
</div>


        </label>
        <button type="submit" className="btn bg-cyan-500">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;
