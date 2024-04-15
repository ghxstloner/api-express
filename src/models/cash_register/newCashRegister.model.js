import { DataTypes } from 'sequelize';
import sequelize from '../libs/sequelize.js';

const NewCashRegister = sequelize.define('NewCashRegister', {
    caja_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        field: 'caja_id'
    },
    id_transaccion: {
        type: DataTypes.UUID,
        field: 'id_transaccion'
    },
    fecha: {
        type: DataTypes.DATEONLY,
        field: 'fecha'
    },
    ing_eg: {
        type: DataTypes.STRING,
        field: 'ing_eg'
    },
    monto: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'monto'
    },
    comprobante: {
        type: DataTypes.STRING,
        field: 'comprobante'
    },
    comprobante_numero: {
        type: DataTypes.STRING,
        field: 'comprobante_numero'
    },
    id_factura: {
        type: DataTypes.UUID,
        field: 'id_factura'
    },
    id_cliente: {
        type: DataTypes.STRING,
        field: 'id_cliente'
    },
    concepto: {
        type: DataTypes.TEXT,
        field: 'concepto'
    },
    status: {
        type: DataTypes.STRING,
        field: 'status'
    },
    sucursal_id: {
        type: DataTypes.INTEGER,
        field: 'sucursal_id'
    },
    usuario_creacion: {
        type: DataTypes.STRING,
        field: 'usuario_creacion'
    },
    fecha_creacion: {
        type: DataTypes.DATEONLY,
        field: 'fecha_creacion'
    },
    serie_sucursal: {
        type: DataTypes.STRING,
        field: 'serie_sucursal'
    },
    id_caja_secuencia: {
        type: DataTypes.STRING,
        field: 'id_caja_secuencia'
    }
}, {
    tableName: 'caja_nueva',
    timestamps: false
});

export default NewCashRegister;
