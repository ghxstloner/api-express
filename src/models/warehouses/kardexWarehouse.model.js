import { DataTypes } from 'sequelize';
import sequelize from '../libs/sequelize.js';

const KardexWarehouse = sequelize.define('KardexWarehouse', {
    id_transaccion: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        field: 'id_transaccion'
    },
    tipo_movimiento_almacen: {
        type: DataTypes.INTEGER,
        field: 'tipo_movimiento_almacen'
    },
    autorizado_por: {
        type: DataTypes.STRING,
        field: 'autorizado_por'
    },
    observacion: {
        type: DataTypes.TEXT,
        field: 'observacion'
    },
    fecha: {
        type: DataTypes.DATE,
        field: 'fecha'
    },
    usuario_creacion: {
        type: DataTypes.STRING,
        field: 'usuario_creacion'
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        field: 'fecha_creacion'
    },
    id_documento: {
        type: DataTypes.UUID,
        field: 'id_documento'
    },
    comprobante: {
        type: DataTypes.STRING,
        field: 'comprobante'
    }
}, {
    tableName: 'kardex_almacen',
    timestamps: false
});

export default KardexWarehouse;
