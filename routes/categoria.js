// routes/categoriaRoutes.js
const express = require('express');
const router = express.Router();
const categoriaController = require('../controller/categoriaController');
const multer = require('multer')
const path = require('path')


const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../cloudinaryConfig');



const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'categorias',
    format: async (req, file) => 'jpeg', 
    public_id: (req, file) => Date.now().toString() + '-' + file.originalname,
  },
})


const upload = multer({ storage: storage });

// Ruta para crear una nueva categoría con la carga de imagen
router.post('/', upload.single('imagen'), categoriaController.createCategoria);

// Ruta para obtener todas las categorías
router.get('/', categoriaController.getAllCategorias);

// Ruta para obtener una categoría por ID
router.get('/:id', categoriaController.getCategoriaById);

// Ruta para actualizar una categoría
router.put('/:id', categoriaController.updateCategoria);

router.delete('/:id', categoriaController.deleteCategoria);

module.exports = router;




