const Producto = require('../models/Productos');
const Transaccion = require('../models/Transacciones');
const mongoose = require('mongoose');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../config/aws-config');
require('dotenv').config();
const vendedorController = require('../controllers/vendedores'); // Importar el controlador de vendedores
const upload = require('../config/aws-upload-config'); 

const productoController = {};


productoController.crearProducto = async (req, res) => {
  upload.single('imagen')(req, res, async function (err) {
    if (err) {
      return res.status(500).json({ error: 'Error al subir la imagen' });
    }

    try {
      const nuevoProducto = new Producto({
        ...req.body,
        imagen: req.file ? req.file.location : null
      });
      await nuevoProducto.save();
      res.status(201).json({ message: 'Producto creado exitosamente', producto: nuevoProducto });
      console.log('Producto creado exitosamente');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el producto' });
    }
  });
};

productoController.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

productoController.obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    producto ? res.status(200).json(producto) : res.status(404).json({ error: 'Producto no encontrado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

productoController.actualizarProducto = async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    productoActualizado ? res.status(200).json(productoActualizado) : res.status(404).json({ error: 'Producto no encontrado' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al actualizar el producto' });
  }
};

productoController.eliminarProducto = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'ID de producto no válido' });
    }

    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    if (productoEliminado) {
      return res.status(200).json({ message: 'Producto eliminado exitosamente', producto: productoEliminado });
    } else {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al eliminar el producto' });
  }
};

module.exports = { productoController, vendedorController };
