import OrderController from "../controller/order-controller.js";
import express from "express";

const router = express.Router();

router.post('/', OrderController.createOrder);
router.get('/', OrderController.getOrders);
router.get('/:id', OrderController.getOrderById);
router.get('/status/:status', OrderController.getOrderByStatus);
router.get('/user/:userId', OrderController.getOrderByUser);
router.put('/:id', OrderController.updateOrder);
router.delete('/:id', OrderController.deleteOrder);
router.put('/:id/status', OrderController.updateOrderStatus);

export default router;