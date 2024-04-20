import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import sequelize from './libs/sequelize.js';
import { corsOptions, notFound, errorHandler } from './middlewares/index.js';
import apiRoutes from './routes/index.routes.js';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors(corsOptions));

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

app.use(notFound);
app.use(errorHandler);
