// controllers/eventoController.js
const Evento = require('../models/evento');


const fs = require('fs');
const path = require('path'); 




// Controlador para crear un nuevo evento
// exports.createEvento = async (req, res) => {
//   try {
//     const nuevoEvento = new Evento(req.body);
//     await nuevoEvento.save();
//     res.status(201).json({ message: 'Evento creado exitosamente' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
      

exports.createEvento = async (req, res) => {
  try {

    console.log('Body:', req.body); 
    console.log('File:', req.file); 
    const nuevoEvento = new Evento({

      imagen: req.file.path,
      nombre: req.body.nombre,
      fecha: req.body.fecha,
      descripcion: req.body.descripcion 
    });
    await nuevoEvento.save();
    res.status(201).json({ message: 'Evento agregado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Controlador para eliminar un evento
exports.deleteEvento = async (req, res) => {
  try {
    const eventoId = req.params.id;
    const evento = await Evento.findByIdAndDelete(eventoId);
    if (!evento) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

// Eliminar la imagen asociada al producto del servidor
    const imagenPath = path.join(__dirname, '../uploads', evento.imagen);
    if (fs.existsSync(imagenPath)) {
      fs.unlinkSync(imagenPath);
    }



    res.json({ message: 'Evento eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllEventos = async (req, res) => {
  try {
    const eventos = await Evento.find();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEventoById = async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id);
    if (evento == null) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    res.json(evento);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEvento = async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id);
    if (evento == null) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    if (req.body.nombre != null) {
      evento.nombre = req.body.nombre;
    }
    if (req.body.fecha != null) {
      evento.fecha = req.body.fecha;
    }
    if (req.body.descripcion != null) {
      evento.descripcion = req.body.descripcion;
    }
    if (req.body.foto != null) {
      evento.foto = req.body.foto;
    }
    const eventoActualizado = await evento.save();
    res.json(eventoActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
