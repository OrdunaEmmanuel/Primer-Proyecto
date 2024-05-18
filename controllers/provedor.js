const Proveedor = require('../models/Provedor');
const mongoose = require('mongoose');

const proveedor = {};

proveedor.crearProveedor = async (req, res) => {
  try {
    const nuevoProveedor = new Proveedor(req.body);
    await nuevoProveedor.save();
    res.status(201).json({ message: 'Proveedor creado exitosamente', proveedor: nuevoProveedor });
    console.log('Proveedor creado exitosamente ');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el proveedor' });
  }
};

proveedor.obtenerProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.find();
    res.status(200).json(proveedores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los proveedores' });
  }
};

proveedor.obtenerProveedorPorId = async (req, res) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id);
    proveedor ? res.status(200).json(proveedor) : res.status(404).json({ error: 'Proveedor no encontrado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el proveedor' });
  }
};

proveedor.actualizarProveedor = async (req, res) => {
  try {
    const proveedorActualizado = await Proveedor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    proveedorActualizado ? res.status(200).json(proveedorActualizado) : res.status(404).json({ error: 'Proveedor no encontrado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el proveedor' });
  }
};

proveedor.eliminarProveedor = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'ID de proveedor no válido' });
    }

    const proveedorEliminado = await Proveedor.findByIdAndDelete(req.params.id);
    if (proveedorEliminado) {
      return res.status(200).json({ message: 'Proveedor eliminado exitosamente', proveedor: proveedorEliminado });
    } else {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el proveedor' });
  }
};

module.exports = proveedor;
