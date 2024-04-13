import { DataTypes } from 'sequelize';
import { sequelize } from '../../db.js';

const Product = sequelize.define('Product', {
  id_item: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cod_item: {
    type: DataTypes.STRING,
  },
  familia1: {
    type: DataTypes.STRING,
  },
  familia2: {
    type: DataTypes.STRING,
  },
  descripcion1: {
    type: DataTypes.STRING,
  },
  descripcion2: {
    type: DataTypes.STRING,
  },
  codigo_fabricante: {
    type: DataTypes.STRING,
  },
  tipo_item: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'item',
  timestamps: false, 
});

export default Product;
