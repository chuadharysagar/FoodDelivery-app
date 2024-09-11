import express from 'express'
import { AddToCart, removeFromCart, getCart } from '../controllers/CartController.js'
import { authMiddleware } from '../middleware/auth.js';

const cartRouter = express.Router();


cartRouter.post("/add", authMiddleware, AddToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.post("/get", authMiddleware, getCart);



export default cartRouter;