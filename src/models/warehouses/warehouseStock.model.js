// models/warehouseStock.model.js
import { Model, DataTypes } from 'sequelize';
import sequelize from '../../libs/sequelize.js';

class WarehouseStock extends Model {}

WarehouseStock.init({
  codItemExistenciaAlmacen: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'cod_item_existencia_almacen'
  },
  codAlmacen: {
    type: DataTypes.INTEGER,
    field: 'cod_almacen'
  },
  idItem: {
    type: DataTypes.INTEGER,
    field: 'id_item'
  },
  cantidad: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: '0.00',
    field: 'cantidad'
  },
}, {
  sequelize,
  modelName: 'WarehouseStock',
  tableName: 'item_existencia_almacen',
  timestamps: false
});

export default WarehouseStock;
