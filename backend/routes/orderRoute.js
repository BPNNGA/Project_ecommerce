import express from "express";
import { placeOrder, placeOrderStripe, placeOrderRazor, allOrders, userOrders, updateStatus, verifyStripe, getAnalytics } from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

// Admin Features
orderRouter.post('/list',adminAuth, allOrders)
orderRouter.post('/status',adminAuth, updateStatus)
orderRouter.get('/analytics', adminAuth, getAnalytics);

//Payment Features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razor', authUser, placeOrderRazor)

// User Features    
orderRouter.post('/userorders', authUser, userOrders)


// Verify payment
orderRouter.post('/verifyStripe', authUser, verifyStripe ) 


export default orderRouter