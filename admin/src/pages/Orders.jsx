import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { FaBox, FaTruck, FaCheckCircle, FaClock, FaExclamationTriangle, FaUser, FaMapMarkerAlt, FaPhone, FaCalendarAlt, FaCreditCard, FaEye, FaEdit } from 'react-icons/fa';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value},
        { headers: { token } } 
      );
      if (response.data.success) {
        toast.success("Order status updated successfully!");
        await fetchAllOrders();
      } 
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'delivered':
        return <FaCheckCircle className="w-5 h-5 text-green-600" />;
      case 'shipped':
      case 'out for delivery':
        return <FaTruck className="w-5 h-5 text-blue-600" />;
      case 'packing':
        return <FaClock className="w-5 h-5 text-yellow-600" />;
      case 'order placed':
        return <FaBox className="w-5 h-5 text-gray-600" />;
      default:
        return <FaBox className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'shipped':
      case 'out for delivery':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'packing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'order placed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status.toLowerCase() === filterStatus.toLowerCase());

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--admin-bg)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--admin-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--admin-muted)]">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--admin-bg)] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--admin-text)] mb-2">Order Management</h1>
          <p className="text-[var(--admin-muted)]">Manage and track all customer orders</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="surface p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--admin-muted)]">Total Orders</p>
                <p className="text-2xl font-bold text-[var(--admin-text)]">{orders.length}</p>
              </div>
              <div className="w-12 h-12 bg-[var(--admin-accent)]/10 rounded-lg flex items-center justify-center">
                <FaBox className="w-6 h-6 text-[var(--admin-accent)]" />
              </div>
            </div>
          </div>

          <div className="surface p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--admin-muted)]">Pending</p>
                <p className="text-2xl font-bold text-[var(--admin-text)]">
                  {orders.filter(order => order.status.toLowerCase() === 'order placed').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FaClock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="surface p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--admin-muted)]">Shipped</p>
                <p className="text-2xl font-bold text-[var(--admin-text)]">
                  {orders.filter(order => ['shipped', 'out for delivery'].includes(order.status.toLowerCase())).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaTruck className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="surface p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--admin-muted)]">Delivered</p>
                <p className="text-2xl font-bold text-[var(--admin-text)]">
                  {orders.filter(order => order.status.toLowerCase() === 'delivered').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FaCheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="surface p-6 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[var(--admin-text)]">All Orders</h2>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 rounded-lg border border-[var(--admin-accent)]/20 bg-[var(--admin-surface)] text-[var(--admin-text)] focus:border-[var(--admin-accent)] outline-none"
            >
              <option value="all">All Orders</option>
              <option value="order placed">Order Placed</option>
              <option value="packing">Packing</option>
              <option value="shipped">Shipped</option>
              <option value="out for delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="surface p-12 text-center">
              <div className="w-24 h-24 bg-[var(--admin-accent)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaBox className="w-12 h-12 text-[var(--admin-accent)]" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--admin-text)] mb-2">No orders found</h3>
              <p className="text-[var(--admin-muted)]">No orders match the current filter criteria</p>
            </div>
          ) : (
            filteredOrders.map((order, index) => (
              <div key={index} className="surface p-6 hover:shadow-xl transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                  {/* Order Items */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[var(--admin-accent)]/10 rounded-lg flex items-center justify-center">
                        <FaBox className="w-6 h-6 text-[var(--admin-accent)]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[var(--admin-text)] mb-2">Order #{order._id.slice(-8)}</h3>
                        <div className="space-y-1">
                          {order.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex items-center justify-between text-sm">
                              <span className="text-[var(--admin-text)]">{item.name}</span>
                              <span className="text-[var(--admin-muted)]">x{item.quantity} ({item.size})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="lg:col-span-2">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <FaUser className="w-4 h-4 text-[var(--admin-accent)]" />
                        <span className="font-medium text-[var(--admin-text)]">
                          {order.address.firstName} {order.address.lastName}
                        </span>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <FaMapMarkerAlt className="w-4 h-4 text-[var(--admin-accent)] mt-0.5" />
                        <div className="text-sm text-[var(--admin-muted)]">
                          <p>{order.address.address}</p>
                          <p>{order.address.city}, {order.address.state}</p>
                          <p>{order.address.country} {order.address.zipcode}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <FaPhone className="w-4 h-4 text-[var(--admin-accent)]" />
                        <span className="text-sm text-[var(--admin-muted)]">{order.address.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="lg:col-span-1">
                    <div className="space-y-4">
                      {/* Payment Status */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[var(--admin-muted)]">Payment:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.payment ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {order.payment ? "Paid" : "Pending"}
                        </span>
                      </div>

                      {/* Order Date */}
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="w-4 h-4 text-[var(--admin-accent)]" />
                        <span className="text-sm text-[var(--admin-muted)]">
                          {new Date(order.date).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Payment Method */}
                      <div className="flex items-center gap-2">
                        <FaCreditCard className="w-4 h-4 text-[var(--admin-accent)]" />
                        <span className="text-sm text-[var(--admin-muted)]">{order.paymentMethod}</span>
                      </div>

                      {/* Total Amount */}
                      <div className="text-right">
                        <p className="text-lg font-bold text-[var(--admin-accent)]">
                          {currency}{order.amount}
                        </p>
                        <p className="text-xs text-[var(--admin-muted)]">{order.items.length} items</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Control */}
                <div className="mt-6 pt-6 border-t border-[var(--admin-accent)]/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(order.status)}
                      <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button className="p-2 rounded-lg hover:bg-[var(--admin-accent)]/10 transition-all duration-300">
                        <FaEye className="w-4 h-4 text-[var(--admin-accent)]" />
                      </button>
                      
                      <select 
                        onChange={(event) => statusHandler(event, order._id)} 
                        value={order.status} 
                        className="px-4 py-2 rounded-lg border border-[var(--admin-accent)]/20 bg-[var(--admin-surface)] text-[var(--admin-text)] focus:border-[var(--admin-accent)] outline-none text-sm"
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Packing">Packing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;



