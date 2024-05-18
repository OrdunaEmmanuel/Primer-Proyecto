const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const productoController = require('./controllers/productos');
const proveedorController = require('./controllers/provedor');
const vendedorController = require('./controllers/vendedores');
const compradorController = require('./controllers/comprador');
const transaccionController = require('./controllers/transaccion');

router.use((req, res, next) => {
  if (!req.headers['content-type'] || req.headers['content-type'] !== 'application/json') {
    return res.status(400).json({ error: 'El encabezado Content-Type debe estar configurado como application/json' });
  }
  next();
});


router.use(bodyParser.json());


router.get('/', (req, res) => {
  res.send('¡Hola! Este es el servidor en localhost.');
});

router.post('/productos', productoController.crearProducto);
router.get('/productos', productoController.obtenerProductos);
router.get('/productos/:id', productoController.obtenerProductoPorId);
router.put('/productos/:id', productoController.actualizarProducto);
router.delete('/productos/:id', productoController.eliminarProducto);

router.post('/proveedores', proveedorController.crearProveedor);
router.get('/proveedores', proveedorController.obtenerProveedores);
router.get('/proveedores/:id', proveedorController.obtenerProveedorPorId);
router.put('/proveedores/:id', proveedorController.actualizarProveedor);
router.delete('/proveedores/:id', proveedorController.eliminarProveedor);

router.post('/vendedores', vendedorController.crearVendedor);
router.get('/vendedores', vendedorController.obtenerVendedores);
router.get('/vendedores/:id', vendedorController.obtenerVendedorPorId);
router.put('/vendedores/:id', vendedorController.actualizarVendedor);
router.delete('/vendedores/:id', vendedorController.eliminarVendedor);

router.post('/compradores', compradorController.crearComprador);
router.get('/compradores', compradorController.obtenerCompradores);
router.get('/compradores/:id', compradorController.obtenerCompradorPorId);
router.put('/compradores/:id', compradorController.actualizarComprador);
router.delete('/compradores/:id', compradorController.eliminarComprador);

router.post('/transacciones', transaccionController.crearTransaccion);
router.get('/transacciones', transaccionController.obtenerTransacciones);
router.get('/transacciones/:id', transaccionController.obtenerTransaccionPorId);
router.put('/transacciones/:id', transaccionController.actualizarTransaccion);
router.delete('/transacciones/:id', transaccionController.eliminarTransaccion);


module.exports = router;
