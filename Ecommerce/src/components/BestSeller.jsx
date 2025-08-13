import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const {products} = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(()=>{
        const bestProduct = products.filter((item)=> (item.bestseller));
        setBestSeller(bestProduct.slice(0,5));
    },[products])

  return (
    <div className='my-16 bg-gradient-to-b from-[var(--secondary)]/10 to-white rounded-3xl p-8 shadow-lg'>
        <div className='text-center mb-12'>
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-1 bg-[var(--secondary)] rounded-full"></div>
              <Title text1={'BEST'} text2={'SELLERS'}/>
              <div className="w-8 h-1 bg-[var(--secondary)] rounded-full"></div>
            </div>
            <p className='w-3/4 mx-auto text-sm md:text-base text-[var(--muted)] leading-relaxed'>
              Our most popular items loved by customers worldwide. 
              These trending products combine style, comfort, and quality.
            </p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
            {
                bestSeller.map((item,index)=>(
                    <div key={index} className="group">
                       <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} stock={item.stock}/>
                    </div>
                ))
            }
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-[var(--secondary)] hover:bg-[var(--accent)] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
            View All Best Sellers
          </button>
        </div>
    </div>
  )
}

export default BestSeller
