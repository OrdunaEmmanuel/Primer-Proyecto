const mongoose = require('mongoose');
const moment = require('moment');
const { Schema } = mongoose;


const proveedorSchema = new Schema({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  contacto: { type: String, required: true },
  productos_entregados: [{
    producto_id: { type: Schema.Types.ObjectId, required: true },
    cantidad: { type: Number, required: true },
    fecha_entrega: { type: String, default: moment().format('YYYY-MM-DDTHH:mm:ss') }
  }]
});

const Proveedor = mongoose.model('Proveedor', proveedorSchema);

module.exports = Proveedor;