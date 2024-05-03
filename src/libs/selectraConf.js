import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); 

export const selectraConfPymeDb = new Sequelize(
  'selectra_conf_pyme',
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: 3306,
    logging: false, 
  }
);

export default selectraConfPymeDb;


