const mongoose = require('mongoose');
const moment = require('moment');
const { Schema } = mongoose;


const compradorSchema = new Schema({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  contacto: { type: String, required: true },
  compras_realizadas: [{
    precio_unitario: { type: Number, required: true },
    producto_id: { type: Schema.Types.ObjectId, ref: 'Producto', required: true },
    cantidad: { type: Number, required: true },
    fecha_venta: { type: String, default: moment().format('YYYY-MM-DDTHH:mm:ss') },
    vendedor_id: { type: Schema.Types.ObjectId, ref: 'Vendedor', required: true },
  }]
});


const Comprador = mongoose.models.Comprador || mongoose.model('Comprador', compradorSchema);

module.exports = Comprador;
