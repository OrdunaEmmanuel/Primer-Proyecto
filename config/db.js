const mongoose = require('mongoose');
const DB_URI = 'mongodb+srv://emmanueloac:T8X7A0aHe03UAxGq@proyecto1.vktsje8.mongodb.net/';

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('Conexion Exitosa!!');
  } catch (err) {
    console.log('Error al Conectar a la Base de Datos!!', err);
    process.exit(1); // Detener la aplicación si no se puede conectar a la base de datos
  }
};

module.exports = connectDB;
