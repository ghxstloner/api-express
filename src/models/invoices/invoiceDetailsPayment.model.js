import { DataTypes } from 'sequelize';
import sequelize from '../libs/sequelize.js';

const InvoiceDetailPayment = sequelize.define('InvoiceDetailPayment', {
    cod_factura_detalle_formapago: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        field: 'cod_factura_detalle_formapago'
    },
    id_factura: {
        type: DataTypes.UUID,
        field: 'id_factura'
    },
    totalizar_monto_cancelar: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'totalizar_monto_cancelar'
    },
    totalizar_monto_efectivo: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'totalizar_monto_efectivo'
    },
    totalizar_monto_tarjeta: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'totalizar_monto_tarjeta'
    },
    totalizar_monto_deposito: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'totalizar_monto_deposito'
    },
    totalizar_monto_otrodocumento: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'totalizar_monto_otrodocumento'
    },
    totalizar_monto_credito: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'totalizar_monto_credito'
    },
    totalizar_monto_debito: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'totalizar_monto_debito'
    },
    totalizar_monto_transferencia: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'totalizar_monto_transferencia'
    },
    totalizar_monto_certificado: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'totalizar_monto_certificado'
    },
    totalizar_monto_otros: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'totalizar_monto_otros'
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
    tableName: 'factura_detalle_formapago',
    timestamps: false
});

export default InvoiceDetailPayment;
