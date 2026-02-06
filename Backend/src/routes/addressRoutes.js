
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { addAddress, deleteAddress, getAddress, updateAddress } from "../controllers/addressController.js";
const router = express.Router();

router.use(authMiddleware);
router.get("/", getAddress);

router.post("/", addAddress);
router.patch("/:id", updateAddress);

router.post("/:id", deleteAddress);


export default router;