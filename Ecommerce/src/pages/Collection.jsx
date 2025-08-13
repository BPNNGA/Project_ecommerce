import React, { useEffect, useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';


const Collection = () => {
  const {products, search, showSearch} = useContext(ShopContext);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e)=> {
    if (category.includes(e.target.value)) {
      setCategory(prev=>prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev=>prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

 

  const applyFilter = ()=>{
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
      
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    if (subCategory.length> 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }
    setFilteredProducts(productsCopy)
  }


  // for sorting 
  const sortProduct = () => {
    let fpCopy = filteredProducts.slice();
    

    switch (sortType) {
      case 'low-high':
        setFilteredProducts(fpCopy.sort((p1,p2)=> p1.price - p2.price));
        break;
      case 'high-low':
        setFilteredProducts(fpCopy.sort((p1,p2)=> p2.price - p1.price));      
        break;
    
      default:
        applyFilter();
        break;
    }
  }

  

  useEffect(()=>{
    applyFilter();

  }, [category,subCategory,showSearch,search,products] )


  useEffect(()=>{
    sortProduct();
  },[sortType])


 

  return (
    <div className='min-h-screen bg-gradient-to-b from-white to-[var(--primary)]/5 py-8'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-[var(--primary)] mb-4'>All Collections</h1>
          <p className='text-[var(--muted)] max-w-2xl mx-auto'>
            Discover our complete range of fashion items. Filter and find exactly what you're looking for.
          </p>
        </div>

        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Filter Section */}
          <div className='lg:w-1/4'>
            <div className='bg-white rounded-2xl p-6 shadow-lg sticky top-24'>
              <h2 className='text-xl font-bold text-[var(--primary)] mb-6 flex items-center gap-2'>
                <div className='w-6 h-1 bg-[var(--primary)] rounded-full'></div>
                Filters
              </h2>
              
              {/* Categories Filter */}
              <div className='mb-8'>
                <h3 className='font-semibold text-[var(--text)] mb-4'>Categories</h3>
                <div className='space-y-3'>
                  {['Men', 'Women', 'Kids'].map((cat) => (
                    <label key={cat} className='flex items-center gap-3 cursor-pointer group'>
                      <input 
                        type="checkbox" 
                        value={cat} 
                        onChange={toggleCategory}
                        className='w-4 h-4 text-[var(--primary)] rounded focus:ring-[var(--primary)]'
                      />
                      <span className='text-[var(--muted)] group-hover:text-[var(--primary)] transition-colors'>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sub Categories Filter */}
              <div className='mb-8'>
                <h3 className='font-semibold text-[var(--text)] mb-4'>Type</h3>
                <div className='space-y-3'>
                  {['Topwear', 'Bottomwear', 'Winterwear'].map((type) => (
                    <label key={type} className='flex items-center gap-3 cursor-pointer group'>
                      <input 
                        type="checkbox" 
                        value={type} 
                        onChange={toggleSubCategory}
                        className='w-4 h-4 text-[var(--primary)] rounded focus:ring-[var(--primary)]'
                      />
                      <span className='text-[var(--muted)] group-hover:text-[var(--primary)] transition-colors'>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <h3 className='font-semibold text-[var(--text)] mb-4'>Sort By</h3>
                <select 
                  className='w-full px-4 py-3 rounded-lg border border-[var(--primary)]/20 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]' 
                  onChange={(e) => setSortType(e.target.value)}
                >
                  <option value="relavent">Most Relevant</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className='lg:w-3/4'>
            <div className='flex justify-between items-center mb-8'>
              <h2 className='text-2xl font-bold text-[var(--text)]'>
                Products ({filteredProducts.length})
              </h2>
            </div>

            {/* Products Grid */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {filteredProducts.map((item, index) => (
                <div key={index} className='group'>
                 <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} stock={item.stock}/>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className='text-center py-16'>
                <div className='w-24 h-24 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-6'>
                  <svg className='w-12 h-12 text-[var(--primary)]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                  </svg>
                </div>
                <h3 className='text-xl font-semibold text-[var(--text)] mb-2'>No products found</h3>
                <p className='text-[var(--muted)]'>Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Collection
