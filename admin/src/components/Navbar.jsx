import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-3 px-[4%] justify-between bg-[var(--admin-surface)] shadow-lg border-b border-[var(--admin-accent)]'>
        <div className='flex items-center gap-3'>
          <img className='w-12 h-12 rounded-lg shadow' src={assets.wearon} alt="" />
          <span className='text-2xl font-bold text-[var(--admin-accent)] tracking-wide'>Admin Panel</span>
        </div>
        <button onClick={()=>setToken('')} className='btn bg-[var(--admin-accent)] hover:bg-[var(--admin-accent2)] text-white px-7 py-2 rounded-full text-sm font-semibold shadow-lg transition-all'>Logout</button>
    </div>
  )
}

export default Navbar
