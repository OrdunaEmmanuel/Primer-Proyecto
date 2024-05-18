const mongoose = require('mongoose');
const moment = require('moment');
const { Schema } = mongoose;

const transaccionSchema = new Schema({
  tipo: { type: String, enum: ['venta', 'compra'], required: true },
  vendedor_id: { type: Schema.Types.ObjectId, ref: 'Vendedor', required: true },
  comprador_id: { type: Schema.Types.ObjectId, ref: 'Comprador', required: true },
  producto_id: { type: Schema.Types.ObjectId, ref: 'Producto', required: true },
  cantidad: { type: Number, required: true },
  precio_unitario: { type: Number, required: true },
  fecha_transaccion: { type: String, default: moment().format('YYYY-MM-DDTHH:mm:ss') }
});

const Transaccion = mongoose.model('Transaccion', transaccionSchema);

module.exports = Transaccion;
