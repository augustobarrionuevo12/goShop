const mongoose = require('mongoose');

// Esquema del producto
const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    image: { type: String }, // Ruta o enlace de la imagen
});

// Modelo del producto basado en el esquema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
