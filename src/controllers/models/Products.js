import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  title: {type: String, required: true},
  descripcion: {type: String, required: true},
  codigo: {type: String, required: true},
  thumbnail: {type: String, required: true},
  price: {type: String, required: true, default: "0"},
  stock: {type: String, required: true, default: "0"},
  timestamp: {type: Number, required: true}
});

export const Products = mongoose.model('products', productsSchema);