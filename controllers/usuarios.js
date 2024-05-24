const jwt = require('jsonwebtoken');
const User = require('../models/Usuario');
const bcrypt = require('bcryptjs'); 
const secretKey = process.env.SECRET_KEY; 

const authController = {};

// Registrar un nuevo usuario
authController.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'Usuario Registrado' });
    console.log('Usuario registrado exitosamente');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar Usuario' });
  }
};

authController.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Usuario ha iniciado sesión correctamente', token });
    console.log({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

module.exports = authController;

