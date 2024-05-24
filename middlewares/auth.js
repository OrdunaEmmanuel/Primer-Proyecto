const jwt = require('jsonwebtoken');


const authMiddleware = async (req, res, next) => {
  const secretKey = process.env.SECRET_KEY;
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. No se proporcionó token.' });
  }

  try {
    let newToken = token.replace("Bearer ","")
    const decoded = jwt.verify(newToken, secretKey);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido.' });
  }
};

module.exports = authMiddleware;
   