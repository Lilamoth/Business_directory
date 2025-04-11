import React from 'react';

const BusinessProducts = ({ products }) => {
  return (
    <ul className="grid gap-4">
      {products.map((product) => (
        <li
          key={product._id}
          className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-green-700 font-bold mt-1">${parseFloat(product.price).toFixed(2)}</p>
          <p className="text-sm text-gray-600 mt-1">
            Status:{" "}
            <span className={product.available ? "text-green-600" : "text-red-600"}>
              {product.available ? "Available" : "Unavailable"}
            </span>
          </p>
        </li>
      ))}
    </ul>
  );
};

export default BusinessProducts;
