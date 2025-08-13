import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const ProductView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${backendUrl}/api/product/${id}`)
        setProduct(res.data)
      } catch (err) {
        console.log(err)
        toast.error('Failed to load product')
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className='surface'>
        <p>Loading product...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className='surface'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-bold text-[var(--admin-accent)]'>Product Details</h2>
          <button onClick={() => navigate(-1)} className='px-4 py-2 rounded bg-[var(--admin-accent)] text-white'>Back</button>
        </div>
        <p className='text-[var(--admin-muted)]'>Product not found.</p>
      </div>
    )
  }

  return (
    <div className='surface'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-bold text-[var(--admin-accent)]'>Product Details</h2>
        <button onClick={() => navigate(-1)} className='px-4 py-2 rounded bg-[var(--admin-accent)] hover:bg-[var(--admin-accent2)] text-white transition-colors'>Back</button>
      </div>

      <div className='bg-[var(--admin-surface)] rounded-xl p-6 shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div>
          <div className='grid grid-cols-2 gap-3'>
            {(Array.isArray(product.image) ? product.image : [product.image]).map((img, i) => (
              <img key={i} src={img} alt={product.name} className='w-full h-40 object-cover rounded-lg shadow' />
            ))}
          </div>
        </div>

        <div className='space-y-4'>
          <h3 className='text-xl font-semibold text-[var(--admin-text)]'>{product.name}</h3>
          <p className='text-[var(--admin-muted)]'>{product.description}</p>
          <div className='flex items-center gap-4'>
            <span className='px-3 py-1 bg-[var(--admin-accent)]/20 text-[var(--admin-accent)] rounded-full text-xs font-medium'>{product.category}</span>
            {product.subCategory && (
              <span className='px-3 py-1 bg-[var(--admin-accent2)]/20 text-[var(--admin-accent2)] rounded-full text-xs font-medium'>{product.subCategory}</span>
            )}
          </div>
          <div className='flex items-center gap-6'>
            <div className='text-lg font-bold text-[var(--admin-accent)]'>{currency}{product.price}</div>
            <div className={`text-sm font-semibold ${product.stock === 0 ? 'text-red-600' : 'text-green-600'}`}>
              {typeof product.stock === 'number' ? `Stock: ${product.stock}` : 'Stock: N/A'}
            </div>
          </div>
          {Array.isArray(product.sizes) && product.sizes.length > 0 && (
            <div>
              <div className='text-sm font-semibold text-[var(--admin-text)] mb-2'>Sizes</div>
              <div className='flex flex-wrap gap-2'>
                {product.sizes.map((s, idx) => (
                  <span key={idx} className='px-3 py-1 border rounded-lg text-sm'>{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductView


