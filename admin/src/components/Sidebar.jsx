import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { FaPlus, FaList, FaBoxOpen, FaChartBar } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen bg-gradient-to-b from-[var(--admin-accent)] to-[var(--admin-surface)] border-r-0 shadow-xl flex flex-col'>
      <div className='flex flex-col gap-4 pt-10 pl-[20%] text-[16px]'>
        <NavLink className={({isActive}) => `flex items-center gap-3 px-5 py-3 rounded-l-lg font-semibold transition-all ${isActive ? 'bg-[var(--admin-surface)] text-[var(--admin-accent)] shadow-lg' : 'text-[var(--admin-text)] hover:bg-[var(--admin-surface)] hover:text-[var(--admin-accent)]'}`} to="/add">
          <FaPlus className='w-5 h-5'/>
          <span className='hidden md:block'>Add Items</span>
        </NavLink>
        <NavLink className={({isActive}) => `flex items-center gap-3 px-5 py-3 rounded-l-lg font-semibold transition-all ${isActive ? 'bg-[var(--admin-surface)] text-[var(--admin-accent)] shadow-lg' : 'text-[var(--admin-text)] hover:bg-[var(--admin-surface)] hover:text-[var(--admin-accent)]'}`} to="/list">
          <FaList className='w-5 h-5'/>
          <span className='hidden md:block'>List Items</span>
        </NavLink>
        <NavLink className={({isActive}) => `flex items-center gap-3 px-5 py-3 rounded-l-lg font-semibold transition-all ${isActive ? 'bg-[var(--admin-surface)] text-[var(--admin-accent)] shadow-lg' : 'text-[var(--admin-text)] hover:bg-[var(--admin-surface)] hover:text-[var(--admin-accent)]'}`} to="/orders">
          <FaBoxOpen className='w-5 h-5'/>
          <span className='hidden md:block'>Orders</span>
        </NavLink>
        <NavLink className={({isActive}) => `flex items-center gap-3 px-5 py-3 rounded-l-lg font-semibold transition-all ${isActive ? 'bg-[var(--admin-surface)] text-[var(--admin-accent)] shadow-lg' : 'text-[var(--admin-text)] hover:bg-[var(--admin-surface)] hover:text-[var(--admin-accent)]'}`} to="/dashboard">
          <FaChartBar className='w-5 h-5'/>
          <span className='hidden md:block'>Dashboard</span>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
