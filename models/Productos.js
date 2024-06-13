const mongoose = require('mongoose');
const moment = require('moment');
const { Schema } = mongoose;

const productoSchema = new Schema({
  nombre: { type: String, required: true },
  marca: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  clase: { type: String, required: true },
  subclase: { type: String, required: false },
  stock: { type: Number, required: true },
  proveedor_id: { type: Schema.Types.ObjectId, ref: 'Proveedor', required: true },
  imagen: { type: String, required: false },  
  ventas: [{
    vendedor_id: { type: Schema.Types.ObjectId, ref: 'Vendedor', required: true },
    cantidad: { type: Number, required: true },
    fecha_venta: { type: String, default: moment().format('YYYY-MM-DDTHH:mm:ss') },
    comprador_id: { type: Schema.Types.ObjectId, ref: 'Comprador', required: true },
    precio_unitario: { type: Number, required: true }
  }]
});

const Producto = mongoose.model('Producto', productoSchema);
module.exports = Producto;
