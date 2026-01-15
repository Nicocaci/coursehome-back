import OrderService from "../service/order-service.js";

class OrderController {
    async createOrder(req, res) {
        try {
            const newOrder = await OrderService.createOrder(req.body);
            res.status(201).json(newOrder);
        } catch (error) {
            res.status(500).json({
                message: 'Error al crear la orden',
                error: error.message
            })
        }
    };
    async getOrders(req, res) {
        try {
            const orders = await OrderService.getOrders();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener las ordenes',
                error: error.message
            })
        }
    };
    async getOrderById(req, res) {
        try {
            const order = await OrderService.getOrderById(req.params.id);
            if (!order) {
                return res.status(404).json({
                    message: 'Orden no encontrada'
                })
            }
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener la orden',
                error: error.message
            })
        }
    };
    async getOrderByStatus(req, res) {
        try {
            const order = await OrderService.getOrderByStatus(req.params.status);
            if (!order || order.length === 0) {
                return res.status(404).json({
                    message: 'Orden no encontrada'
                })
            }
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener la orden',
                error: error.message
            })
        }
    };
    async getOrderByUser(req, res) {
        try {
            const order = await OrderService.getOrderByUser(req.params.userId);
            if (!order || order.length === 0) {
                return res.status(404).json({
                    message: 'Orden no encontrada'
                })
            }
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener la orden',
                error: error.message
            })
        }
    };
    async updateOrder(req, res) {
        try {
            const order = await OrderService.updateOrder(req.params.id, req.body);
            if (!order) {
                return res.status(404).json({
                    message: 'Orden no encontrada'
                })
            }
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener la order',
                error: error.message
            })
        }
    }
    async deleteOrder(req, res) {
        try {
            const order = await OrderService.deleteOrder(req.params.id);
            if (!order) {
                return res.status(404).json({
                    message: 'Orden no encontrado'
                })
            }
            res.status(200).json({
                message: 'Orden eliminado con éxito'
            })
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener la order',
                error: error.message
            })
        }
    }

    async updateOrderStatus(req, res) {
        try {
            const order = await OrderService.updateOrderStatus(req.params.id, req.body.status);
            if (!order) {
                return res.status(404).json({
                    message: 'Orden no encontrado'
                })
            };
            res.status(200).json({
                message: 'Estado de la orden actualizado con éxito',
                order
            })
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener la order',
                error: error.message
            })
        }
    };
}

export default new OrderController();