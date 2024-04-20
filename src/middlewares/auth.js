import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log('No token provided');
    return res.sendStatus(401);
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.log('JWT_SECRET is not defined in .env');
      return res.sendStatus(500);
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        console.log('Token verification failed:', err.message);
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.error('Error during token verification:', error);
    res.sendStatus(500);
  }
};

export default authenticateToken;
