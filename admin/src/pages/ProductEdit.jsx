import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const ProductEdit = ({ token }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    name: '', description: '', price: '', category: '', subCategory: '', sizes: [], bestseller: false, brand: '', tags: '', stock: ''
  })

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${backendUrl}/api/product/${id}`)
        const p = res.data
        setForm({
          name: p.name || '',
          description: p.description || '',
          price: p.price ?? '',
          category: p.category || '',
          subCategory: p.subCategory || '',
          sizes: Array.isArray(p.sizes) ? p.sizes : [],
          bestseller: !!p.bestseller,
          brand: p.brand || '',
          tags: Array.isArray(p.tags) ? p.tags.join(', ') : '',
          stock: p.stock ?? 0
        })
      } catch (e) {
        console.log(e)
        toast.error('Failed to load product')
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchProduct()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Client-side validation
      if (!String(form.name).trim() || !String(form.description).trim()) {
        toast.error('Please fill all required fields')
        return
      }
      if (!Number.isFinite(Number(form.price)) || Number(form.price) <= 0) {
        toast.error('Price must be a positive number')
        return
      }
      if (!Number.isInteger(Number(form.stock)) || Number(form.stock) < 0) {
        toast.error('Stock must be a non-negative integer')
        return
      }
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        sizes: form.sizes,
        tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : []
      }
      const res = await axios.put(`${backendUrl}/api/product/update/${id}`, payload, { headers: { token } })
      if (res.data.success) {
        toast.success('Product updated')
        navigate('/list')
      } else {
        toast.error(res.data.message || 'Update failed')
      }
    } catch (e) {
      console.log(e)
      toast.error(e.message)
    }
  }

  if (loading) return <div className='surface'>Loading...</div>

  return (
    <div className='surface'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-bold text-[var(--admin-accent)]'>Edit Product</h2>
        <button onClick={() => navigate(-1)} className='px-4 py-2 rounded bg-[var(--admin-accent)] text-white'>Back</button>
      </div>
      <form onSubmit={handleSubmit} className='bg-[var(--admin-surface)] rounded-xl p-6 shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <label className='block text-sm font-semibold mb-2'>Name</label>
          <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} className='w-full px-4 py-3 rounded-lg' required />
        </div>
        <div>
          <label className='block text-sm font-semibold mb-2'>Price</label>
          <input type='number' min={0} value={form.price} onChange={e => setForm(f => ({...f, price: e.target.value}))} className='w-full px-4 py-3 rounded-lg' required />
        </div>
        <div className='md:col-span-2'>
          <label className='block text-sm font-semibold mb-2'>Description</label>
          <textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} className='w-full px-4 py-3 rounded-lg h-28' required />
        </div>
        <div>
          <label className='block text-sm font-semibold mb-2'>Category</label>
          <input value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))} className='w-full px-4 py-3 rounded-lg' required />
        </div>
        <div>
          <label className='block text-sm font-semibold mb-2'>Sub Category</label>
          <input value={form.subCategory} onChange={e => setForm(f => ({...f, subCategory: e.target.value}))} className='w-full px-4 py-3 rounded-lg' required />
        </div>
        <div>
          <label className='block text-sm font-semibold mb-2'>Stock</label>
          <input type='number' min={0} value={form.stock} onChange={e => setForm(f => ({...f, stock: e.target.value}))} className='w-full px-4 py-3 rounded-lg' required />
        </div>
        <div>
          <label className='block text-sm font-semibold mb-2'>Sizes</label>
          <div className='flex flex-wrap gap-2'>
            {['S','M','L','XL','XXL'].map(s => (
              <button type='button' key={s} onClick={() => setForm(f => ({...f, sizes: f.sizes.includes(s) ? f.sizes.filter(x => x!==s) : [...f.sizes, s]}))} className={`px-3 py-2 rounded border ${form.sizes.includes(s) ? 'bg-[var(--admin-accent)] text-white' : ''}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className='block text-sm font-semibold mb-2'>Best Seller</label>
          <label className='inline-flex items-center gap-2'>
            <input type='checkbox' checked={form.bestseller} onChange={e => setForm(f => ({...f, bestseller: e.target.checked}))} />
            <span className='text-sm text-[var(--admin-text)]'>Mark as bestseller</span>
          </label>
        </div>
        <div className='md:col-span-2'>
          <label className='block text-sm font-semibold mb-2'>Tags (comma separated)</label>
          <input value={form.tags} onChange={e => setForm(f => ({...f, tags: e.target.value}))} className='w-full px-4 py-3 rounded-lg' />
        </div>
        <div className='md:col-span-2'>
          <button type='submit' className='btn bg-[var(--admin-accent)] hover:bg-[var(--admin-accent2)] text-white px-8 py-3 rounded-lg'>Save</button>
        </div>
      </form>
    </div>
  )
}

export default ProductEdit


