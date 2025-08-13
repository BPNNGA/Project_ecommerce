import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {
    const {currency, delivery_Fee, getCartAmount} = useContext(ShopContext);

  return (
    <div className='bg-white rounded-2xl p-6 shadow-lg'>
        <div className='mb-6'>
            <h3 className='text-2xl font-bold text-[var(--primary)] mb-2'>Order Summary</h3>
            <div className='w-12 h-1 bg-[var(--primary)] rounded-full'></div>
        </div>

        <div className='space-y-4 mb-6'>
            <div className='flex justify-between items-center py-3 border-b border-gray-100'>
                <span className='text-[var(--muted)]'>Subtotal</span>
                <span className='font-semibold text-[var(--text)]'>{currency}{getCartAmount()}.00</span>
            </div>
            
            <div className='flex justify-between items-center py-3 border-b border-gray-100'>
                <span className='text-[var(--muted)]'>Shipping Fee</span>
                <span className='font-semibold text-[var(--text)]'>{currency}{delivery_Fee}.00</span>
            </div>
            
            <div className='flex justify-between items-center py-4 bg-[var(--primary)]/5 rounded-lg px-4'>
                <span className='font-bold text-lg text-[var(--text)]'>Total</span>
                <span className='font-bold text-xl text-[var(--primary)]'>
                    {currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_Fee}.00
                </span>
            </div>
        </div>
        
        <div className='text-center'>
            <p className='text-sm text-[var(--muted)]'>
                Free shipping on orders over {currency}50
            </p>
        </div>
    </div>
  )
}

export default CartTotal
