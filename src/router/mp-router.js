import express from "express";
import { createOrder, mercadoPagoWebhook } from "../controller/mp-controller.js";

const router = express.Router()
router.post('/create_order', createOrder);
// webhook de Mercado Pago
router.post("/webhook", mercadoPagoWebhook);
export default router;