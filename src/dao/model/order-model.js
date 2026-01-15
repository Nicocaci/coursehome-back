import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: { type: Number, required: true}
        }
    ],
    total: { type: Number, required: true},
    date: { type: Date, default: Date.now},
    status: { type: String, enum: ['pendiente', 'enviado', 'entregado', 'cancelado'], default: 'pendiente'}
});

const OrderModel = mongoose.model('orders', orderSchema);

export default OrderModel;