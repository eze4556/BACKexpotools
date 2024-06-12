// routes/categoriaRoutes.js
const express = require('express');
const router = express.Router();
const quienesSomos= require('../controller/quienesSomos')

const multer = require('multer')
const path = require('path')


const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../cloudinaryConfig');



const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'queSomos',
    format: async (req, file) => 'jpeg', 
    public_id: (req, file) => Date.now().toString() + '-' + file.originalname,
  },
})

const upload = multer({ storage: storage });

// Ruta para crear una nueva categoría con la carga de imagen
router.post('/', upload.single('imagen'), quienesSomos.createSomos);


router.get('/', quienesSomos.getSomos)

router.delete('/:id', quienesSomos.deleteSomos)

module.exports = router;
