import { Model, DataTypes } from 'sequelize';
import sequelize from '../../libs/sequelize.js';

class Order extends Model {}

Order.init({
    id_pedido: {
        type: DataTypes.STRING(36),
        primaryKey: true
    },
    cod_pedido: {
        type: DataTypes.STRING(32),
        defaultValue: 'S/I',
        allowNull: false
    },
    id_cliente: {
        type: DataTypes.STRING(36),
        allowNull: false
    },
    cod_vendedor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_factura: {
        type: DataTypes.STRING(36),
        allowNull: false
    },
    fechaPedido: {
        type: DataTypes.DATEONLY
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: '0.00'
    },
    descuentosItemPedido: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: '0.00'
    },
    montoItemsPedido: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: '0.00'
    },
    ivaTotalPedido: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: '0.00'
    },
    TotalTotalPedido: {
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
        type: DataTypes.DECIMAL(10, 2)
    },
    formapago: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    cod_estatus: {
        type: DataTypes.INTEGER
    },
    fecha_pago: {
        type: DataTypes.DATEONLY
    },
    total_bultos: {
        type: DataTypes.DECIMAL(10, 2)
    },
    peso_total_item: {
        type: DataTypes.DECIMAL(10, 2)
    },
    total_m3: {
        type: DataTypes.DECIMAL(10, 2)
    },
    total_ft3: {
        type: DataTypes.DECIMAL(10, 2)
    },
    total_porcentaje_ganancia: {
        type: DataTypes.DECIMAL(10, 2)
    },
    total_monto_ganancia_total: {
        type: DataTypes.DECIMAL(10, 2)
    },
    validar_stock: {
        type: DataTypes.STRING(2)
    },
    fecha_creacion: {
        type: DataTypes.DATE
    },
    usuario_creacion: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    observacion: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    facturar_a: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    facturar_a_ruc: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    termino_pago_id: {
        type: DataTypes.INTEGER
    },
    facturar_a_direccion: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    facturar_a_telefono: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    facturar_a_pais: {
        type: DataTypes.STRING(50)
    },
    facturar_a_nombre: {
        type: DataTypes.STRING(50)
    },
    facturar_a_apellido: {
        type: DataTypes.STRING(50)
    },
    facturar_a_pasaporte: {
        type: DataTypes.STRING(64)
    },
    facturar_a_transporte: {
        type: DataTypes.STRING(64)
    },
    facturar_a_numero: {
        type: DataTypes.STRING(64)
    },
    facturar_a_fecha: {
        type: DataTypes.STRING(64)
    },
    facturar_a_hora: {
        type: DataTypes.STRING(64)
    },
    facturar_a_destino: {
        type: DataTypes.STRING(64)
    },
    facturar_a_email: {
        type: DataTypes.STRING(64)
    },
    id_shop: {
        type: DataTypes.INTEGER
    },
    nombre_shop: {
        type: DataTypes.STRING(64)
    },
    estatus_pedido: {
        type: DataTypes.INTEGER,
        defaultValue: '1'
    },
    facturar_a_tipo_transporte: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    serie_sucursal: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    id_sucursal: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tipo_pedido: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    id_caja_secuencia: {
        type: DataTypes.STRING(36),
        allowNull: false
    },
    caja_secuencia: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    id_caja: {
        type: DataTypes.STRING(36),
        allowNull: false
    },
    codigo_caja: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    fecha_limite: {
        type: DataTypes.TINYINT
    },
    fecha_vencimiento: {
        type: DataTypes.DATE
    },
    fecha_cierre: {
        type: DataTypes.DATE
    },
    plazo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    costo_envio: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false
    },
    facturar_caja: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    modelName: 'Order',
    tableName: 'pedido',
    timestamps: false
});

export default Order;