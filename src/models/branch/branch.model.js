import { DataTypes } from 'sequelize';
import sequelize from '../libs/sequelize.js';

const Branch = sequelize.define('Branch', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  codigo: {
    type: DataTypes.STRING(10),
    defaultValue: null
  },
  descripcion: {
    type: DataTypes.STRING(100),
    defaultValue: null
  }
}, {
  tableName: 'sucursal',
  timestamps: false
});

export default Branch;
