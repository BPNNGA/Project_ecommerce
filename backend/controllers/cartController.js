import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";


// add product to user cart
const addToCart = async (req, res) => {
    try {
        const {userId, itemId, size} = req.body;

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        // stock validation
        const product = await productModel.findById(itemId)
        if (!product) return res.status(400).json({success:false, message:"Product not found"})

        const currentQty = (cartData?.[itemId]?.[size] || 0) + 1
        if (currentQty > product.stock) {
            return res.status(400).json({success:false, message:"Requested quantity exceeds available stock"})
        }

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        }else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        await userModel.findByIdAndUpdate(userId, {cartData});
        res.json({success: true, message: "Product added to cart"});
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message});
        
    }
    
}
// update user cart
const updateCart = async (req, res) => {
    try {
        const {userId, itemId, size, quantity} = req.body;

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        if (!Number.isInteger(quantity) || quantity < 0) {
            return res.status(400).json({success:false, message:"Quantity must be a non-negative integer"})
        }

        const product = await productModel.findById(itemId)
        if (!product) return res.status(400).json({success:false, message:"Product not found"})
        if (quantity > product.stock) {
            return res.status(400).json({success:false, message:"Requested quantity exceeds available stock"})
        }

        cartData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId, {cartData});
        res.json({success: true, message: "Product updated"});

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message});
    }

}

// get user cart data
const getUserCart = async (req, res) => {
    try {
        const {userId} = req.body;

        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;

        res.json({success: true, cartData });

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message});
        
    }

}

export { addToCart, updateCart, getUserCart }