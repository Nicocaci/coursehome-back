import OrderModel from "./model/order-model.js";

class OrderDAO {
    async createOrder(data) {
        try {
            const newOrder = await OrderModel.create(data);
            return newOrder;
        } catch (error) {
            throw error;
        }
    };
    async getOrders() {
        try {
            const orders = await OrderModel.find();
            return orders;
        } catch (error) {
            throw error;
        }
    };
    async getOrderById(id) {
        try {
            const order = await OrderModel.findById(id).populate('user products.product');
            return order;
        } catch (error) {
            throw error;
        }
    };
    async getOrderByUser(userId) {
        try {
            const orders = await OrderModel.find({ user: userId });
            return orders;
        } catch (error) {
            throw error;
        }
    };
    async updateOrder(id, data) {
        try {
            const order = await OrderModel.findByIdAndUpdate(id, data, { new: true });
            return order;
        } catch (error) {
            throw error;
        }
    };
    async deleteOrder(id) {
        try {
            const order = await OrderModel.findByIdAndDelete(id);
            return order;
        } catch (error) {
            throw error;
        }
    };
    async getOrderByStatus(status) {
        try {
            const orders = await OrderModel.find({ status });
            return orders;
        } catch (error) {
            throw error;
        }
    };
    async updateOrderStatus(id, status) {
        try {
            const order = await OrderModel.findByIdAndUpdate(id, { status }, { new: true });
            return order;
        } catch (error) {
            throw error;
        }
    };
}

export default new OrderDAO();