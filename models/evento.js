// models/Evento.js

const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
  imagen: { type: String},
  nombre: { type: String},
  fecha: { type: Date},
  descripcion: { type: String }
});

module.exports = mongoose.model('Evento', eventoSchema);

