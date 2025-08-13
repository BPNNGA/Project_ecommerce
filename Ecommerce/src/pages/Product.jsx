import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RecommendedProducts from "../components/RecommendedProducts";
import ProductDetail from "./ProductDetail";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size,setSize] = useState('');

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        

        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);
  return productData ? (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--primary)]/5 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm">
          <a href="/" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">Home</a>
          <span className="mx-2 text-[var(--muted)]">/</span>
          <a href="/collection" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">Collection</a>
          <span className="mx-2 text-[var(--muted)]">/</span>
          <span className="text-[var(--text)]">{productData.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex flex-col-reverse lg:flex-row gap-6">
                {/* Thumbnail Images */}
                <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto">
                  {productData.image.map((item, index) => (
                    <img 
                      key={index}
                      onClick={() => setImage(item)} src={item} 
                      className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all ${
                        image === item ? 'ring-2 ring-[var(--primary)] scale-105' : 'hover:scale-105'
                      }`} 
                      alt={`Product ${index + 1}`}
                    />
                  ))}
                </div>
                
                {/* Main Image */}
                <div className="flex-1">
                  <img 
                    src={image} 
                    className="w-full h-96 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300" 
                    alt={productData.name} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-[var(--text)] mb-4">{productData.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <img 
                      key={star}
                      src={star <= 4 ? assets.star_icon : assets.star_dull_icon} 
                      className="w-5 h-5" 
                      alt="star" 
                    />
                  ))}
                </div>
                <span className="text-[var(--muted)]">(122 reviews)</span>
              </div>
              
              {/* Price */}
              <p className="text-4xl font-bold text-[var(--accent)] mb-6">{currency} {productData.price}</p>
              
              {/* Description */}
              <p className="text-[var(--muted)] leading-relaxed mb-8">{productData.description}</p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold text-[var(--text)] mb-4">Select Size</h3>
              <div className="flex flex-wrap gap-3">
                {productData.sizes.map((item, index) => (
                  <button 
                    key={index}
                    onClick={() => setSize(item)} 
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      item === size 
                        ? 'bg-[var(--primary)] text-white shadow-lg scale-105' 
                        : 'bg-white border-2 border-[var(--primary)]/20 text-[var(--text)] hover:bg-[var(--primary)]/10'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock and Add to Cart */}
            {typeof productData.stock === 'number' && productData.stock === 0 && (
              <div className="text-red-600 font-semibold">Out of Stock</div>
            )}
            <button 
              disabled={typeof productData.stock === 'number' && productData.stock === 0}
              onClick={() => addToCart(productData._id, size)} 
              className="w-full bg-[var(--primary)] disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-[var(--accent)] text-white py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {typeof productData.stock === 'number' && productData.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>

            {/* Product Features */}
            <div className="bg-[var(--primary)]/5 rounded-xl p-6">
              <h3 className="font-semibold text-[var(--text)] mb-4">Product Features</h3>
              <div className="space-y-2 text-sm text-[var(--muted)]">
                <p>✓ 100% Original product</p>
                <p>✓ Cash on delivery available</p>
                <p>✓ Easy return and exchange policy within 7 days</p>
                <p>✓ Free shipping on orders over $50</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description & Reviews */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex border-b">
            <button className="flex-1 py-4 px-6 font-semibold text-[var(--primary)] border-b-2 border-[var(--primary)]">
              Description
            </button>
            <button className="flex-1 py-4 px-6 font-semibold text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
              Reviews (122)
            </button>
          </div>
          <div className="p-8">
            <div className="space-y-4 text-[var(--muted)] leading-relaxed">
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod rerum ducimus obcaecati reiciendis, ad quam autem sed culpa. Autem, necessitatibus aliquid ullam possimus repudiandae quia doloribus! Ea, ut dignissimos totam vero a maxime ipsa sint autem voluptatibus neque quia. Perferendis incidunt aspernatur soluta vel et aliquam culpa architecto eum officia.</p>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti, soluta!</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {/* <RelatedProducts category={productData.category} subCategory={productData.subCategory}/> */}

        {/* Recommended Products */}
        <RecommendedProducts productId={productId} />
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[var(--muted)]">Loading product...</p>
      </div>
    </div>
  );
};

export default Product;
