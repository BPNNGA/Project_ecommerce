import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="card border border-gray-200 rounded-xl p-3 w-52 text-center m-3 shadow-sm hover:shadow-xl hover:scale-105 transition-transform duration-200 bg-white/90">
      <img 
        src={Array.isArray(product.image) ? product.image[0] : product.image} 
        alt={product.name} 
        className="w-full h-40 object-cover rounded-lg mb-2.5 shadow-md" 
      />
      <h4 className="mt-2.5 mb-2.5 text-lg font-bold text-[var(--primary)]">{product.name}</h4>
      <p className="font-bold text-green-600 text-lg mb-2">${product.price}</p>
      {typeof product.stock === 'number' && product.stock === 0 && (
        <div className="text-xs font-semibold text-red-600 mb-2">Out of Stock</div>
      )}
      <Link 
        to={`/product/${product._id}`} 
        className="inline-block mt-2 px-4 py-2 bg-[var(--primary)] text-white rounded-full shadow hover:bg-[var(--accent)] transition-colors font-semibold text-sm disabled:bg-gray-400"
        aria-disabled={product.stock === 0}
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
