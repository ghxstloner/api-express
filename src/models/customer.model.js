import { DataTypes } from 'sequelize';
import sequelize from '../libs/sequelize.js';

const Customer = sequelize.define('Customer', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    field: 'id_cliente'
  },
  name: {
    type: DataTypes.STRING,
    field: 'nombre'
  },
  email: {
    type: DataTypes.STRING,
    field: 'email'
  },
  status: {
    type: DataTypes.STRING,
    field: 'estado'
  },
  phone: {
    type: DataTypes.STRING,
    field: 'telefonos'
  },
  address: {
    type: DataTypes.STRING,
    field: 'direccion'
  },
  city: {
    type: DataTypes.STRING,
    field: 'direccion_ciudad'
  },
  country: {
    type: DataTypes.INTEGER,
    field: 'pais'
  },
  ruc: {
    type: DataTypes.STRING,
    field: 'rif'
  },
  dv: {
    type: DataTypes.STRING,
    field: 'dv'
  },
  tipo_cliente: {
    type: DataTypes.STRING,
    field: 'cod_tipo_cliente'
  },
  tipo_contribuyente: {
    type: DataTypes.STRING,
    field: 'tipo_contribuyente'
  },
  corregimiento: {
    type: DataTypes.STRING,
    field: 'direccion_corregimiento'
  }
}, {
  tableName: 'clientes',
  timestamps: false,
});

export default Customer;