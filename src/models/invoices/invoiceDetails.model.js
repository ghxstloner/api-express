import { DataTypes } from 'sequelize';
import sequelize from '../libs/sequelize.js';

const InvoiceDetail = sequelize.define('InvoiceDetail', {
    id_detalle_factura: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        field: 'id_detalle_factura'
    },
    id_factura: {
        type: DataTypes.UUID,
        field: 'id_factura'
    },
    id_item: {
        type: DataTypes.STRING,
        field: 'id_item'
    },
    _item_almacen: {
        type: DataTypes.INTEGER,
        field: '_item_almacen'
    },
    _item_descripcion: {
        type: DataTypes.STRING,
        field: '_item_descripcion'
    },
    _item_cantidad: {
        type: DataTypes.INTEGER,
        field: '_item_cantidad'
    },
    _item_preciosiniva: {
        type: DataTypes.DECIMAL(10, 2),
        field: '_item_preciosiniva'
    },
    _item_piva: {
        type: DataTypes.FLOAT,
        field: '_item_piva'
    },
    _item_totalsiniva: {
        type: DataTypes.DECIMAL(10, 2),
        field: '_item_totalsiniva'
    },
    _item_totalconiva: {
        type: DataTypes.DECIMAL(10, 2),
        field: '_item_totalconiva'
    },
    usuario_creacion: {
        type: DataTypes.STRING,
        field: 'usuario_creacion'
    },
    fecha_creacion: {
        type: DataTypes.DATEONLY,
        field: 'fecha_creacion'
    },
    _cantidad_bulto: {
        type: DataTypes.INTEGER,
        field: '_cantidad_bulto'
    },
    _cantidad_bulto_kilos: {
        type: DataTypes.FLOAT,
        field: '_cantidad_bulto_kilos'
    },
    _unidad_empaque: {
        type: DataTypes.STRING,
        field: '_unidad_empaque'
    },
    _ganancia_item_individual: {
        type: DataTypes.DECIMAL(10, 2),
        field: '_ganancia_item_individual'
    },
    _porcentaje_ganancia: {
        type: DataTypes.FLOAT,
        field: '_porcentaje_ganancia'
    },
    _item_cantidad_total: {
        type: DataTypes.INTEGER,
        field: '_item_cantidad_total'
    }
}, {
    tableName: 'factura_detalle',
    timestamps: false
});

export default InvoiceDetail;
