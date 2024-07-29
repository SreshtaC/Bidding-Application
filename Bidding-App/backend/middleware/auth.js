const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

const authenticate = async (req, res, next) => {
  const token1 = req.header('Authorization');
  const token = token1.replace("Bearer ", "");
  console.log(token);
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).send('Invalid token.');
  }
};

const generateAuthToken = async (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    secretKey,
    { expiresIn: '1h' }
  );
  return token;
};

module.exports = { authenticate, generateAuthToken };