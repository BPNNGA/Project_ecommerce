import React, { useContext } from 'react'
import {ShopContext} from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({id,image,name,price, stock}) => {
    const { currency } = useContext(ShopContext);
    
  return (
    <Link className='group block' to={`/product/${id}`}>
        <div className='bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 overflow-hidden'>
            <div className='relative overflow-hidden rounded-xl mb-4'>
                <img 
                    src={image[0]} 
                    className='w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500' 
                    alt={name} 
                />
                {typeof stock === 'number' && stock === 0 && (
                  <span className='absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded'>Out of Stock</span>
                )}
                <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            </div>
            
            <div className='text-center'>
                <h3 className='font-semibold text-[var(--text)] mb-2 line-clamp-2 group-hover:text-[var(--primary)] transition-colors'>
                    {name}
                </h3>
                <p className='font-bold text-lg text-[var(--accent)]'>
                    {currency}{price}
                </p>
            </div>
        </div>
    </Link>
  )
}

export default ProductItem
