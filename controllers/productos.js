const Transaccion = require('../models/Transacciones');
const Producto = require('../models/Productos');
const mongoose = require('mongoose');

const productoController = {};
const vendedorController = {};


productoController.crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.status(201).json({ message: 'Producto creado exitosamente', producto: nuevoProducto });
    console.log('Producto creado exitosamente ');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Er ror al crear el producto' });
  }
};

productoController.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find(req.params.id);
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

// Actualizar el documento del producto


// Crear una nueva transacción de venta realizada por un vendedor
vendedorController.crearVenta = async (req, res) => {
  try {
    const { producto_id, cantidad } = req.body;

    if (!producto_id || !cantidad) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios: producto_id, cantidad' });
    }

    const nuevaVenta = new Transaccion({ 
      tipo: 'venta', 
      vendedor_id: req.params.id,
      producto_id,
      cantidad
    });
    await nuevaVenta.save();

    // Actualizar el stock del producto
    const producto = await Producto.findById(producto_id);
    if (producto) {
      producto.stock -= cantidad; // Restar la cantidad vendida al stock
      await producto.save();
    }

    res.status(201).json({ message: 'Venta creada exitosamente', venta: nuevaVenta });
  } catch (error) {
    console.error(error);

    if (error.name === 'ValidationError') {
      res.status(400).json({ error: 'Error de validación', detalles: error.errors });
    } else {
      res.status(500).json({ error: 'Error al crear la venta' });
    }
  }
};
module.exports = vendedorController;
module.exports = productoController;
