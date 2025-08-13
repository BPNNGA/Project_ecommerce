import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
    }
    
  }, [cartItems, products]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--primary)]/5 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--primary)] mb-4">Your Shopping Cart</h1>
          <p className="text-[var(--muted)]">
            Review your items and proceed to checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Cart Header */}
              <div className="bg-[var(--primary)]/5 px-6 py-4 border-b">
                <h2 className="text-xl font-bold text-[var(--text)]">Cart Items ({cartData.length})</h2>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-gray-100">
                {cartData.map((item, index) => {
                  const productData = products.find(
                    (product) => product._id === item._id
                  );
                  
                  if (!productData) return null;
                  
                  return (
                    <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-6">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={productData.image[0]}
                            className="w-20 h-20 object-cover rounded-lg shadow-md"
                            alt={productData.name}
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-[var(--text)] mb-2">
                            {productData.name}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-[var(--muted)]">
                            <span className="font-semibold text-[var(--accent)]">
                              {currency}{productData.price}
                            </span>
                            <span className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-xs font-medium">
                              Size: {item.size}
                            </span>
                          </div>
                        </div>

                        {/* Quantity Control */}
                        <div className="flex items-center gap-3">
                          <input 
                            onChange={(e) => {
                              const raw = e.target.value
                              if (raw === '' ) return
                              const next = Number(raw)
                              if (!Number.isInteger(next) || next <= 0) return
                              updateQuantity(item._id, item.size, next)
                            }} 
                            className="w-16 px-3 py-2 text-center border border-[var(--primary)]/20 rounded-lg focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]" 
                            type="number" 
                            min={1} 
                            defaultValue={item.quantity} 
                          />
                          
                          {/* Remove Button */}
                          <button 
                            onClick={() => updateQuantity(item._id, item.size, 0)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove item"
                          >
                            <img className="w-5 h-5" src={assets.bin_icon} alt="Remove" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Empty Cart */}
              {cartData.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--text)] mb-2">Your cart is empty</h3>
                  <p className="text-[var(--muted)] mb-6">Add some products to get started</p>
                  <button 
                    onClick={() => navigate('/collection')}
                    className="bg-[var(--primary)] hover:bg-[var(--accent)] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <CartTotal />
            
            {cartData.length > 0 && (
              <div className="mt-6">
                <button 
                  onClick={() => navigate("/place-order")} 
                  className="w-full bg-[var(--primary)] hover:bg-[var(--accent)] text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
