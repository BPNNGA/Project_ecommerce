import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { FaUpload, FaPlus, FaCheck } from 'react-icons/fa';

const Add = ({token}) => {

  const [image1,setImage1] = useState(false)
  const [image2,setImage2] = useState(false)
  const [image3,setImage3] = useState(false)
  const [image4,setImage4] = useState(false)

  const [name,setName] = useState("")
  const [description,setDescription] = useState("")
  const [price,setPrice] = useState("")
  const [category,setCategory] = useState("Men")
  const [subCategory,setSubCategory] = useState("Topwear")
  const [bestSeller,setBestSeller] = useState(false)
  const [sizes,setSizes] = useState([])
  const [stock, setStock] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // Client side validation
      if (!image1 && !image2 && !image3 && !image4) {
        toast.error('Please upload at least one image');
        return;
      }
      if (!name.trim() || !description.trim()) {
        toast.error('Please fill all required fields');
        return;
      }
      const priceNum = Number(price)
      if (!Number.isFinite(priceNum) || priceNum <= 0) {
        toast.error('Price must be a positive number');
        return;
      }
      const stockNum = Number(stock)
      if (!Number.isInteger(stockNum) || stockNum < 0) {
        toast.error('Stock must be a non-negative integer');
        return;
      }
      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestSeller", bestSeller)
      formData.append("sizes", JSON.stringify(sizes))
      formData.append("stock", stockNum)

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + "/api/product/add", formData, {headers:{token}})
      if (response.data.success) {
        toast.success(response.data.message)
        setName("")
        setDescription("")
        setPrice("")
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setStock('')
        
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      
    }

  }



  return (
    <div className='surface'>
      <h2 className='text-2xl font-bold mb-6 text-[var(--admin-accent)]'>Add New Product</h2>
      <p className='mb-8 text-[var(--admin-muted)]'>Create and manage your product inventory</p>
      
      <form onSubmit={onSubmitHandler} className='bg-[var(--admin-surface)] rounded-xl p-8 shadow-lg'>
        {/* Image Upload Section */}
        <div className='mb-8'>
          <h3 className='text-lg font-semibold mb-4 text-[var(--admin-text)]'>Product Images</h3>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {[
              { id: 'image1', state: image1, setState: setImage1 },
              { id: 'image2', state: image2, setState: setImage2 },
              { id: 'image3', state: image3, setState: setImage3 },
              { id: 'image4', state: image4, setState: setImage4 }
            ].map(({ id, state, setState }) => (
              <label key={id} htmlFor={id} className='relative group cursor-pointer'>
                <div className={`w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-all duration-200 ${
                  state ? 'border-[var(--admin-accent)] bg-[var(--admin-accent)]/10' : 'border-[var(--admin-muted)] hover:border-[var(--admin-accent)]'
                }`}>
                  {state ? (
                    <img 
                      src={URL.createObjectURL(state)} 
                      alt="Preview" 
                      className='w-full h-full object-cover rounded-lg'
                    />
                  ) : (
                    <>
                      <FaUpload className='w-6 h-6 text-[var(--admin-muted)] group-hover:text-[var(--admin-accent)] mb-2' />
                      <span className='text-sm text-[var(--admin-muted)] group-hover:text-[var(--admin-accent)]'>Upload Image</span>
                    </>
                  )}
                </div>
                <input onChange={(e) => setState(e.target.files[0])} type="file" id={id} hidden accept="image/*" />
              </label>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
          <div>
            <label className='block text-sm font-semibold mb-2 text-[var(--admin-text)]'>Product Name</label>
            <input 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              className='w-full px-4 py-3 rounded-lg' 
              type="text" 
              placeholder='Enter product name...' 
              required
            />
          </div>
          
          <div>
            <label className='block text-sm font-semibold mb-2 text-[var(--admin-text)]'>Product Price</label>
            <input 
              onChange={(e) => setPrice(e.target.value)} 
              value={price} 
              className='w-full px-4 py-3 rounded-lg' 
              type="number" 
              placeholder='Enter price...' 
              required
            />
          </div>
          <div>
            <label className='block text-sm font-semibold mb-2 text-[var(--admin-text)]'>Stock Quantity</label>
            <input 
              onChange={(e) => setStock(e.target.value)} 
              value={stock} 
              className='w-full px-4 py-3 rounded-lg' 
              type="number" min={0}
              placeholder='Enter available stock' 
              required
            />
          </div>
        </div>

        <div className='mb-8'>
          <label className='block text-sm font-semibold mb-2 text-[var(--admin-text)]'>Product Description</label>
          <textarea 
            onChange={(e) => setDescription(e.target.value)} 
            value={description} 
            className='w-full px-4 py-3 rounded-lg h-32 resize-none' 
            placeholder='Write detailed product description...' 
            required
          />
        </div>

        {/* Category Selection */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
          <div>
            <label className='block text-sm font-semibold mb-2 text-[var(--admin-text)]'>Category</label>
            <select onChange={(e) => setCategory(e.target.value)} className='w-full px-4 py-3 rounded-lg' required>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          
          <div>
            <label className='block text-sm font-semibold mb-2 text-[var(--admin-text)]'>Sub Category</label>
            <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-4 py-3 rounded-lg' required>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
        </div>

        {/* Size Selection */}
        <div className='mb-8'>
          <label className='block text-sm font-semibold mb-4 text-[var(--admin-text)]'>Available Sizes</label>
          <div className='flex flex-wrap gap-3'>
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSizes(prev => 
                  prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size]
                )}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  sizes.includes(size) 
                    ? 'bg-[var(--admin-accent)] text-white shadow-lg scale-105' 
                    : 'bg-[var(--admin-surface)] text-[var(--admin-muted)] border border-[var(--admin-accent)] hover:bg-[var(--admin-accent)]/10'
                }`}
              >
                {sizes.includes(size) && <FaCheck className='inline mr-2' />}
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Best Seller Toggle */}
        <div className='mb-8'>
          <label className='flex items-center gap-3 cursor-pointer'>
            <input 
              onChange={() => setBestSeller(prev => !prev)} 
              checked={bestSeller} 
              type="checkbox" 
              className='w-5 h-5 text-[var(--admin-accent)] rounded focus:ring-[var(--admin-accent)]'
            />
            <span className='text-sm font-semibold text-[var(--admin-text)]'>Mark as Best Seller</span>
          </label>
        </div>

        {/* Submit Button */}
        <div className='flex justify-end'>
          <button 
            type='submit' 
            className='btn bg-[var(--admin-accent)] hover:bg-[var(--admin-accent2)] text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200'
          >
            <FaPlus className='w-5 h-5' />
            Add Product
          </button>
        </div>
      </form>
    </div>
  )
}

export default Add
