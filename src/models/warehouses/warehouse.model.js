import { DataTypes } from 'sequelize';
import sequelize from '../../libs/sequelize.js'; 

const Warehouse = sequelize.define('Warehouse', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    field: 'cod_almacen'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'descripcion'
  }
}, {
  tableName: 'almacen',
  timestamps: false,
});

export default Warehouse;
