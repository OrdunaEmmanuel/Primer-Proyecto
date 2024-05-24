const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const productoController = require('./controllers/productos');
const proveedorController = require('./controllers/provedor');
const vendedorController = require('./controllers/vendedores');
const compradorController = require('./controllers/comprador');
const transaccionController = require('./controllers/transaccion');
const authController = require('./controllers/usuarios');
const authMiddleware = require('./middlewares/auth'); 

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

router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/productos', authMiddleware, productoController.crearProducto);
router.get('/productos', authMiddleware, productoController.obtenerProductos);
router.get('/productos/:id', authMiddleware, productoController.obtenerProductoPorId);
router.put('/productos/:id', authMiddleware, productoController.actualizarProducto);
router.delete('/productos/:id', authMiddleware, productoController.eliminarProducto);

router.post('/proveedores', authMiddleware, proveedorController.crearProveedor);
router.get('/proveedores', authMiddleware, proveedorController.obtenerProveedores);
router.get('/proveedores/:id', authMiddleware, proveedorController.obtenerProveedorPorId);
router.put('/proveedores/:id', authMiddleware, proveedorController.actualizarProveedor);
router.delete('/proveedores/:id', authMiddleware, proveedorController.eliminarProveedor);

router.post('/vendedores', authMiddleware, vendedorController.crearVendedor);
router.get('/vendedores', authMiddleware, vendedorController.obtenerVendedores);
router.get('/vendedores/:id', authMiddleware, vendedorController.obtenerVendedorPorId);
router.put('/vendedores/:id', authMiddleware, vendedorController.actualizarVendedor);
router.delete('/vendedores/:id', authMiddleware, vendedorController.eliminarVendedor);

router.post('/compradores', authMiddleware, compradorController.crearComprador);
router.get('/compradores', authMiddleware, compradorController.obtenerCompradores);
router.get('/compradores/:id', authMiddleware, compradorController.obtenerCompradorPorId);
router.put('/compradores/:id', authMiddleware, compradorController.actualizarComprador);
router.delete('/compradores/:id', authMiddleware, compradorController.eliminarComprador);

router.post('/transacciones', authMiddleware, transaccionController.crearTransaccion);
router.get('/transacciones', authMiddleware, transaccionController.obtenerTransacciones);
router.get('/transacciones/:id', authMiddleware, transaccionController.obtenerTransaccionPorId);
router.put('/transacciones/:id', authMiddleware, transaccionController.actualizarTransaccion);
router.delete('/transacciones/:id', authMiddleware, transaccionController.eliminarTransaccion);

module.exports = router;
