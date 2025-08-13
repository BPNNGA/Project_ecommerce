import React from 'react'
import { assets } from '../assets/assets'
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-gradient-to-t from-[var(--primary)]/90 to-white/80 text-[var(--text)] pt-10 rounded-t-3xl shadow-inner">
     <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <img src={assets.wearon} className='w-[250px] h-[80px] rounded-tr-2xl rounded-bl-2xl mb-4' alt="" />
            <p className='w-full md:w-3/4 text-gray-200 font-medium'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora eaque ratione libero commodi corporis corrupti optio soluta iste numquam. Ratione laboriosam praesentium nemo a aperiam voluptate corporis eos inventore molestiae.</p>
        </div>
        <div>
            <p className='text-xl font-bold mb-5 text-white'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-100'>
                <li>HOME</li>
                <li>ABOUT US</li>
                <li>DELIVERY</li>
                <li>POLICY & PRIVACY</li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-bold mb-5 text-white'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-100'>
                <li className='flex items-center gap-2'><FaPhoneAlt className='text-[var(--accent)]'/> 9813498382</li>
                <li className='flex items-center gap-2'><FaEnvelope className='text-[var(--accent)]'/> bipinngakhushi@gmail.com</li>
            </ul>
        </div>
     </div>
     <div>
        <hr className='border-gray-300' />
        <p className='text-center py-5 text-xs text-gray-200'>Copyright  © 2025 All Rights Reserved BCA 6th SEM</p>
     </div>
    </div>
  )
}

export default Footer
