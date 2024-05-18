const Comprador = require('../models/Compradores');
const Transaccion = require('../models/Transacciones');
const mongoose = require('mongoose');

const compradorController = {};
const vendedorController = {};

compradorController.crearComprador = async (req, res) => {
  try {
    const nuevoComprador = new Comprador(req.body);
    await nuevoComprador.save();
    res.status(201).json({ message: 'Comprador creado exitosamente', comprador: nuevoComprador });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al crear el comprador' });
  }
};


compradorController.obtenerCompradores = async (req, res) => {
  try {
    const compradores = await Comprador.find();
    res.status(200).json(compradores);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al obtener los compradores' });
  }
};


compradorController.obtenerCompradorPorId = async (req, res) => {
  try {
    const comprador = await Comprador.findById(req.params.id);
    comprador ? res.status(200).json(comprador) : res.status(404).json({ error: 'Comprador no encontrado' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al obtener el comprador' });
  }
};


compradorController.actualizarComprador = async (req, res) => {
  try {
    const compradorActualizado = await Comprador.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    compradorActualizado ? res.status(200).json(compradorActualizado) : res.status(404).json({ error: 'Comprador no encontrado' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al actualizar el comprador' });
  }
};


compradorController.eliminarComprador = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'ID de comprador no válido' });
    }

    const compradorEliminado = await Comprador.findByIdAndDelete(req.params.id);
    if (compradorEliminado) {
      return res.status(200).json({ message: 'Comprador eliminado exitosamente', comprador: compradorEliminado });
    } else {
      return res.status(404).json({ error: 'Comprador no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al eliminar el comprador' });
  }
};

vendedorController.crearCompra = async (req, res) => {
  try {
    const { producto_id, cantidad } = req.body;

    if (!producto_id || !cantidad) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios: producto_id, cantidad' });
    }


    const nuevaCompra = new Transaccion({ 
      tipo: 'compra', 
      vendedor_id: req.params.id,
      producto_id,
      cantidad
    });
    await nuevaCompra.save();


    const producto = await Producto.findById(producto_id);
    if (producto) {
      producto.stock += cantidad;
      await producto.save();
    }

    res.status(201).json({ message: 'Compra creada exitosamente', compra: nuevaCompra });
  } catch (error) {
    console.error(error);

    if (error.name === 'ValidationError') {
      res.status(400).json({ error: 'Error de validación', detalles: error.errors });
    } else {
      res.status(500).json({ error: 'Error al crear la compra' });
    }
  }
};

module.exports = vendedorController;
module.exports = compradorController;
