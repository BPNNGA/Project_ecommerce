import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { FaUser, FaEnvelope, FaCalendar, FaMapMarkerAlt, FaPhone, FaEdit, FaCog, FaHistory, FaHeart, FaShieldAlt } from 'react-icons/fa';

const MyProfile = () => {
  const { user } = useContext(ShopContext);
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-[var(--primary)]/5 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--muted)]">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--primary)]/5 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--primary)] mb-4">My Profile</h1>
          <p className="text-[var(--muted)]">Manage your account and view your information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUser className="w-8 h-8 text-[var(--primary)]" />
                </div>
                <h3 className="font-bold text-[var(--text)]">{user.name}</h3>
                <p className="text-sm text-[var(--muted)]">Member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-2">
                {[
                  { id: 'profile', label: 'Profile', icon: FaUser },
                  { id: 'orders', label: 'Order History', icon: FaHistory },
                  { id: 'wishlist', label: 'Wishlist', icon: FaHeart },
                  { id: 'settings', label: 'Account Settings', icon: FaCog },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeTab === tab.id
                        ? 'bg-[var(--primary)] text-white shadow-lg'
                        : 'text-[var(--muted)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-8">
                {/* Personal Information */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <FaUser className="w-6 h-6 text-[var(--primary)]" />
                    <h2 className="text-2xl font-bold text-[var(--text)]">Personal Information</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[var(--muted)] mb-2">Full Name</label>
                      <div className="flex items-center gap-3 p-4 bg-[var(--primary)]/5 rounded-lg">
                        <FaUser className="w-5 h-5 text-[var(--primary)]" />
                        <span className="text-[var(--text)] font-medium">{user.name}</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-[var(--muted)] mb-2">Email Address</label>
                      <div className="flex items-center gap-3 p-4 bg-[var(--primary)]/5 rounded-lg">
                        <FaEnvelope className="w-5 h-5 text-[var(--primary)]" />
                        <span className="text-[var(--text)] font-medium">{user.email}</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-[var(--muted)] mb-2">Member Since</label>
                      <div className="flex items-center gap-3 p-4 bg-[var(--primary)]/5 rounded-lg">
                        <FaCalendar className="w-5 h-5 text-[var(--primary)]" />
                        <span className="text-[var(--text)] font-medium">
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-[var(--muted)] mb-2">Account Status</label>
                      <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                        <FaShieldAlt className="w-5 h-5 text-green-600" />
                        <span className="text-green-600 font-medium">Active</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button className="bg-[var(--primary)] hover:bg-[var(--accent)] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2">
                      <FaEdit className="w-4 h-4" />
                      Edit Profile
                    </button>
                  </div>
                </div>

                {/* Address Information */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <FaMapMarkerAlt className="w-6 h-6 text-[var(--primary)]" />
                    <h2 className="text-2xl font-bold text-[var(--text)]">Address Information</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-[var(--muted)] mb-2">Default Address</label>
                      <div className="p-4 bg-[var(--primary)]/5 rounded-lg">
                        <p className="text-[var(--text)]">No address saved yet</p>
                        <p className="text-sm text-[var(--muted)] mt-1">Add your default shipping address</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-[var(--muted)] mb-2">Phone Number</label>
                      <div className="flex items-center gap-3 p-4 bg-[var(--primary)]/5 rounded-lg">
                        <FaPhone className="w-5 h-5 text-[var(--primary)]" />
                        <span className="text-[var(--text)]">Not provided</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button className="bg-[var(--secondary)] hover:bg-[var(--accent)] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300">
                      Add Address
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FaHistory className="w-6 h-6 text-[var(--primary)]" />
                  <h2 className="text-2xl font-bold text-[var(--text)]">Order History</h2>
                </div>
                
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaHistory className="w-12 h-12 text-[var(--primary)]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--text)] mb-2">No orders yet</h3>
                  <p className="text-[var(--muted)] mb-6">Start shopping to see your order history here</p>
                  <button className="bg-[var(--primary)] hover:bg-[var(--accent)] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300">
                    Start Shopping
                  </button>
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FaHeart className="w-6 h-6 text-[var(--primary)]" />
                  <h2 className="text-2xl font-bold text-[var(--text)]">My Wishlist</h2>
                </div>
                
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaHeart className="w-12 h-12 text-[var(--primary)]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--text)] mb-2">Your wishlist is empty</h3>
                  <p className="text-[var(--muted)] mb-6">Save items you love to your wishlist</p>
                  <button className="bg-[var(--primary)] hover:bg-[var(--accent)] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300">
                    Browse Products
                  </button>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <FaCog className="w-6 h-6 text-[var(--primary)]" />
                    <h2 className="text-2xl font-bold text-[var(--text)]">Account Settings</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border border-[var(--primary)]/20 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-[var(--text)]">Email Notifications</h3>
                        <p className="text-sm text-[var(--muted)]">Receive updates about orders and promotions</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--primary)]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-[var(--primary)]/20 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-[var(--text)]">SMS Notifications</h3>
                        <p className="text-sm text-[var(--muted)]">Get order updates via text message</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[var(--primary)]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--primary)]"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-[var(--primary)]/20 rounded-lg">
                      <div>
                        <h3 className="font-semibold text-[var(--text)]">Two-Factor Authentication</h3>
                        <p className="text-sm text-[var(--muted)]">Add an extra layer of security to your account</p>
                      </div>
                      <button className="bg-[var(--primary)] hover:bg-[var(--accent)] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300">
                        Enable
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-xl font-bold text-[var(--text)] mb-6">Danger Zone</h3>
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <h4 className="font-semibold text-red-800 mb-2">Delete Account</h4>
                    <p className="text-sm text-red-600 mb-4">This action cannot be undone. All your data will be permanently deleted.</p>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile; 