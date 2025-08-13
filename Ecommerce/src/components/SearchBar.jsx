import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';
import { FaSearch, FaTimes, FaMicrophone, FaFilter } from 'react-icons/fa';

const SearchBar = () => {
    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const location = useLocation();

    useEffect(()=>{
      if (location.pathname.includes('collection')) {
        setVisible(true)
      }else{
        setVisible(false)
      }
    },[location])

    
  return showSearch && visible ? (
    <div className='bg-gradient-to-r from-[var(--primary)]/10 via-white to-[var(--secondary)]/10 border-t border-b border-[var(--primary)]/20 py-8 animate-slideDown'>
      <div className='max-w-4xl mx-auto px-4'>
        {/* Header */}
        <div className='text-center mb-6'>
          <h2 className='text-2xl font-bold text-[var(--primary)] mb-2'>Find Your Perfect Style</h2>
          <p className='text-[var(--muted)]'>Search through our extensive collection of fashion items</p>
        </div>

        {/* Search Container */}
        <div className='relative'>
          <div className={`flex items-center bg-white rounded-2xl shadow-xl border-2 transition-all duration-300 overflow-hidden ${
            isFocused ? 'border-[var(--primary)] shadow-2xl' : 'border-[var(--primary)]/20'
          }`}>
            {/* Search Icon */}
            <div className='flex items-center justify-center w-16 h-16 bg-[var(--primary)]/10'>
              <FaSearch className='w-5 h-5 text-[var(--primary)]' />
            </div>

            {/* Search Input */}
            <div className='flex-1'>
              <input 
                type="text" 
                placeholder='Search for products, brands, or categories...' 
                className="w-full px-6 py-4 outline-none text-[var(--text)] placeholder-[var(--muted)] bg-transparent text-lg" 
                value={search} 
                onChange={(e)=>setSearch(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
            </div>

            {/* Voice Search Button */}
            <button className='flex items-center justify-center w-16 h-16 hover:bg-[var(--primary)]/10 transition-all duration-300 group'>
              <FaMicrophone className='w-5 h-5 text-[var(--muted)] group-hover:text-[var(--primary)]' />
            </button>

            {/* Filter Button */}
            <button className='flex items-center justify-center w-16 h-16 hover:bg-[var(--primary)]/10 transition-all duration-300 group'>
              <FaFilter className='w-5 h-5 text-[var(--muted)] group-hover:text-[var(--primary)]' />
            </button>

            {/* Search Button */}
            <button className='px-8 py-4 bg-[var(--primary)] hover:bg-[var(--accent)] text-white font-semibold transition-all duration-300 flex items-center gap-2 group'>
              <FaSearch className='w-4 h-4' />
              <span>Search</span>
            </button>
          </div>
          
          {/* Close Button */}
          <button 
            onClick={()=> setShowSearch(false)} 
            className='absolute -top-3 -right-3 w-10 h-10 bg-[var(--accent)] hover:bg-[var(--primary)] text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110'
          >
            <FaTimes className='w-4 h-4' />
          </button>
        </div>

        {/* Quick Search Suggestions */}
        <div className='mt-6 flex flex-wrap justify-center gap-3'>
          <span className='text-sm text-[var(--muted)]'>Popular:</span>
          {['T-Shirts', 'Jeans', 'Dresses', 'Shoes', 'Accessories'].map((tag, index) => (
            <button
              key={index}
              onClick={() => setSearch(tag)}
              className='px-4 py-2 bg-white rounded-full text-sm text-[var(--text)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300 border border-[var(--primary)]/20 hover:border-[var(--primary)] shadow-sm hover:shadow-md'
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Stats */}
        <div className='mt-6 text-center'>
          <div className='inline-flex items-center gap-6 bg-white/80 backdrop-blur-sm rounded-xl px-6 py-3 shadow-sm'>
            <div className='text-center'>
              <p className='text-lg font-bold text-[var(--primary)]'>1000+</p>
              <p className='text-xs text-[var(--muted)]'>Products</p>
            </div>
            <div className='w-px h-8 bg-[var(--primary)]/20'></div>
            <div className='text-center'>
              <p className='text-lg font-bold text-[var(--primary)]'>50+</p>
              <p className='text-xs text-[var(--muted)]'>Brands</p>
            </div>
            <div className='w-px h-8 bg-[var(--primary)]/20'></div>
            <div className='text-center'>
              <p className='text-lg font-bold text-[var(--primary)]'>24/7</p>
              <p className='text-xs text-[var(--muted)]'>Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default SearchBar
