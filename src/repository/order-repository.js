import OrderDAO from "../dao/order-dao.js";

class OrderRepository {
    async createOrder(data) {
        return await OrderDAO.createOrder(data);
    }
    async getOrders(){
        return await OrderDAO.getOrders();
    }
    async getOrderById(id){
        return await OrderDAO.getOrderById(id);
    }
    async getOrderByStatus(status){
        return await OrderDAO.getOrderByStatus(status);
    }
    async getOrderByUser(userId){
        return await OrderDAO.getOrderByUser(userId);
    }
    async updateOrder(id, data){
        return await OrderDAO.updateOrder(id, data);
    }
    async deleteOrder(id){
        return await OrderDAO.deleteOrder(id);
    }
    async updateOrderStatus(id, status){
        return await OrderDAO.updateOrderStatus(id, status);
    }
}

export default new OrderRepository();