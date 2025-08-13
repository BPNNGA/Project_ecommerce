import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}


// Route for user login
const loginUser = async (req, res) => {
    // res.json({msg:"Login API Working"})
    try {
        const {email,password} = req.body;
        if (!email || !password) {
            return res.status(400).json({success:false, message:"Email and password are required"})
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({success:false, message:"Please enter a valid email"})
        }
        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(400).json({success:false, message:"User does not exist"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({success:false, message:"Incorrect Password"})
        }
        const token = createToken(user._id)
        res.json({success:true, token})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message:error.message})
    }




    // 6hr 16 min 

}

// Route for user registration
const registerUser = async (req, res) => {
    // res.json({msg:"Register API Working"})
    try {
        const {name,email,password} = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({success:false, message:"Name, email and password are required"})
        }
        //checking user already exists or not 
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.status(400).json({success:false, message:"User already exists"})
        }
        //  validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.status(400).json({success:false, message:"Please enter a valid email"})
            
        }
        if (password.length < 8) {
            return res.status(400).json({success:false, message:"please enter a strong password and must have atleast 8 character"})
            
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })
        const user = await newUser.save()

        const token = createToken(user._id)
        res.json({success:true, token})

    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error.message})
    }

}

//Route for admin login
const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({success:true, token})
            
        }else{
            res.json({success:false, message:"Invalid Credentials"})
        }
        
    } catch (error) {
         console.log(error);
        res.json({success:false,message:error.message})
    }

   

}

// Get user profile by ID
const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) return res.status(400).json({ success: false, message: 'User ID is required' });
        const user = await userModel.findById(userId).select('name email createdAt');
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        res.json({ success: true, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export {loginUser,registerUser, adminLogin, getUserProfile}