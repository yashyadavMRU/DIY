import express from "express";
import { droneController } from "../controllers/droneController.js";

const router = express.Router();

router.get("/", droneController);

export default router;