import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { FaTrash, FaEye, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const List = ({token}) => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
        
      }
      else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove/',{id},{headers:{token}});
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      }
      else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='surface'>
      <h2 className='text-2xl font-bold mb-6 text-[var(--admin-accent)]'>Product Management</h2>
      <p className='mb-6 text-[var(--admin-muted)]'>Manage all your products from this dashboard</p>
      
      <div className='bg-[var(--admin-surface)] rounded-xl shadow-lg overflow-hidden'>
        {/* Table Header */}
        <div className='grid grid-cols-[80px_1fr_140px_120px_140px_160px] items-center gap-4 py-4 px-6 bg-gradient-to-r from-[var(--admin-accent)] to-[var(--admin-accent2)] text-white font-semibold text-sm'>
          <span>Image</span>
          <span>Product Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Stock</span>
          <span className='text-center'>Actions</span>
        </div>

        {/* Product List */}
        <div className='max-h-[70vh] overflow-y-auto'>
          {list.map((item, index) => (
            <div 
              key={index}
              className='grid grid-cols-[80px_1fr_140px_120px_140px_160px] items-center gap-4 py-4 px-6 border-b border-[var(--admin-accent)]/20 hover:bg-[var(--admin-accent)]/5 transition-all duration-200'
            >
              <div className='flex items-center'>
                <img 
                  className='w-16 h-16 object-cover rounded-lg shadow-md' 
                  src={item.image[0]} 
                  alt={item.name} 
                />
              </div>
              <div>
                <p className='font-semibold text-[var(--admin-text)]'>{item.name}</p>
                <p className='text-sm text-[var(--admin-muted)]'>{item.description?.substring(0, 50)}...</p>
              </div>
              <div>
                <span className='px-3 py-1 bg-[var(--admin-accent)]/20 text-[var(--admin-accent)] rounded-full text-xs font-medium'>
                  {item.category}
                </span>
              </div>
              <div>
                <p className='font-bold text-lg text-[var(--admin-accent)]'>{currency}{item.price}</p>
              </div>
              <div>
                {typeof item.stock === 'number' ? (
                  item.stock > 0 ? (
                    <span className='px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold'>In stock: {item.stock}</span>
                  ) : (
                    <span className='px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold'>Out of Stock</span>
                  )
                ) : (
                  <span className='text-[var(--admin-muted)] text-sm'>N/A</span>
                )}
              </div>
              <div className='flex items-center justify-center gap-2'>
                <button 
                  onClick={() => {
                    if (window.confirm('Delete this product permanently?')) {
                      removeProduct(item._id)
                    }
                  }}
                  className='p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 hover:scale-105'
                  title="Delete Product"
                >
                  <FaTrash className='w-4 h-4' />
                </button>
                <button
                  onClick={() => navigate(`/product/${item._id}`)}
                  className='p-2 bg-[var(--admin-accent)] hover:bg-[var(--admin-accent2)] text-white rounded-lg transition-all duration-200 hover:scale-105'
                  title="View Details"
                >
                  <FaEye className='w-4 h-4' />
                </button>
                
                <button 
                  onClick={() => navigate(`/product/${item._id}/edit`)}
                  className='p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-200 hover:scale-105'
                  title="Edit Product"
                >
                  <FaEdit className='w-4 h-4' />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Summary */}
        <div className='bg-[var(--admin-accent)]/10 p-4 border-t border-[var(--admin-accent)]/20'>
          <p className='text-center text-[var(--admin-muted)]'>
            Total Products: <span className='font-bold text-[var(--admin-accent)]'>{list.length}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default List
