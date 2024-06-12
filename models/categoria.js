// models/categoria.js
const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  nombre: { type: String },
  imagen: { type: String}
});

module.exports = mongoose.model('Categoria', categoriaSchema);
