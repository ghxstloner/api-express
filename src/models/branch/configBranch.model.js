import { DataTypes } from 'sequelize';
import sequelize from '../../libs/sequelize.js';

const GeneralConfig = sequelize.define('GeneralConfig', {
  sucursal_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
}, {
  tableName: 'parametros_generales',
  timestamps: false
});

export default GeneralConfig;

