import express from 'express';
import apiRoutes from './routes/index.routes.js';
import sequelize from './libs/sequelize.js';

const app = express();

app.use(express.json());
app.use('/api/v1', apiRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida con éxito.');
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });
