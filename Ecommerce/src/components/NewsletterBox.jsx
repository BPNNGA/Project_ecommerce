import React from 'react'

const NewsletterBox = () => {
    const onSubmitHandler = (event)=>{
        // not to reload the webpage
        event.preventDefault();
        
    }
  return (
    <div className='my-16 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-3xl p-8 shadow-xl text-white'>
        <div className='text-center max-w-2xl mx-auto'>
            <h2 className='text-3xl font-bold mb-4'>Stay Updated</h2>
            <p className='text-lg mb-8 opacity-90'>
                Subscribe to our newsletter and get exclusive offers, new arrivals, and fashion tips delivered to your inbox.
            </p>
            
            <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto'>
                <input 
                    className='flex-1 w-full px-6 py-4 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50' 
                    type="email" 
                    placeholder='Enter your email address' 
                    required 
                />
                <button 
                    type='submit' 
                    className='w-full sm:w-auto bg-white text-[var(--primary)] font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl'
                >
                    Subscribe Now
                </button>
            </form>
            
            <p className='text-sm opacity-75 mt-4'>
                Get 20% off your first order when you subscribe!
            </p>
        </div>
    </div>
  )
}

export default NewsletterBox
