// models/NuevoProducto.js
const mongoose = require('mongoose');

const nuevoProductoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: {type:String},
  imagen: { type: String },
  precio: { type: Number, required: true },
  descuento: { type: Number, default: 0 },
  precioFinal: { type: Number },
  categorias: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' }] // Referencia a la categoría
});

module.exports = mongoose.model('NuevoProducto', nuevoProductoSchema);
