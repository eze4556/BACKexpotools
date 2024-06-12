// routes/nuevoProductoRoutes.js
const express = require('express');
const router = express.Router();
const nuevoProductoController = require("../controller/nuevoPcontroller");
const multer = require('multer')
const path = require('path')

const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../cloudinaryConfig');



const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'productoNuevo',
    format: async (req, file) => 'jpeg', 
    public_id: (req, file) => Date.now().toString() + '-' + file.originalname,
  },
})



const upload = multer({ storage: storage });

// Ruta para crear un nuevo evento con la carga de imagen
router.post('/', upload.single('imagen'), nuevoProductoController.createNuevoProducto);

router.get('/', nuevoProductoController.getAllProductos);
router.get('/categoria/:id', nuevoProductoController.getProductoByCategoriaId);
router.get('/:id', nuevoProductoController.getProductoById);
router.put('/:id', nuevoProductoController.updateProducto);
router.delete('/:id', nuevoProductoController.deleteProducto);


module.exports = router;
