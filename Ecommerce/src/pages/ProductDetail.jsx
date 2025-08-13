import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import RecommendedProducts from '../components/RecommendedProducts';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Show loading toast
        const loadingToast = toast.loading('Loading product details...', {
          position: "bottom-right",
          autoClose: false,
        });
        
        const response = await fetch(`/api/products/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setProduct(data);
        
        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
        toast.success('Product loaded successfully!', {
          position: "bottom-right",
          autoClose: 2000,
        });
      } catch (err) {
        console.error('Product fetch failed', err);
        setError('Failed to load product details');
        
        toast.error('Failed to load product. Please try again.', {
          position: "bottom-right",
          autoClose: 5000,
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleRetry = async () => {
    setError(null);
    setLoading(true);
    
    try {
      const response = await fetch(`/api/products/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setProduct(data);
      
      toast.success('Product loaded successfully!', {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (err) {
      console.error('Retry failed', err);
      setError('Failed to load product details');
      
      toast.error('Still unable to load product. Please check your connection.', {
        position: "bottom-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            {/* Breadcrumb skeleton */}
            <div className="bg-gray-200 h-4 w-48 rounded mb-6"></div>
            
            {/* Product skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image skeleton */}
              <div className="bg-gray-200 rounded-lg h-96"></div>
              
              {/* Content skeleton */}
              <div className="space-y-4">
                <div className="bg-gray-200 h-8 rounded w-3/4"></div>
                <div className="bg-gray-200 h-6 rounded w-1/4"></div>
                <div className="bg-gray-200 h-4 rounded w-full"></div>
                <div className="bg-gray-200 h-4 rounded w-5/6"></div>
                <div className="bg-gray-200 h-4 rounded w-4/6"></div>
                <div className="bg-gray-200 h-12 rounded w-1/3 mt-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load product</h3>
            <p className="text-gray-500 text-sm mb-6">{error}</p>
            <button 
              onClick={handleRetry} 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Product not found</h3>
            <p className="text-gray-500 text-sm">The product you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a href="/" className="text-gray-700 hover:text-blue-600 text-sm font-medium">
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="text-gray-500 text-sm font-medium ml-1">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-96 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="mb-6">
              <span className="text-3xl font-bold text-green-600">${product.price}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-lg text-gray-500 line-through ml-2">${product.originalPrice}</span>
              )}
            </div>

            {product.description && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {product.category && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Category</h3>
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
            )}

            {product.stock !== undefined && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Availability</h3>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  product.stock > 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </div>
            )}

            {/* Add to Cart Button */}
            <button 
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>

        {/* Recommended Products */}
        <RecommendedProducts productId={id} />
      </div>
    </div>
  );
};

export default ProductDetail;
