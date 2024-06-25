import { Model, DataTypes } from 'sequelize';
import sequelize from '../../libs/sequelize.js';
import WarehouseStock from '../warehouses/warehouseStock.model.js';

class Product extends Model {}

Product.init({
  idItem: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id_item'
  },
  sku: {  
    type: DataTypes.STRING(50), 
    field: 'referencia'
  },
  description: {
    type: DataTypes.STRING(150),
    field: 'descripcion1'
  },
  cost: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'costo_actual'
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'precio1'
  },
  coniva1: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'coniva1'
  },
  descuento1: {
    type: DataTypes.DECIMAL(10, 2),
    field: 'descuento1'
  },
  monto_exento: {
    type: DataTypes.INTEGER, // Asegúrate de que sea INTEGER o DECIMAL
    field: 'monto_exento'
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
  }
}, {
  sequelize,
  modelName: 'Product',
  tableName: 'item',
  timestamps: false,
  hooks: {
    afterUpdate: async (product, options) => {
      const stockData = await WarehouseStock.findAll({
        where: { idItem: product.idItem },
        attributes: ['codAlmacen', 'cantidad']
      });

      const productData = {
        id: product.idItem,
        code: product.sku,
        price: product.price,
        description: product.description,
        stock: stockData.map(stock => ({
          codAlmacen: stock.codAlmacen,
          cantidad: stock.cantidad
        }))
      };

    }
  }
});

Product.hasMany(WarehouseStock, { foreignKey: 'idItem', as: 'WarehouseStocks'});
WarehouseStock.belongsTo(Product, { foreignKey: 'idItem', as: 'Product' });

export default Product;
