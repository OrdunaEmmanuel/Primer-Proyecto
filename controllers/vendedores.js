
const Vendedor = require('../models/Vendedores');
const Transaccion = require('../models/Transacciones');
const mongoose = require('mongoose');

const vendedorController = {};

// Crear un nuevo vendedor
vendedorController.crearVendedor = async (req, res) => {
  try {
    const nuevoVendedor = new Vendedor(req.body);
    await nuevoVendedor.save();
    res.status(201).json({ message: 'Vendedor creado exitosamente', vendedor: nuevoVendedor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el vendedor' });
  }
};

// Obtener todos los vendedores
vendedorController.obtenerVendedores = async (req, res) => {
  try {
    const vendedores = await Vendedor.find();
    res.status(200).json(vendedores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los vendedores' });
  }
};

// Obtener un vendedor por ID
vendedorController.obtenerVendedorPorId = async (req, res) => {
  try {
    const vendedor = await Vendedor.findById(req.params.id);
    vendedor ? res.status(200).json(vendedor) : res.status(404).json({ error: 'Vendedor no encontrado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el vendedor' });
  }
};


vendedorController.actualizarVendedor = async (req, res) => {
  try {
    const vendedorActualizado = await Vendedor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    vendedorActualizado ? res.status(200).json(vendedorActualizado) : res.status(404).json({ error: 'Vendedor no encontrado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el vendedor' });
  }
};


vendedorController.eliminarVendedor = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'ID de vendedor no válido' });
    }

    const vendedorEliminado = await Vendedor.findByIdAndDelete(req.params.id);
    if (vendedorEliminado) {
      return res.status(200).json({ message: 'Vendedor eliminado exitosamente', vendedor: vendedorEliminado });
    } else {
      return res.status(404).json({ error: 'Vendedor no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el vendedor' });
  }
};


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
