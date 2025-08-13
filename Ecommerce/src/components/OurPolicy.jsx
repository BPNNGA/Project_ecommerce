import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='my-16 bg-gradient-to-r from-[var(--primary)]/5 to-[var(--secondary)]/5 rounded-3xl p-8 shadow-lg'>
      <div className='text-center mb-12'>
        <h2 className='text-3xl font-bold text-[var(--primary)] mb-4'>Why Choose Us</h2>
        <p className='text-[var(--muted)] max-w-2xl mx-auto'>
          We're committed to providing the best shopping experience with our customer-first policies
        </p>
      </div>
      
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:scale-105'>
            <div className='w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[var(--primary)]/20 transition-all'>
              <img src={assets.exchange_icon} className='w-8 h-8' alt="" />
            </div>
            <h3 className='font-bold text-xl mb-3 text-[var(--text)]'>Easy Exchange Policy</h3>
            <p className='text-[var(--muted)] leading-relaxed'>We offer hassle-free exchange policy with no questions asked</p>
        </div>
        
        <div className='bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:scale-105'>
            <div className='w-16 h-16 bg-[var(--secondary)]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[var(--secondary)]/20 transition-all'>
              <img src={assets.quality_icon} className='w-8 h-8' alt="" />
            </div>
            <h3 className='font-bold text-xl mb-3 text-[var(--text)]'>7 Days Return Policy</h3>
            <p className='text-[var(--muted)] leading-relaxed'>We provide 7 days free return policy for your convenience</p>
        </div>
        
        <div className='bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:scale-105'>
            <div className='w-16 h-16 bg-[var(--accent)]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[var(--accent)]/20 transition-all'>
              <img src={assets.support_img} className='w-8 h-8' alt="" />
            </div>
            <h3 className='font-bold text-xl mb-3 text-[var(--text)]'>24/7 Customer Support</h3>
            <p className='text-[var(--muted)] leading-relaxed'>We provide round-the-clock customer support for your needs</p>
        </div>
      </div>
    </div>
  )
}

export default OurPolicy
