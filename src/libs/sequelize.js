import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); 

export const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: 3306,
    logging: false, // true si quieres ver los logs de las consultas SQL
  }
);

export default sequelize;
