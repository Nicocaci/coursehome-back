import OrderRepository from "../repository/order-repository.js";

class OrderService {
    async createOrder(data) {
        return await OrderRepository.createOrder(data);
    }
    async getOrders() {
        return await OrderRepository.getOrders();
    }
    async getOrderById(id) {
        return await OrderRepository.getOrderById(id);
    }
    async getOrderByStatus(status) {
        return await OrderRepository.getOrderByStatus(status);
    }
    async getOrderByUser(userId) {
        return await OrderRepository.getOrderByUser(userId);
    }
    async updateOrder(id, data) {
        return await OrderRepository.updateOrder(id, data);
    }
    async deleteOrder(id) {
        return await OrderRepository.deleteOrder(id);
    }
    async updateOrderStatus(id, status) {
        return await OrderRepository.updateOrderStatus(id, status);
    }

}

export default new OrderService();