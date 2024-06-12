// models/Comentario.js
const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
  nombre: {type: String},
  descripcion: { type: String},
  puntuacion: { type: Number}
});

module.exports = mongoose.model('Comentario', comentarioSchema);
