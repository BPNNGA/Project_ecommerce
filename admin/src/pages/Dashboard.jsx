import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';


const Dashboard = ({ token }) => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          backendUrl + '/api/order/analytics',
          { headers: { token } }
        );
        if (response.data.success) {
          setAnalytics(response.data);
        } else {
          setError('Failed to fetch analytics');
        }
      } catch (err) {
        setError('Failed to fetch analytics');
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchAnalytics();
  }, [token]);

  if (loading) {
    return <div className="surface p-8 text-center">Loading analytics...</div>;
  }
  if (error) {
    return <div className="surface p-8 text-center text-red-500">{error}</div>;
  }
  if (!analytics) {
    return null;
  }
  const { totalSales, totalOrders, totalUsers, topProducts } = analytics;

  return (
    <div className="surface p-8">
      <h1 className="text-3xl font-bold mb-6 text-[var(--admin-accent)]">Admin Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-lg text-[var(--admin-muted)]">Total Sales</span>
          <span className="text-2xl font-bold text-green-600 mt-2">Rs. {totalSales}</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-lg text-[var(--admin-muted)]">Total Orders</span>
          <span className="text-2xl font-bold text-blue-600 mt-2">{totalOrders}</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-lg text-[var(--admin-muted)]">Total Users</span>
          <span className="text-2xl font-bold text-purple-600 mt-2">{totalUsers}</span>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-[var(--admin-accent)]">Top Selling Products</h2>
        <ul>
          {topProducts && topProducts.length > 0 ? (
            topProducts.map((product, idx) => (
              <li key={idx} className="flex justify-between py-2 border-b last:border-b-0">
                <span>{product.name}</span>
                <span className="font-bold text-[var(--admin-accent)]">{product.sales} sales</span>
              </li>
            ))
          ) : (
            <li className="text-[var(--admin-muted)]">No sales data available.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard; 