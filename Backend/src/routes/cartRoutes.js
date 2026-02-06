import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { addToCart, getCart, removeFromCart, updateCart } from "../controllers/cartController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getCart);
router.post("/add", addToCart);
router.post("/update", updateCart);
router.delete("/remove/:id", removeFromCart);

export default router;