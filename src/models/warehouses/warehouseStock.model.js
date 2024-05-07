import { Model, DataTypes } from 'sequelize';
import Warehouse from './warehouse.model.js';
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
    type: DataTypes.INTEGER,
    defaultValue: '0',
    field: 'cantidad'
  },
}, {
  sequelize,
  modelName: 'WarehouseStock',
  tableName: 'item_existencia_almacen',
  timestamps: false
});

WarehouseStock.belongsTo(Warehouse, { foreignKey: 'codAlmacen', as: 'Warehouse' });
Warehouse.hasMany(WarehouseStock, { foreignKey: 'codAlmacen', as: 'WarehouseStocks' });

export default WarehouseStock;
