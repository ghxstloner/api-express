import { Model, DataTypes } from 'sequelize';
import sequelize from '../../libs/sequelize.js';

class Product extends Model {}

Product.init({
  idItem: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_item'
  },
  codItem: {
    type: DataTypes.STRING(20),
    field: 'referencia'
  },
  description: {
    type: DataTypes.STRING(150),
    field: 'descripcion1'
  },
  costActual: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'costo_actual'
  },
  costAverage: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'costo_promedio'
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'precio1'
  },
  bulkQuantity: {
    type: DataTypes.DECIMAL(9, 2),
    field: 'cantidad_bulto'
  },
  bulkWeight: {
    type: DataTypes.DECIMAL(9, 2),
    field: 'kilos_bulto'
  },
  iva: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'iva'
  },
  packUnit: {
    type: DataTypes.STRING(40),
    field: 'unidad_empaque'
  },
  barcode: {
    type: DataTypes.STRING(50),
    field: 'codigo_barras'
  },
}, {
  sequelize,
  modelName: 'Product',
  tableName: 'item',
  timestamps: false
});

export default Product;
