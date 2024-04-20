import { DataTypes } from 'sequelize';
import sequelize from '../libs/sequelize.js';

const Sequence = sequelize.define('Sequence', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  contador: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  formato: {
    type: DataTypes.STRING(32),
    allowNull: false
  }
}, {
  tableName: 'correlativos',
  timestamps: false
});

export default Sequence;
