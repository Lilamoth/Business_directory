// src/pages/BusinessProducts.js
import React from 'react';
import './BusinessProducts.css';

const BusinessProducts = ({ products }) => {
  if (!products || products.length === 0) {
    return <p className="no-products">No products found.</p>;
  }

  return (
    <div className="products-grid">
      {products.map((product) => (
        <div key={product._id} className="product-card">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p><strong>${parseFloat(product.price).toFixed(2)}</strong></p>
          <p className={product.available ? 'available' : 'unavailable'}>
            {product.available ? '✅ Available' : '❌ Unavailable'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BusinessProducts;
