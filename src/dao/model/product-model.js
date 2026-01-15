import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
        sku: { type: String, required: true, unique: true},
        name: { type : String, required: true},
        imagen: { type: [String]},
        descripcion: { type: String, required: true},
        categoria: { type: String, required: true},
        subcategoria: { type: String, required:true },
        precio: { type: Number, required: true},
        stock: { type: Number, required: true},
        estado: { type: String, enum: ["activo", "inactivo"], default: "activo"} 
})
const ProductModel = mongoose.model("products", productSchema);

export default ProductModel;