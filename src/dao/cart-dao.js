import CartModel from "./model/cart-model.js";
import ProductModel from "./model/product-model.js";

class CartDao {
    async createCart(data) {
        try {
            const newCart = await CartModel.create(data);
            return newCart;
        } catch (error) {
            throw error;
        }
    };
    async getCarts() {
        try {
            const carts = await CartModel.find().populate('user')
            return carts;
        } catch (error) {
            throw error;
        }
    };
    async getCartById(cid) {
        try {
            const cart = await CartModel.findById(cid).populate('products.product');
            return cart;
        } catch (error) {
            throw error;
        }
    };
    async updateCart(cid, data) {
        try {
            const cart = await CartModel.findByIdAndUpdate(cid, data);
            return cart;
        } catch (error) {
            throw error;
        }
    };
    async deleteCart(cid) {
        try {
            const cart = await CartModel.findByIdAndDelete(cid);
            return cart;
        } catch (error) {
            throw error;
        }
    };
    async addProductToCart(cid, pid, quantity) {
        try {
            const cart = await CartModel.findById(cid).populate('products.product');
            if (!cart) {
                throw new Error('Carrito no encontrado')
            }
            const existingProduct = cart.products.find(
                p => p.product?._id.toString() === pid.toString()
            );

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.products.push({ product: pid, quantity })
            }
            await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    };
    async removeProductFromCart(cid, pid) {
        try {
            const cart = await CartModel.findById(cid).populate('products.product');
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }
            cart.products = cart.products = cart.products.filter(
                p => p.product._id.toString() !== pid.toString()
            );
            await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    };
    async updateProductQuantity(cid, pid, quantity) {
        try {
            const cart = await CartModel.findById(cid).populate('products.product');
            if (!cart) {
                throw new Error('Carrito no encontrado');
            }

            const existingProduct = cart.products.find(
                p => p.product._id.toString() === pid.toString()
            );

            if (!existingProduct) {
                throw new Error('Producto no encontrado en el carrito');
            }

            existingProduct.quantity = quantity;

            await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    };
    async clearCart(cid) { 
        try {
            const cart = await CartModel.findByIdAndDelete(cid);
            if (!cart) {
                throw new Error('Carrito no encontrado')
            }
            cart.products = [];
            await cart.save();
            return cart;
        } catch (error) {
            throw error;
        }
    };
}

export default new CartDao();