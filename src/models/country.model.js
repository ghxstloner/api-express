import { DataTypes } from 'sequelize';
import sequelize from '../libs/sequelize.js';
import Customer from './customer.model.js';

const Country = sequelize.define('Country', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    field: 'nombre'
  }
}, {
  tableName: 'paises',
  timestamps: false
});

export default Country;

// Relación
Customer.belongsTo(Country, {foreignKey: 'pais', as: 'countryInfo'});
Country.hasMany(Customer, {foreignKey: 'pais'});
