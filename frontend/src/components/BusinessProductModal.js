// src/components/BusinessProductModal.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BusinessProductModal = ({ businessId, onClose }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (businessId) {
      axios.get(`http://localhost:5000/api/products/business/${businessId}`)
        .then(res => setProducts(res.data))
        .catch(err => console.error('Error fetching products:', err));
    }
  }, [businessId]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-black text-lg font-bold">✕</button>
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <ul className="space-y-3">
            {products.map(product => (
              <li key={product._id} className="border-b pb-2">
                <p><strong>{product.name}</strong></p>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-sm">💰 ${product.price}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BusinessProductModal;
