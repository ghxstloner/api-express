import { DataTypes } from 'sequelize';
import sequelize from '../libs/sequelize.js';

const CashRegisterReceipt = sequelize.define('CashRegisterReceipt', {
    caja_recibo_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        field: 'caja_recibo_id'
    },
    tipo_recibo: {
        type: DataTypes.STRING,
        field: 'tipo_recibo'
    },
    nro_recibo: {
        type: DataTypes.STRING,
        field: 'nro_recibo'
    },
    fecha: {
        type: DataTypes.DATEONLY,
        field: 'fecha'
    },
    monto: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'monto'
    },
    observacion: {
        type: DataTypes.TEXT,
        field: 'observacion'
    },
    cod_vendedor: {
        type: DataTypes.STRING,
        field: 'cod_vendedor'
    },
    id_cliente: {
        type: DataTypes.STRING,
        field: 'id_cliente'
    },
    usuario_creacion: {
        type: DataTypes.STRING,
        field: 'usuario_creacion'
    },
    fecha_creacion: {
        type: DataTypes.DATEONLY,
        field: 'fecha_creacion'
    },
    status: {
        type: DataTypes.STRING,
        field: 'status'
    },
    id_factura: {
        type: DataTypes.UUID,
        field: 'id_factura'
    }
}, {
    tableName: 'caja_nueva_recibo',
    timestamps: false
});

export default CashRegisterReceipt;
