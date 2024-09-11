import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import validator from 'validator'
import { connect } from "mongoose";
import "dotenv/config"

// Login user
const loginUser = async (req, res) => {
   const { email, password } = req.body;

   try {
      const user = await userModel.findOne({email});

      if (!user) {
         res.json({ success: false, message: "User Does not exists" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         res.json({ success: false, message: "Inavlid credintials" });
      }

      // is password match return token
      const token = creatToken(user._id);
      return res.json({success:true ,token});

   } catch (error) {
       console.log(error);
       res.json({success:false,message:"Error"});
   }
}

// data incription crete token
const creatToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET);
}

// REGISTER NEW USER
const registerUser = async (req, res) => {
   const { name, password, email } = req.body;

   try {
      // if the user is alreay exists
      const exists = await userModel.findOne({ email });
      if (exists) {
         return res.json({ success: false, message: "User already exits" });
      }

      // validating email format and strong password
      if (!validator.isEmail(email)) {
         return res.json({ success: false, message: "Please enter valid email" })
      }

      // Strenth of the password 
      if (password.length < 8) {
         res.json({ success: false, message: "Pleaase Enter a strong password" });
      }

      // Now encrypt use password hashing 
      const salt = await bcrypt.genSalt(10);  //  generate some random values 
      const hashedPassword = await bcrypt.hash(password, salt);  // adding some random values or salt to password

      const newUser = userModel({
         name: name,
         email: email,
         password: hashedPassword,
      })

      const user = await (newUser.save());
      const token = creatToken(user._id);

      res.json({ success: true, token });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
   }
}


export { loginUser, registerUser };