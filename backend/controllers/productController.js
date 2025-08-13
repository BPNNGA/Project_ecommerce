import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'
import { json } from 'express'

// function for add product
// Validates required fields and positive numeric values before creating a product
const addProduct = async (req,res) => {
    try {
        const {name, description, price, category, subCategory, sizes, bestSeller, stock} = req.body

        // Basic validations
        if (!name || !description || !price || !category || !subCategory || !sizes) {
            return res.status(400).json({success:false, message:"Please provide all required fields: name, description, price, category, subCategory, sizes"})
        }

        const parsedPrice = Number(price)
        if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
            return res.status(400).json({success:false, message:"Price must be a positive number"})
        }

        // sizes is sent as JSON string from admin UI
        let parsedSizes
        try {
            parsedSizes = typeof sizes === 'string' ? JSON.parse(sizes) : sizes
        } catch {
            return res.status(400).json({success:false, message:"Sizes must be a valid JSON array"})
        }
        if (!Array.isArray(parsedSizes) || parsedSizes.length === 0) {
            return res.status(400).json({success:false, message:"Please select at least one size"})
        }

        // Stock validation (optional input, defaults to 0)
        const parsedStock = stock === undefined ? 0 : Number(stock)
        if (!Number.isInteger(parsedStock) || parsedStock < 0) {
            return res.status(400).json({success:false, message:"Stock must be a non-negative integer"})
        }

        // Images handling
        const image1 = req.files?.image1 && req.files.image1[0]
        const image2 = req.files?.image2 && req.files.image2[0]
        const image3 = req.files?.image3 && req.files.image3[0]
        const image4 = req.files?.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item)=> item !== undefined )
        if (images.length === 0) {
            return res.status(400).json({success:false, message:"Please upload at least one product image"})
        }

        let imageUrl = await Promise.all(
            images.map( async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'})
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            price: parsedPrice,
            category,
            subCategory,
            bestseller: bestSeller === "true" || bestSeller === true,
            sizes: parsedSizes,
            image: imageUrl,
            stock: parsedStock,
            date: Date.now()
        }

        const product = new productModel(productData)
        await product.save()

        res.json({success:true, message:"Product Added Successfully"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message:error.message})
    }
}

// function for list product
const listProduct = async (req,res) => {
    try {
        const products = await productModel.find({})
        res.json({success:true, products})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }

}


// function for remove/delete product 
const removeProduct = async (req, res) => {
    try {

        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true, message:"Product Deleted Successfully"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }

}

//function for single product Information
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        if (!productId) return res.status(400).json({success:false, message:"productId is required"})
        const product = await productModel.findById(productId)
        if (!product) return res.status(404).json({success:false, message:"Product not found"})
        res.json({success:true, product})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message:error.message})
    }
}

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export {addProduct, listProduct, removeProduct, singleProduct, getProductById }
 
// Update product details (admin)
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const updates = req.body || {}

        // Whitelist of updatable fields
        const allowed = [
            'name','description','price','category','subCategory','sizes','bestseller','brand','tags','stock'
        ]
        const payload = {}
        for (const key of allowed) {
            if (updates[key] !== undefined) payload[key] = updates[key]
        }

        if (payload.price !== undefined) {
            const p = Number(payload.price)
            if (!Number.isFinite(p) || p <= 0) return res.status(400).json({success:false, message:'Price must be a positive number'})
            payload.price = p
        }
        if (payload.stock !== undefined) {
            const s = Number(payload.stock)
            if (!Number.isInteger(s) || s < 0) return res.status(400).json({success:false, message:'Stock must be a non-negative integer'})
            payload.stock = s
        }
        if (payload.sizes !== undefined) {
            let parsed = payload.sizes
            if (typeof parsed === 'string') {
                try { parsed = JSON.parse(parsed) } catch { return res.status(400).json({success:false, message:'Sizes must be a valid JSON array'}) }
            }
            if (!Array.isArray(parsed)) return res.status(400).json({success:false, message:'Sizes must be an array'})
            payload.sizes = parsed
        }

        const product = await productModel.findByIdAndUpdate(id, payload, { new: true })
        if (!product) return res.status(404).json({success:false, message:'Product not found'})
        res.json({success:true, message:'Product updated successfully', product})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message:error.message})
    }
}

export { updateProduct }