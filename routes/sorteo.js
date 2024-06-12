// routes/sorteoRoutes.js
const express = require('express');
const router = express.Router();
const sorteoController = require('../controller/sorteoController');
const multer = require('multer')
const path = require('path')


const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../cloudinaryConfig');



const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'sorteo',
    format: async (req, file) => 'jpeg', 
    public_id: (req, file) => Date.now().toString() + '-' + file.originalname,
  },
})

const upload = multer({ storage: storage });

// Ruta para crear una nueva categoría con la carga de imagen
router.post('/', upload.single('imagen'), sorteoController.createSorteo);

// Ruta para eliminar un sorteo
router.delete('/:id', sorteoController.deleteSorteo);
// Ruta para obtener todos los sorteos
router.get('/', sorteoController.getAllSorteos);

// Ruta para obtener un sorteo por ID
router.get('/:id', sorteoController.getSorteoById);

// Ruta para actualizar un sorteo
router.put('/:id', sorteoController.updateSorteo);

module.exports = router;
