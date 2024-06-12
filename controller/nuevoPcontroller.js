// controllers/nuevoProductoController.js
const NuevoProducto = require('../models/nuevoProducto');
const Categoria = require('../models/categoria');


const fs = require('fs');
const path = require('path'); 


// imagen: req.
      //  file.filename,

exports.createNuevoProducto = async (req, res) => {
  try {

      // Obtiene las categorías seleccionadas del cuerpo de la solicitud
    const categoriasSeleccionadas = req.body.categorias;

   // Agrega el console.log para imprimir req.body
    console.log('Datos del cuerpo de la solicitud:', req.body);

    const producto = new NuevoProducto({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      imagen: req.file.path,
      precio: req.body.precio,
      descuento: req.body.descuento || 0,
      precioFinal: req.body.precio - (req.body.descuento || 0),
      categorias: categoriasSeleccionadas 
    });

    // Guarda el producto en la base de datos
    const nuevoProducto = await producto.save();

     // Asocia el producto con las categorías seleccionadas
    if (categoriasSeleccionadas && categoriasSeleccionadas.length > 0) {
      await Categoria.updateMany({ _id: { $in: categoriasSeleccionadas } }, { $push: { productos: nuevoProducto._id } });
    }

    res.status(201).json({ message: 'Nuevo Producto agregado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para crear un nuevo producto
// exports.createNuevoProducto = async (req, res) => {
//   try {
//     // Obtiene las categorías seleccionadas del cuerpo de la solicitud
//     const categoriasSeleccionadas = req.body.categorias;

//    // Agrega el console.log para imprimir req.body
//     console.log('Datos del cuerpo de la solicitud:', req.body);

//     // Crea un nuevo producto con los datos proporcionados
//     const NuevoProducto = new NuevoProducto({
//       nombre: req.body.nombre,
//       imagen: req.file.filename,
//       precio: req.body.precio,
//       descuento: req.body.descuento || 0,
//       precioFinal: req.body.precio - (req.body.descuento || 0),
//       categorias: categoriasSeleccionadas 
//     });

//     // Guarda el producto en la base de datos
//     const nuevoProducto = await producto.save();

//     // Asocia el producto con las categorías seleccionadas
//     if (categoriasSeleccionadas && categoriasSeleccionadas.length > 0) {
//       await Categoria.updateMany({ _id: { $in: categoriasSeleccionadas } }, { $push: { productos: nuevoProducto._id } });
//     }

//     res.status(201).json(nuevoProducto);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };



exports.getAllProductos = async (req, res) => {
  try {
    const NuevoProductos = await NuevoProducto.find();
    res.json(NuevoProductos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.getProductoById = async (req, res) => {
//   try {
//     const NuevoProducto = await NuevoProducto.findById(req.params.id);
//     if (!NuevoProducto) {
//       return res.status(404).json({ message: 'Producto no encontrado' });
//     }
//     res.json(NuevoProducto);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.getProductoById = async (req, res) => {
  try {
    
    const producto = await NuevoProducto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Controlador para obtener un producto por su ID
exports.getProductoByCategoriaId = async (req, res) => {
  try {
    const categoriaId = req.params.id; // Obtenemos el ID de la categoría de la solicitud
    const Nuevoproducto = await NuevoProducto.find({ categorias: categoriaId }); // Buscamos productos que tengan la categoría con el ID proporcionado
    res.json(Nuevoproducto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProducto = async (req, res) => {
  try {
    let nuevoProducto = await NuevoProducto.findById(req.params.id);
    if (!nuevoProducto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Actualizar campos si se proporcionan en el cuerpo de la solicitud
    if (req.body.nombre) nuevoProducto.nombre = req.body.nombre;
    if (req.body.imagen) nuevoProducto.imagen = req.body.imagen;
    if (req.body.precio) nuevoProducto.precio = req.body.precio;
    if (req.body.descuento) {
      nuevoProducto.descuento = req.body.descuento;
      nuevoProducto.precioFinal = nuevoProducto.precio - nuevoProducto.descuento;
    }

    const productoActualizado = await nuevoProducto.save();
    res.json(productoActualizado);
  } catch (error) {
    console.error(error); // Registrar el error completo
    res.status(400).json({ message: 'Error al actualizar el producto' });
  }
};



exports.deleteProducto = async (req, res) => {
  try {
    const nuevoProducto = await NuevoProducto.findById(req.params.id);
    if (nuevoProducto == null) {
      return res.status(404).json({ message: 'Nuevo Producto no encontrado' });
    }


 // Eliminar la imagen asociada al producto del servidor
    const imagenPath = path.join(__dirname, '../uploads', nuevoProducto.imagen);
    if (fs.existsSync(imagenPath)) {
      fs.unlinkSync(imagenPath);
    }

    await nuevoProducto.deleteOne({ _id: req.params.id });
    res.json({ message: 'Nuevo Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
