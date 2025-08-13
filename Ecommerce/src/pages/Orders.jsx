import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';
import { FaBox, FaTruck, FaCheckCircle, FaClock, FaExclamationTriangle, FaEye, FaMapMarkerAlt, FaCalendarAlt, FaCreditCard } from 'react-icons/fa';

const Orders = () => {
  const {backendUrl, token, currency} = useContext(ShopContext);

  const [orderData, setorderData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrderData = async () => {
    try {
      setLoading(true);
      if (!token) {
        return null;
      }

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
      if (response.data.success) {
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['data']= order.data;
            allOrdersItem.push(item);
          })
        })
      
        setorderData(allOrdersItem.reverse());
      }
      
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'delivered':
        return <FaCheckCircle className="w-5 h-5 text-green-600" />;
      case 'shipped':
        return <FaTruck className="w-5 h-5 text-blue-600" />;
      case 'processing':
        return <FaClock className="w-5 h-5 text-yellow-600" />;
      case 'cancelled':
        return <FaExclamationTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <FaBox className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-[var(--primary)]/5 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[var(--muted)]">Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--primary)]/5 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--primary)] mb-4">My Orders</h1>
          <p className="text-[var(--muted)]">Track your orders and view order history</p>
        </div>

        {/* Orders Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaBox className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <h3 className="font-bold text-[var(--text)]">{orderData.length}</h3>
              <p className="text-sm text-[var(--muted)]">Total Orders</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaTruck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-[var(--text)]">
                {orderData.filter(item => item.status?.toLowerCase() === 'shipped').length}
              </h3>
              <p className="text-sm text-[var(--muted)]">Shipped</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaCheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-[var(--text)]">
                {orderData.filter(item => item.status?.toLowerCase() === 'delivered').length}
              </h3>
              <p className="text-sm text-[var(--muted)]">Delivered</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaClock className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-bold text-[var(--text)]">
                {orderData.filter(item => item.status?.toLowerCase() === 'processing').length}
              </h3>
              <p className="text-sm text-[var(--muted)]">Processing</p>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orderData.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-24 h-24 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaBox className="w-12 h-12 text-[var(--primary)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text)] mb-2">No orders yet</h3>
              <p className="text-[var(--muted)] mb-6">Start shopping to see your orders here</p>
              <button className="bg-[var(--primary)] hover:bg-[var(--accent)] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300">
                Start Shopping
              </button>
            </div>
          ) : (
            orderData.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* Product Information */}
                  <div className="flex items-start gap-6">
                    <div className="relative">
                      <img 
                        src={item.image[0]} 
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl shadow-md" 
                        alt={item.name} 
                      />
                      <div className="absolute -top-2 -right-2 bg-[var(--primary)] text-white text-xs px-2 py-1 rounded-full">
                        {item.quantity}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-[var(--text)] mb-2">{item.name}</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                          <FaCalendarAlt className="w-4 h-4" />
                          <span>{new Date(item.date).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                          <FaCreditCard className="w-4 h-4" />
                          <span>{item.paymentMethod}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                          <FaMapMarkerAlt className="w-4 h-4" />
                          <span>Size: {item.size}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-semibold text-[var(--accent)]">
                            {currency}{item.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status and Actions */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(item.status)}
                      <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={loadOrderData} 
                        className="bg-[var(--primary)] hover:bg-[var(--accent)] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2"
                      >
                        <FaEye className="w-4 h-4" />
                        Track Order
                      </button>
                      
                      <button className="border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Order Progress (Optional) */}
                {item.status?.toLowerCase() === 'shipped' && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm text-[var(--muted)]">
                      <span>Order Placed</span>
                      <span>Processing</span>
                      <span>Shipped</span>
                      <span>Delivered</span>
                    </div>
                    <div className="mt-2 flex items-center">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-[var(--primary)] rounded-full" style={{width: '75%'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Orders
