import { DataTypes } from 'sequelize';
import sequelize from '../libs/sequelize.js';

const Invoice = sequelize.define('Invoice', {
    id_factura: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        field: 'id_factura'
    },
    cod_factura: {
        type: DataTypes.STRING,
        field: 'cod_factura'
    },
    id_cliente: {
        type: DataTypes.STRING,
        field: 'id_cliente'
    },
    cod_vendedor: {
        type: DataTypes.STRING,
        field: 'cod_vendedor'
    },
    fechaFactura: {
        type: DataTypes.DATEONLY,
        field: 'fechaFactura'
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'subtotal'
    },
    montoItemsFactura: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'montoItemsFactura'
    },
    ivaTotalFactura: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'ivaTotalFactura'
    },
    TotalTotalFactura: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'TotalTotalFactura'
    },
    cantidad_items: {
        type: DataTypes.INTEGER,
        field: 'cantidad_items'
    },
    totalizar_sub_total: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'totalizar_sub_total'
    },
    totalizar_base_imponible: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'totalizar_base_imponible'
    },
    totalizar_monto_iva: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'totalizar_monto_iva'
    },
    totalizar_total_general: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'totalizar_total_general'
    },
    totalizar_total_operacion: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'totalizar_total_operacion'
    },
    formapago: {
        type: DataTypes.STRING,
        field: 'formapago'
    },
    cod_estatus: {
        type: DataTypes.INTEGER,
        field: 'cod_estatus'
    },
    validar_stock: {
        type: DataTypes.STRING,
        field: 'validar_stock'
    },
    fecha_creacion: {
        type: DataTypes.DATEONLY,
        field: 'fecha_creacion'
    },
    usuario_creacion: {
        type: DataTypes.STRING,
        field: 'usuario_creacion'
    },
    tipo_factura: {
        type: DataTypes.STRING,
        field: 'tipo_factura'
    },
    id_shop: {
        type: DataTypes.INTEGER,
        field: 'id_shop'
    },
    serie_sucursal: {
        type: DataTypes.STRING,
        field: 'serie_sucursal'
    },
    multi_moneda: {
        type: DataTypes.STRING,
        field: 'multi_moneda'
    },
    tasa: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'tasa'
    },
    moneda_base: {
        type: DataTypes.INTEGER,
        field: 'moneda_base'
    },
    moneda_secundaria: {
        type: DataTypes.INTEGER,
        field: 'moneda_secundaria'
    },
    total_ref: {
        type: DataTypes.DECIMAL(10, 2),
        field: 'total_ref'
    },
    id_sucursal: {
        type: DataTypes.INTEGER,
        field: 'id_sucursal'
    },
    facturar_a: {
        type: DataTypes.STRING,
        field: 'facturar_a'
    },
    facturar_a_ruc: {
        type: DataTypes.STRING,
        field: 'facturar_a_ruc'
    },
    facturar_a_direccion: {
        type: DataTypes.STRING,
        field: 'facturar_a_direccion'
    },
    facturar_a_telefono: {
        type: DataTypes.STRING,
        field: 'facturar_a_telefono'
    },
    facturar_a_pais: {
        type: DataTypes.STRING,
        field: 'facturar_a_pais'
    },
    servicio_anio: {
        type: DataTypes.INTEGER,
        field: 'servicio_anio'
    },
    servicio_mes: {
        type: DataTypes.INTEGER,
        field: 'servicio_mes'
    },
    fecha_vencimiento: {
        type: DataTypes.DATEONLY,
        field: 'fecha_vencimiento'
    },
    termino_pago_id: {
        type: DataTypes.INTEGER,
        field: 'termino_pago_id'
    },
    tipo_documento: {
        type: DataTypes.INTEGER,
        field: 'tipo_documento'
    },
    modelo_factura: {
        type: DataTypes.STRING,
        field: 'modelo_factura'
    }
}, {
    tableName: 'factura',
    timestamps: false
});

export default Invoice;
