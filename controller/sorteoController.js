// controllers/sorteoController.js
const Sorteo = require('../models/sorteo');

exports.createSorteo = async (req, res) => {
  try {

  

    console.log('Body:', req.body); 
    console.log('File:', req.file); 
    const nuevoSorteo = new Sorteo({
      imagen: req.file.path,
      titulo: req.body.titulo,
      fecha: req.body.fecha,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion 
    });
    await nuevoSorteo.save();
    res.status(201).json({ message: 'Sorteo agregado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para eliminar un sorteo
exports.deleteSorteo = async (req, res) => {
  try {
    const sorteoId = req.params.id;
    const sorteo = await Sorteo.findByIdAndDelete(sorteoId);
    if (!sorteo) {
      return res.status(404).json({ message: 'Sorteo no encontrado' });
    }
    res.json({ message: 'Sorteo eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllSorteos = async (req, res) => {
  try {
    const sorteos = await Sorteo.find();
    res.json(sorteos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSorteoById = async (req, res) => {
  try {
    const sorteo = await Sorteo.findById(req.params.id);
    if (sorteo == null) {
      return res.status(404).json({ message: 'Sorteo no encontrado' });
    }
    res.json(sorteo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSorteo = async (req, res) => {
  try {
    const sorteo = await Sorteo.findById(req.params.id);
    if (sorteo == null) {
      return res.status(404).json({ message: 'Sorteo no encontrado' });
    }
    if (req.body.nombre != null) {
      sorteo.nombre = req.body.nombre;
    }
    if (req.file.filename != null) {
      sorteo.imagen =  req.file.filename;
    }
    if (req.body.titulo != null) {
      sorteo.titulo = req.body.titulo;
    }
    if (req.body.fecha != null) {
      sorteo.fecha = req.body.fecha;
    }
    if (req.body.descripcion != null) {
      sorteo.descripcion = req.body.descripcion;
    }
    const sorteoActualizado = await sorteo.save();
    res.json(sorteoActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};