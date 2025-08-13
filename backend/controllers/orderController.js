
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import productModel from "../models/productModel.js";

// global variables
const currency = 'usd'
const deliveryCharge = 10

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Helpers
const isPositiveInteger = (value) => Number.isInteger(value) && value > 0

const validateAddress = (addr) => {
    if (!addr || typeof addr !== 'object') return false
    const required = ["firstName","lastName","address","city","state","zipcode","country","phone"]
    return required.every((k) => typeof addr[k] === 'string' && String(addr[k]).trim().length > 0)
}

const extractProductId = (item) => item.productId || item._id || item.id

// Reduce stock for the provided items
const decrementStockForItems = async (items) => {
    for (const item of items) {
        const pid = extractProductId(item)
        const qty = Number(item.quantity) || 0
        if (!pid || !isPositiveInteger(qty)) continue
        const product = await productModel.findById(pid)
        if (!product) throw new Error("One of the products no longer exists")
        if (product.stock < qty) throw new Error(`Insufficient stock for ${product.name}`)
        product.stock -= qty
        await product.save()
    }
}

// Placing orders using COD Method (validates stock & decrements immediately)
const placeOrder = async (req, res) => {
    try {
        const {userId, items, amount, address} = req.body;

        // Basic validation
        if (!userId) return res.status(400).json({success:false, message:"userId is required"})
        if (!Array.isArray(items) || items.length === 0) return res.status(400).json({success:false, message:"No items provided"})
        if (!validateAddress(address)) return res.status(400).json({success:false, message:"Please fill in all required address fields"})

        for (const it of items) {
            const qty = Number(it.quantity)
            if (!isPositiveInteger(qty)) return res.status(400).json({success:false, message:"Item quantities must be positive integers"})
            const pid = extractProductId(it)
            if (!pid) return res.status(400).json({success:false, message:"Invalid item payload"})
        }

        // Check stock and decrement
        await decrementStockForItems(items)

        const orderData = {
            userId, 
            items,
            address,
            amount, 
            paymentMethod: "COD", 
            payment: true,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, {cartData:{}});
        res.json({success: true, message: "Order Placed"});

    } catch (error) {
        console.log(error)
        res.status(400).json({success: false, message: error.message});
    }
}

// Placing orders using Stripe Method (checks stock pre-session; decrements on verify)
const placeOrderStripe = async (req, res) => {
    try {
        const {userId, items, amount, address} = req.body;
        const {origin} = req.headers;
        
        // Basic validation
        if (!userId) return res.status(400).json({success:false, message:"userId is required"})
        if (!Array.isArray(items) || items.length === 0) return res.status(400).json({success:false, message:"No items provided"})
        if (!validateAddress(address)) return res.status(400).json({success:false, message:"Please fill in all required address fields"})

        for (const it of items) {
            const qty = Number(it.quantity)
            if (!isPositiveInteger(qty)) return res.status(400).json({success:false, message:"Item quantities must be positive integers"})
            const pid = extractProductId(it)
            if (!pid) return res.status(400).json({success:false, message:"Invalid item payload"})
            const product = await productModel.findById(pid)
            if (!product) return res.status(400).json({success:false, message:"Product not found"})
            if (product.stock < qty) return res.status(400).json({success:false, message:`Insufficient stock for ${product.name}`})
        }
        const orderData = {
            userId, 
            items,
            address,
            amount, 
            paymentMethod: "Stripe", 
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item)=>({
            price_data: {
                currency:currency,
                product_data:{
                    name: item.name,
                },
                unit_amount: Math.round(Number(item.price) * 100),
            },
            quantity: Number(item.quantity),
        }));
        line_items.push({
            price_data: {
                currency:currency,
                product_data:{
                    name: 'Delivery Charges',
                },
                unit_amount: deliveryCharge * 100,
            },
            quantity: 1,
        })
        

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: "payment"
        });

        res.json({success: true, session_url: session.url});
       


    } catch (error) {
        console.log(error)
        res.status(400).json({success: false, message: error.message});
        
    }

}

// Verify Stripe; on success, decrement stock and clear cart
const verifyStripe = async (req, res) => {
    const {orderId, success,userId} = req.body;
    try {
        if (success === "true") {
            const order = await orderModel.findById(orderId)
            if (!order) return res.status(404).json({success:false})
            // Decrement stock for items
            await decrementStockForItems(order.items || [])
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            await userModel.findByIdAndUpdate(userId, {cartData:{}});
            res.json({success: true});
            
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success: false});
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message});
    }
}

// Placing orders using Razorpay Method
const placeOrderRazor = async (req, res) => {

    // 12 hr 45 min to be continued

}

// All orders data for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success: true, orders});
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message});
    }

    
}


// user  orders data for frontend
const userOrders = async (req, res) => {
    try {

        const {userId} = req.body
        const orders = await orderModel.find({userId});
        res.json({success: true, orders});
        
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message});
        
    }
    
}


// update order status from admin 
const updateStatus = async (req, res) => {
    try {
        const {orderId, status} = req.body;
        await orderModel.findByIdAndUpdate(orderId, {status});
        res.json({success: true, message: "Status Updated"});
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message});
    }
    
}

// Admin analytics endpoint
const getAnalytics = async (req, res) => {
  try {
    // Total sales and total orders
    const orders = await orderModel.find({});
    const totalSales = orders.reduce((sum, order) => sum + (order.amount || 0), 0);
    const totalOrders = orders.length;

    // Total users
    const totalUsers = await userModel.countDocuments();

    // Top selling products (by quantity sold)
    const productSales = {};
    orders.forEach(order => {
      (order.items || []).forEach(item => {
        if (!productSales[item.productId]) {
          productSales[item.productId] = { name: item.name, sales: 0 };
        }
        productSales[item.productId].sales += item.quantity || 1;
      });
    });
    // Convert to array and sort
    const topProducts = Object.values(productSales)
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);

    res.json({
      success: true,
      totalSales,
      totalOrders,
      totalUsers,
      topProducts
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {verifyStripe, placeOrder, placeOrderStripe, placeOrderRazor, allOrders, userOrders, updateStatus, getAnalytics }