// models/invoice.model.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Invoice extends Model {}

  Invoice.init({
    id_factura: {
      type: DataTypes.STRING(36),
      primaryKey: true
    },
    cod_factura: {
      type: DataTypes.STRING(32),
      defaultValue: 'S/I'
    },
    cod_factura_fiscal: {
      type: DataTypes.STRING(10)
    },
    nroz: {
      type: DataTypes.STRING(4)
    },
    impresora_serial: {
      type: DataTypes.STRING(50)
    },
    id_cliente: {
      type: DataTypes.STRING(36)
    },
    cod_vendedor: {
      type: DataTypes.INTEGER
    },
    fechaFactura: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: '0.00'
    },
    descuentosItemFactura: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: '0.00'
    },
    montoItemsFactura: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: '0.00'
    },
    ivaTotalFactura: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: '0.00'
    },
    TotalTotalFactura: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: '0.00'
    },
    cantidad_items: {
      type: DataTypes.INTEGER,
      defaultValue: '0'
    },
    totalizar_sub_total: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: '0.00'
    },
    totalizar_descuento_parcial: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: '0.00'
    },
    totalizar_total_operacion: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: '0.00'
    },
    totalizar_pdescuento_global: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: '0.00'
    },
    totalizar_descuento_global: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: '0.00'
    },
    totalizar_base_imponible: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: '0.00'
    },
    totalizar_monto_iva: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: '0.00'
    },
    totalizar_total_general: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: '0.00'
    },
    totalizar_total_retencion: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: '0.00'
    },
    formapago: {
      type: DataTypes.STRING(20)
    },
    cod_estatus: {
      type: DataTypes.INTEGER
    },
    fecha_pago: {
      type: DataTypes.DATEONLY
    },
    id_sucursal: {
      type: DataTypes.INTEGER
    },
    id_caja: {
      type: DataTypes.STRING(36)
    },
    codigo_caja: {
      type: DataTypes.STRING(50)
    },
    cod_cliente: {
      type: DataTypes.STRING(80)
    },
    costo_envio: {
      type: DataTypes.DECIMAL(20, 2)
    },
    promocion_tipo: {
      type: DataTypes.STRING(20)
    },
    promocion_id: {
      type: DataTypes.STRING(36)
    },
    promocion_codigo: {
      type: DataTypes.STRING(15)
    },
    promocion_nombre: {
      type: DataTypes.STRING(200)
    },
    promocion_grupo: {
      type: DataTypes.STRING(36)
    },
    descuento_global_venta: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: '0.00'
    },
    descuento_impuesto: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: '0.00'
    },
    total_impuesto_isc: {
      type: DataTypes.DECIMAL(10, 6)
    },
    total_impuesto_oti: {
      type: DataTypes.DECIMAL(10, 6)
    },
    total_seguro: {
      type: DataTypes.DECIMAL(10, 2)
    },
    total_acarreo: {
      type: DataTypes.DECIMAL(10, 6)
    },
    tipo_documento: {
      type: DataTypes.INTEGER
    },
    incoterms: {
      type: DataTypes.STRING(8)
    },
    moneda_exportacion: {
      type: DataTypes.STRING(8)
    },
    monto_tipo_cambio: {
      type: DataTypes.DECIMAL(10, 2)
    },
    monto_moneda_exportacion: {
      type: DataTypes.DECIMAL(10, 2)
    },
    puerto_embarque: {
      type: DataTypes.TEXT
    },
    // Agrega más campos según la necesidad de tu aplicación.
  }, {
    sequelize,
    modelName: 'Invoice',
    tableName: 'factura',
    timestamps: false
  });

  return Invoice;
};
