import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ProductCard from './ProductCard';

const RecommendedProducts = ({ productId }) => {
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const apiUrl = `/api/recommendation/recommendations/${productId}`;
        console.log('Calling API URL:', apiUrl);
        
        // Show loading toast
        const loadingToast = toast.loading('Loading recommendations...', {
          position: "bottom-right",
          autoClose: false,
        });
        
        const response = await fetch(apiUrl);
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Response data:', data);
        setRecommended(data);
        
        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
        if (data.length > 0) {
          toast.success(`Found ${data.length} recommendations for you!`, {
            position: "bottom-right",
            autoClose: 3000,
          });
        } else {
          toast.info('No recommendations available at the moment.', {
            position: "bottom-right",
            autoClose: 3000,
          });
        }
      } catch (err) {
        console.error("Recommendation fetch failed", err);
        console.error("Error details:", err.message);
        setError('Failed to load recommendations');
        
        // Show error toast
        toast.error('Failed to load recommendations. Please try again.', {
          position: "bottom-right",
          autoClose: 5000,
        });
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchRecommended();
    }
  }, [productId]);

  const handleRetry = async () => {
    setError(null);
    setLoading(true);
    
    try {
      const response = await fetch(`/api/recommendation/recommendations/${productId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setRecommended(data);
      
      toast.success('Recommendations loaded successfully!', {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (err) {
      console.error("Retry failed", err);
      setError('Failed to load recommendations');
      
      toast.error('Still unable to load recommendations. Please check your connection.', {
        position: "bottom-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recommended for You</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-36 mb-3"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-6 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recommended for You</h3>
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm mb-4">{error}</p>
          <button 
            onClick={handleRetry} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (recommended.length === 0) {
    return (
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recommended for You</h3>
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">No recommendations available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Recommended for You</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {recommended.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;


