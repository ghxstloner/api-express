import { DataTypes } from 'sequelize';
import sequelize from '../libs/sequelize.js';

const CashRegisterDetail = sequelize.define('CashRegisterDetail', {
    caja_detalle_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        field: 'caja_detalle_id'
    },
    caja_id: {
        type: DataTypes.UUID,
        field: 'caja_id'
    },
    id_forma_pago: {
        type: DataTypes.INTEGER,
        field: 'id_forma_pago'
    },
    id_transaccion: {
        type: DataTypes.UUID,
        field: 'id_transaccion'
    },
    caja_recibo_id: {
        type: DataTypes.UUID,
        field: 'caja_recibo_id'
    },
    monto: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'monto'
    },
    usuario_creacion: {
        type: DataTypes.STRING,
        field: 'usuario_creacion'
    },
    fecha_creacion: {
        type: DataTypes.DATEONLY,
        field: 'fecha_creacion'
    }
}, {
    tableName: 'caja_nueva_detalle',
    timestamps: false
});

export default CashRegisterDetail;
