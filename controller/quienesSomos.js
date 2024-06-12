// controllers/categoriaController.js
const QuienesSomos = require('../models/quienesSomos');

exports.createSomos = async (req, res) => {
  try {

    console.log('Body:', req.body); 
    console.log('File:', req.file); 
    const nuevoSomos = new QuienesSomos({
      imagen: req.file.path,
      descripcion: req.body.descripcion
    });
    await nuevoSomos.save();
    res.status(201).json({ message: 'Quien Somos agregado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getSomos = async (req, res) => {
  try {
    const nuevoSomos = await QuienesSomos.find();
    res.json(nuevoSomos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteSomos = async (req, res) => {
  try {
    const quienesSomosId = req.params.id;
    const quienesSomos = await QuienesSomos.findByIdAndDelete(quienesSomosId);
    if (!quienesSomos) {
      return res.status(404).json({ message: 'no encontrado' });
    }
    res.json({ message: ' eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSomos = async (req, res) => {
  try {
    const somos = await Somos.findById(req.params.id);
    if (somos == null) {
      return res.status(404).json({ message: 'Quien Somos no encontrado' });
    }
    if (req.file.filename != null) {
      somos.imagen =  req.file.filename;
    }
    if (req.body.descripcion != null) {
      somos.descripcion = req.body.descripcion;
    }
    const somosActualizado = await somos.save();
    res.json(somosActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};