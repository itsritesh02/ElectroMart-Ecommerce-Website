import User  from "../models/User.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

//Register

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    //Check Empty  Fields
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //Check ExixtingUser

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    //Hash Password

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    // Generate JWT Token
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      token,
      user:{
        id:user._id,
        name:user.name,
        email:user.email,
        phone:user.phone,
        role:user.role,
      }
    });


  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const LoginUser = async(req,res)=>{
  try{
const {email, password}= req.body;
if(!email || !password){
  return res.status(400).json({
    success:false,
      message: "Email and Password are required",
  })
  }

const user = await User.findOne({email});



if(!user){
   if (!user) {
     return res.status(401).json({
       success: false,
       message: "Invalid Email or Password",
     });
   }
}

const isMatch = await bcrypt.compare(password, user.password);

 if (!isMatch) {
   return res.status(401).json({
     success: false,
     message: "Invalid Email or Password",
   });
 }

   const token = generateToken(user._id, user.role);

   res.status(200).json({
     success: true,
     message: "Login Successful",
     token,
     user: {
       id: user._id,
       name: user.name,
       email: user.email,
       phone: user.phone,
       role: user.role,
     },
   });






  } catch(error){
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
