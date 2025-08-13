import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();
const ShopContextProvider = (props) => {
  const currency = "Rs. ";
  const delivery_Fee = 10;

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token,setToken] = useState('')
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select product size");
      return;
    }

    let cartData = structuredClone(cartItems);
    // Client-side stock validation
    const product = products.find((p) => p._id === itemId);
    const currentQty = (cartData?.[itemId]?.[size] || 0) + 1;
    if (product && typeof product.stock === 'number' && currentQty > product.stock) {
      toast.error('Requested quantity exceeds available stock');
      return;
    }
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token }});
      } catch (error) {
        console.log(error)
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount = +cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    const product = products.find((p) => p._id === itemId);
    let nextQty = Number(quantity);
    if (!Number.isInteger(nextQty) || nextQty < 0) nextQty = 0;
    if (product && typeof product.stock === 'number' && nextQty > product.stock) {
      toast.error('Requested quantity exceeds available stock');
      nextQty = product.stock;
    }
    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = nextQty;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
      } catch (error) {
        console.log(error)
        toast.error(error.message);
        
      }
    }
  };

  const getCartAmount =  () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += cartItems[items][item] * itemInfo.price;
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getProductsData = async ()=>{
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
        
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    } 
  }

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(()=>{
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'))
    }
    // Fetch user profile if token exists
    if (token) {
      axios.post(backendUrl + '/api/user/profile', { userId: parseJwt(token).id })
        .then(res => {
          if (res.data.success) setUser(res.data.user);
          else setUser(null);
        })
        .catch(() => setUser(null));
    }
  },[token])

  // Helper to decode JWT
  function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return {};
    }
  }

  const value = {
    currency,
    products,
    delivery_Fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    setCartItems,
    getCartCount,
    updateQuantity, getCartAmount, navigate, backendUrl, setToken,token, user, setUser
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
