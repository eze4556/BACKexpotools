// models/quienesSomos.js
const mongoose = require('mongoose');

const quienesSomosSchema = new mongoose.Schema({
  descripcion: { type: String },
  imagen: { type: String}
});

module.exports = mongoose.model('QuienesSomos', quienesSomosSchema);