import express from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Product } from "../models/Product.js";

const userRouter = express.Router();

// Register a New User
userRouter.post("/register", async (req, res) => {
  try {
    console.log("Received request data:", req.body);

    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

// Login User
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Store the token in the cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      expires: new Date(Date.now() + 5 * 60 * 1000),
    });

    // Populate the cart with Product details
    const populatedUser = await User.findById(user._id).populate('cart.productId');

    res.status(200).json({
      message: "Login successful",
      token,
      cart: populatedUser.cart,  // Return populated cart
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
});

// Validate Token
userRouter.get('/validate-token', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    res.status(200).json({ message: "Token is valid", payload: decoded });
  });
});

// Logout User
userRouter.post("/logout", async (req, res) => {
  try {
    const { cart } = req.body; 
    const token = req.cookies.token; 
    
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
    const userId = decodedToken.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // In case the cart data is already populated with product details, no need to refetch productId
    const updatedCart = cart.map(item => {
      return {
        id: item.id,
        quantity: item.quantity,
        image: item.image, 
        title: item.title, 
        price: item.price,
      };
    });

    user.cart = updatedCart;
    await user.save();

    res.cookie("token", "", {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      expires: new Date(0), 
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: error.message });
  }
});

export default userRouter;