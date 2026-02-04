import express from "express";
import { createOrder } from "../controller/mp-controller.js";

const router = express.Router()
router.post('/create_order', createOrder);
export default router;