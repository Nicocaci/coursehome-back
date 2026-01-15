import CartDao from "../dao/cart-dao.js";

class CartRepository {
    async createCart(data) {
        return await CartDao.createCart(data);
    }
    async getCartById(cid) {
        return await CartDao.getCartById(cid);
    }
    async updateCart(cid, cart) {
        return await CartDao.updateCart(cid, cart);
    }
    async deleteCart(cid) {
        return await CartDao.deleteCart(cid);
    }
    async getCarts() {
        return await CartDao.getCarts();
    }
    async addProductToCart(cid, pid, quantity) {
        return await CartDao.addProductToCart(cid, pid, quantity);
    }
    async removeProductFromCart(cid, pid) {
        return await CartDao.removeProductFromCart(cid, pid);
    }
    async updateProductQuantity(cid, pid, quantity) {
        return await CartDao.updateProductQuantity(cid, pid, quantity);
    }
    async clearCart(cid) {
        return await CartDao.clearCart(cid);
    }
}
export default new CartRepository();