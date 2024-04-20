// Configuración de CORS
const whitelist = ['http://localhost:8080', 'http://localhost:3000', 'https://myapp.co'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

export default corsOptions;