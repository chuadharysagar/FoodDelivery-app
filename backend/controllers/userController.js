import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import "dotenv/config";

// Function to create JWT token
const createToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" }); // Added expiration time
};

// 🟢 REGISTER NEW USER
const registerUser = async (req, res) => {
   const { name, password, email } = req.body;

   try {
      // Check if the user already exists
      const exists = await userModel.findOne({ email });
      if (exists) {
         return res.status(400).json({ success: false, message: "User already exists" });
      }

      // Validate email format
      if (!validator.isEmail(email)) {
         return res.status(400).json({ success: false, message: "Please enter a valid email" });
      }

      // Validate password strength
      if (password.length < 8) {
         return res.status(400).json({ success: false, message: "Please enter a strong password (min 8 chars)" });
      }

      // Hash password before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      const newUser = new userModel({
         name,
         email,
         password: hashedPassword,
      });

      const user = await newUser.save();
      const token = createToken(user._id);

      return res.status(201).json({ success: true, token });

   } catch (error) {
      console.error("Register Error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
   }
};

// 🟢 LOGIN USER
const loginUser = async (req, res) => {
   const { email, password } = req.body;

   try {
      const user = await userModel.findOne({ email });

      if (!user) {
         return res.status(400).json({ success: false, message: "User does not exist" });
      }

      // Check password match
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      // Generate and return token
      const token = createToken(user._id);
      return res.status(200).json({ success: true, token });

   } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
   }
};

export { loginUser, registerUser };
