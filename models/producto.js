// models/Producto.js
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: {type:String},
  imagen: { type: String },
  precio: { type: Number, required: true },
  descuento: { type: Number, default: 0 },
  precioFinal: { type: Number },
  precioDistribuidor: { type: Number},
   etiqueta: {type:String},
  categorias: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' }], // Referencia a la categoría



});

module.exports = mongoose.model('Producto', productoSchema);
