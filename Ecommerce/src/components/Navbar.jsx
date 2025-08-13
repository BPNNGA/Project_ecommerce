import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { FaSearch, FaUser, FaShoppingCart, FaBars, FaTimes, FaSignOutAlt, FaBox, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const {setShowSearch, getCartCount, navigate, token,setToken,setCartItems} = useContext(ShopContext)

    const logout = () => {
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
    }

  return (
    <div className='navbar flex items-center justify-between py-4 px-6 font-medium sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-lg border-b border-[var(--primary)]/10 transition-all'>
        <Link to="/" className="flex items-center gap-3 group">
            <img src={assets.wearon} className='w-[200px] h-[60px] group-hover:scale-105 transition-transform duration-300' alt="Website Logo" />
        </Link>

        <ul className='hidden lg:flex gap-8 text-sm font-semibold'>
            <NavLink to='/' className={({isActive}) => `flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 ${isActive ? 'bg-[var(--primary)] text-white shadow-lg' : 'text-[var(--text)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]'}`}> 
                <p>HOME</p>
            </NavLink>
            <NavLink to='/collection' className={({isActive}) => `flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 ${isActive ? 'bg-[var(--primary)] text-white shadow-lg' : 'text-[var(--text)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]'}`}> 
                <p>COLLECTION</p>
            </NavLink>
            <NavLink to='/about' className={({isActive}) => `flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 ${isActive ? 'bg-[var(--primary)] text-white shadow-lg' : 'text-[var(--text)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]'}`}> 
                <p>ABOUT</p>
            </NavLink>
            <NavLink to='/contact' className={({isActive}) => `flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 ${isActive ? 'bg-[var(--primary)] text-white shadow-lg' : 'text-[var(--text)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]'}`}> 
                <p>CONTACT</p>
            </NavLink>
        </ul>

        <div className='flex items-center gap-6'>
            {/* Search Icon */}
            <button 
                onClick={()=>setShowSearch(true)} 
                className='p-2 rounded-lg hover:bg-[var(--primary)]/10 transition-all duration-300 group'
            >
                <FaSearch className='w-5 h-5 text-[var(--text)] group-hover:text-[var(--primary)]' />
            </button>

            {/* Profile Dropdown */}
            <div className='group relative'>
                <button 
                    onClick={()=> token ? null : navigate('/login')} 
                    className='p-2 rounded-lg hover:bg-[var(--primary)]/10 transition-all duration-300 group'
                >
                    <FaUser className='w-5 h-5 text-[var(--text)] group-hover:text-[var(--primary)]' />
                </button>
                
                {/* Enhanced Dropdown menu */}
                {token && 
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50'>
                    <div className='bg-white rounded-xl shadow-xl border border-[var(--primary)]/20 py-3 min-w-48'>
                        <div className='px-4 py-3 border-b border-[var(--primary)]/10'>
                            <div className='flex items-center gap-3'>
                                <div className='w-10 h-10 bg-[var(--primary)]/10 rounded-full flex items-center justify-center'>
                                    <FaUserCircle className='w-6 h-6 text-[var(--primary)]' />
                                </div>
                                <div>
                                    <p className='font-semibold text-[var(--text)]'>Welcome back!</p>
                                    <p className='text-sm text-[var(--muted)]'>Manage your account</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className='py-2'>
                            <button 
                                onClick={()=> navigate('/profile')} 
                                className='w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[var(--primary)]/5 transition-all duration-300 text-[var(--text)]'
                            >
                                <FaUserCircle className='w-4 h-4' />
                                <span>My Profile</span>
                            </button>
                            
                            <button 
                                onClick={()=> navigate('/orders')} 
                                className='w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[var(--primary)]/5 transition-all duration-300 text-[var(--text)]'
                            >
                                <FaBox className='w-4 h-4' />
                                <span>My Orders</span>
                            </button>
                            
                            <div className='border-t border-[var(--primary)]/10 my-2'></div>
                            
                            <button 
                                onClick={logout} 
                                className='w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 transition-all duration-300 text-red-600'
                            >
                                <FaSignOutAlt className='w-4 h-4' />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>}
            </div>

            {/* Cart Icon */}
            <Link to='/cart' className='relative group'>
                <div className='p-2 rounded-lg hover:bg-[var(--primary)]/10 transition-all duration-300'>
                    <FaShoppingCart className='w-5 h-5 text-[var(--text)] group-hover:text-[var(--primary)]' />
                </div>
                {getCartCount() > 0 && (
                    <div className='absolute -top-1 -right-1 w-5 h-5 bg-[var(--accent)] text-white rounded-full flex items-center justify-center text-xs font-bold animate-pulse'>
                        {getCartCount()}
                    </div>
                )}
            </Link>

            {/* Mobile Menu Button */}
            <button 
                onClick={()=> setVisible(true)} 
                className='lg:hidden p-2 rounded-lg hover:bg-[var(--primary)]/10 transition-all duration-300'
            >
                <FaBars className='w-5 h-5 text-[var(--text)]' />
            </button>
        </div>

        {/* Enhanced Mobile Menu */}
        <div className={`fixed inset-0 bg-black/50 z-50 transition-all duration-300 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className={`absolute top-0 right-0 bottom-0 w-80 bg-white shadow-2xl transition-all duration-300 transform ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className='flex flex-col h-full'>
                    {/* Header */}
                    <div className='flex items-center justify-between p-6 border-b border-[var(--primary)]/10'>
                        <h3 className='text-xl font-bold text-[var(--primary)]'>Menu</h3>
                        <button 
                            onClick={()=>setVisible(false)} 
                            className='p-2 rounded-lg hover:bg-[var(--primary)]/10 transition-all duration-300'
                        >
                            <FaTimes className='w-5 h-5 text-[var(--text)]' />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <div className='flex-1 py-6'>
                        <nav className='space-y-2'>
                            <NavLink 
                                onClick={()=> setVisible(false)} 
                                className={({isActive}) => `flex items-center gap-3 px-6 py-4 text-[var(--text)] transition-all duration-300 ${isActive ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--primary)]/10'}`} 
                                to="/"
                            >
                                <span className='font-semibold'>HOME</span>
                            </NavLink>
                            
                            <NavLink 
                                onClick={()=> setVisible(false)} 
                                className={({isActive}) => `flex items-center gap-3 px-6 py-4 text-[var(--text)] transition-all duration-300 ${isActive ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--primary)]/10'}`} 
                                to="/collection"
                            >
                                <span className='font-semibold'>COLLECTION</span>
                            </NavLink>
                            
                            <NavLink 
                                onClick={()=> setVisible(false)} 
                                className={({isActive}) => `flex items-center gap-3 px-6 py-4 text-[var(--text)] transition-all duration-300 ${isActive ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--primary)]/10'}`} 
                                to="/about"
                            >
                                <span className='font-semibold'>ABOUT</span>
                            </NavLink>
                            
                            <NavLink 
                                onClick={()=> setVisible(false)} 
                                className={({isActive}) => `flex items-center gap-3 px-6 py-4 text-[var(--text)] transition-all duration-300 ${isActive ? 'bg-[var(--primary)] text-white' : 'hover:bg-[var(--primary)]/10'}`} 
                                to="/contact"
                            >
                                <span className='font-semibold'>CONTACT</span>
                            </NavLink>
                        </nav>

                        {/* User Actions */}
                        {token && (
                            <div className='mt-8 px-6'>
                                <div className='border-t border-[var(--primary)]/20 pt-6'>
                                    <h4 className='text-sm font-semibold text-[var(--muted)] mb-4'>ACCOUNT</h4>
                                    <div className='space-y-2'>
                                        <button 
                                            onClick={()=> {navigate('/profile'); setVisible(false);}} 
                                            className='w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[var(--primary)]/10 rounded-lg transition-all duration-300 text-[var(--text)]'
                                        >
                                            <FaUserCircle className='w-4 h-4' />
                                            <span>My Profile</span>
                                        </button>
                                        
                                        <button 
                                            onClick={()=> {navigate('/orders'); setVisible(false);}} 
                                            className='w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[var(--primary)]/10 rounded-lg transition-all duration-300 text-[var(--text)]'
                                        >
                                            <FaBox className='w-4 h-4' />
                                            <span>My Orders</span>
                                        </button>
                                        
                                        <button 
                                            onClick={()=> {logout(); setVisible(false);}} 
                                            className='w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 rounded-lg transition-all duration-300 text-red-600'
                                        >
                                            <FaSignOutAlt className='w-4 h-4' />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className='p-6 border-t border-[var(--primary)]/10'>
                        <div className='text-center'>
                            <p className='text-sm text-[var(--muted)]'>© 2024 FOREVER</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar
