const Transaccion = require('../models/Transacciones');
const Vendedor = require('../models/Vendedores');
const Comprador = require('../models/Compradores');
const Producto = require('../models/Productos');

const transaccionController = {};

transaccionController.crearTransaccion = async (req, res) => {
  try {
    const nuevaTransaccion = new Transaccion(req.body);
    await nuevaTransaccion.save();

    await actualizarDocumentos(nuevaTransaccion);

    res.status(201).json({ message: 'Transacción creada exitosamente', transaccion: nuevaTransaccion });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al crear la transacción' });
  }
};

async function actualizarDocumentos(transaccion) {
  const { tipo, vendedor_id, comprador_id, producto_id, cantidad } = transaccion;

  try {
    const vendedorPromise = actualizarVendedor(vendedor_id, transaccion);
    const compradorPromise = actualizarComprador(comprador_id, transaccion);
    const productoPromise = actualizarProducto(producto_id, transaccion, tipo, cantidad);

    await Promise.all([vendedorPromise, compradorPromise, productoPromise]);
  } catch (error) {
    console.error('Error al actualizar documentos:', error);

    await Transaccion.findByIdAndDelete(transaccion._id);
    throw error;
  }
}

async function actualizarVendedor(vendedor_id, transaccion) {
  if (!vendedor_id) return;

  const vendedor = await Vendedor.findById(vendedor_id);
  if (!vendedor) return;

  vendedor.ventas_realizadas.push(transaccion);
  await vendedor.save();
}

async function actualizarComprador(comprador_id, transaccion) {
  if (!comprador_id) return;

  const comprador = await Comprador.findById(comprador_id);
  if (!comprador) return;

  comprador.compras_realizadas.push({
    precio_unitario: transaccion.precio_unitario,
    producto_id: transaccion.producto_id,
    cantidad: transaccion.cantidad,
    fecha_venta: transaccion.fecha_transaccion,
    vendedor_id: transaccion.vendedor_id
  });
  await comprador.save();
}

async function actualizarProducto(producto_id, transaccion, tipo, cantidad) {
  if (!producto_id) throw new Error('ID de producto no proporcionado');

  const producto = await Producto.findById(producto_id);
  if (!producto) throw new Error('Producto no encontrado');

  if (tipo === 'venta' && producto.stock < cantidad) {
    throw new Error('No hay suficiente stock para realizar la venta');
  }

  producto.stock -= cantidad;
  const productonew = await producto.save();
  return productonew;
}

transaccionController.obtenerTransacciones = async (req, res) => {
  try {
    const { tipo, skip = 0, limit = 10 } = req.query;
    const filtro = tipo ? { tipo } : {};
    const transacciones = await Transaccion.find(filtro).skip(parseInt(skip)).limit(parseInt(limit));
    res.status(200).json(transacciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las transacciones' });
  }
};

transaccionController.obtenerTransaccionPorId = async (req, res) => {
  try {
    const transaccion = await Transaccion.findById(req.params.id);
    transaccion ? res.status(200).json(transaccion) : res.status(404).json({ error: 'Transacción no encontrada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la transacción' });
  }
};

transaccionController.actualizarTransaccion = async (req, res) => {
  try {
    const transaccionActualizada = await Transaccion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    transaccionActualizada ? res.status(200).json(transaccionActualizada) : res.status(404).json({ error: 'Transacción no encontrada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la transacción' });
  }
};

transaccionController.eliminarTransaccion = async (req, res) => {
  try {
    const transaccionEliminada = await Transaccion.findByIdAndDelete(req.params.id);
    transaccionEliminada ? res.status(200).json({ message: 'Transacción eliminada exitosamente', transaccion: transaccionEliminada }) : res.status(404).json({ error: 'Transacción no encontrada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la transacción' });
  }
};

module.exports = transaccionController;
