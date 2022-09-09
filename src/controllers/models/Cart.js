import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    timestamp: { type: Number, required: true },
    productos: { type: Array, required: true },
    id: { type: Number, required: true }
});

export const Cart = mongoose.model('carts', cartSchema);