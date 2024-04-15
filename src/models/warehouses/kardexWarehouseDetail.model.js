import { DataTypes } from 'sequelize';
import sequelize from '../libs/sequelize.js';

const KardexWarehouseDetail = sequelize.define('KardexWarehouseDetail', {
    id_transaccion_detalle: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        field: 'id_transaccion_detalle'
    },
    id_transaccion: {
        type: DataTypes.UUID,
        field: 'id_transaccion'
    },
    id_almacen_entrada: {
        type: DataTypes.INTEGER,
        field: 'id_almacen_entrada'
    },
    id_almacen_salida: {
        type: DataTypes.INTEGER,
        field: 'id_almacen_salida'
    },
    id_item: {
        type: DataTypes.STRING,
        field: 'id_item'
    },
    cantidad: {
        type: DataTypes.INTEGER,
        field: 'cantidad'
    }
}, {
    tableName: 'kardex_almacen_detalle',
    timestamps: false
});

export default KardexWarehouseDetail;
