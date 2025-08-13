import { React, useContext, useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { ShopContext } from "../context/ShopContext";

const LatestCollection = () => {
  const {products} = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-16 bg-gradient-to-b from-white to-[var(--primary)]/5 rounded-3xl p-8 shadow-lg">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-8 h-1 bg-[var(--primary)] rounded-full"></div>
          <Title text1={"LATEST"} text2={"COLLECTION"} />
          <div className="w-8 h-1 bg-[var(--primary)] rounded-full"></div>
        </div>
        <p className="w-3/4 mx-auto text-sm md:text-base text-[var(--muted)] leading-relaxed">
          Discover our newest arrivals featuring the latest trends and styles. 
          Fresh designs that combine comfort with contemporary fashion.
        </p>
      </div>
      
      {/* Rendering products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {
          latestProducts.map((item,index)=>(
            <div key={index} className="group">
              <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} stock={item.stock}/>
            </div>
          ))
        }
      </div>
      
      {/* View All Button */}
      <div className="text-center mt-12">
        <button className="bg-[var(--primary)] hover:bg-[var(--accent)] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
          View All Collections
        </button>
      </div>
    </div>
  );
};

export default LatestCollection;
