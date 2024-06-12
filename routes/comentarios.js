// routes/comentarioRoutes.js
const express = require('express');
const router = express.Router();
const comentarioController = require('../controller/comentarioController');

// Ruta para agregar un nuevo comentario
router.post('/', comentarioController.createComentario);

//ruta para traer todos los comentarios
router.get('/', comentarioController.getAllComentarios);
router.post('/', comentarioController.createComentario);

//ruta para traer todos los comentarios
router.get('/', comentarioController.getAllComentarios);

// Ruta para eliminar un 
router.delete('/:id', comentarioController.deleteComentario);

module.exports = router;
