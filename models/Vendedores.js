const mongoose = require('mongoose');
const moment = require('moment');
const { Schema } = mongoose;

const vendedorSchema = new Schema({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  contacto: { type: String, required: true },
  ventas_realizadas: [{
    producto_id: { type: Schema.Types.ObjectId, ref: 'Producto', required: true },
    cantidad: { type: Number, required: true },
    fecha_venta: { type: String, default: moment().format('YYYY-MM-DDTHH:mm:ss') },
    comprador_id: { type: Schema.Types.ObjectId, ref: 'Comprador', required: true },
    precio_unitario: { type: Number, required: true }
  }]
});

// Evitar redefinición del modelo
const Vendedor = mongoose.models.Vendedor || mongoose.model('Vendedor', vendedorSchema);

module.exports = Vendedor;
