// models/Sorteo.js
const mongoose = require('mongoose');

const sorteoSchema = new mongoose.Schema({
  imagen: { type: String},
  titulo: { type: String, required: true },
  fecha: {type: Date, required: true},
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true }
});

module.exports = mongoose.model('Sorteo', sorteoSchema);
