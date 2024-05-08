import { QueryTypes } from "sequelize";
import { randomUUID } from "crypto";
import CustomersService from "./customer.service.js";
import sequelize from "../libs/sequelize.js";
import selectraConfPymeDb from "../libs/selectraConf.js";
import logger from "../libs/logger.js";

class OrderService {
  constructor() {}

  async create(data) {
    const t = await sequelize.transaction();

    try {
      const idPedido = randomUUID();
      const todayComplete = new Date();
      const today = todayComplete.toISOString().split("T")[0];
      const sequelizeConn = sequelize;
      const pad = (number) => (number < 10 ? `0${number}` : number);
      const formattedToday = `${todayComplete.getFullYear()}-${pad(
        todayComplete.getMonth() + 1
      )}-${pad(todayComplete.getDate())} ${pad(todayComplete.getHours())}:${pad(
        todayComplete.getMinutes()
      )}:${pad(todayComplete.getSeconds())}`;

      logger.info("Creando pedido con ID: " + idPedido);
      const customer = await CustomersService.findOne(data.id_cliente);
      /* const usuarioCreacion = await this.obtenerUsuarioCreacion(
        data.cod_vendedor,
        sequelizeConn,
        selectraConfPymeDb
      );
      */
      const facturarA = `${customer.dataValues.name}`;
      const facturarARuc = customer.dataValues.ruc;
      const facturarADireccion = customer.dataValues.address;
      const facturarATelefono = customer.dataValues.phone;
      const facturarAEmail = customer.dataValues.email;
      const facturarAPais = customer.dataValues.pais;
      const parametrosGenerales = await sequelizeConn.query(
        "SELECT sucursal_id FROM parametros_generales"
      );

      const paramGenSucursalId = parametrosGenerales[0][0].sucursal_id;

      const sucursalDats = await sequelizeConn.query(
        "SELECT codigo FROM sucursal WHERE id = :paramGenSucursalId",
        {
          replacements: { paramGenSucursalId: paramGenSucursalId },
          type: QueryTypes.SELECT,
        }
      );

      const sucursalCodParamGen = sucursalDats[0].codigo;

      const correlativoPedido = await sequelizeConn.query(
        "SELECT contador, formato FROM correlativos WHERE id=17"
      );
      const cod_pedido = correlativoPedido[0][0].contador;
      const formatoPedidoLength = correlativoPedido[0][0].formato.length;
      const codPedido = cod_pedido
        .toString()
        .padStart(formatoPedidoLength, "0");

      let totalGanancias = 0;
      let totalPorcentajeGanancia = 0;

      for (const detalle of data.detalle) {
        const datosItem = await this.obtenerDatosItem(
          detalle.id_item,
          sequelizeConn
        );
        const costo = parseFloat(datosItem.costo).toFixed(2);
        const precioSinIVA = parseFloat(detalle.precio_sin_iva).toFixed(2);
        const cantidad = parseInt(detalle.cantidad);

        if (isNaN(costo) || isNaN(precioSinIVA) || isNaN(cantidad)) {
          console.error("Error: uno de los valores no es un número.", {
            costo,
            precioSinIVA,
            cantidad,
          });
          continue;
        }

        const gananciaPorProducto = (precioSinIVA - costo) * cantidad;
        detalle.ganancia = gananciaPorProducto;
        totalGanancias += gananciaPorProducto;

        const porcentajeGananciaPorProducto =
          costo !== 0 ? (gananciaPorProducto / (costo * cantidad)) * 100 : 0;
        detalle.porcentajeGanancia = porcentajeGananciaPorProducto;

        totalPorcentajeGanancia += porcentajeGananciaPorProducto;
      }

      const record = await sequelizeConn.query(
        "INSERT INTO pedido (" +
          "id_pedido, " +
          "cod_pedido, " +
          "id_cliente, " +
          "cod_vendedor, " +
          "fechaPedido, " +
          "subtotal, " +
          "montoItemsPedido, " +
          "ivaTotalPedido, " +
          "TotalTotalPedido, " +
          "cantidad_items, " +
          "totalizar_sub_total, " +
          "totalizar_total_operacion, " +
          "totalizar_base_imponible, " +
          "totalizar_monto_iva, " +
          "totalizar_total_general, " +
          "cod_estatus, " +
          "validar_stock, " +
          "fecha_creacion, " +
          "fecha_vencimiento, " +
          "usuario_creacion, " +
          "estatus_pedido, " +
          "formapago, " +
          "metodo_pago, " +
          "id_caja, " +
          "serie_sucursal, " +
          "id_sucursal, " +
          "id_shop, " +
          "facturar_a, " +
          "facturar_a_ruc, " +
          "facturar_a_direccion, " +
          "facturar_a_telefono, " +
          "facturar_a_email, " +
          "facturar_a_pais, " +
          "total_porcentaje_ganancia, " +
          "total_monto_ganancia_total, " +
          "observacion, " +
          "termino_pago_id, " +
          "tipo_pedido" +
          ") VALUES (" +
          ":id, " +
          ":codPedido, " +
          ":idCliente, " +
          ":codVendedor, " +
          ":fechaPedido, " +
          ":subTotal, " +
          ":montoItemsPedido, " +
          ":ivaTotalPedido, " +
          ":TotalTotalPedido, " +
          ":cantidadItems, " +
          ":totalizarSubTotal, " +
          ":totalizarTotalOperacion, " +
          ":totalizarBaseImponible, " +
          ":totalizarMontoIva, " +
          ":totalizarTotalGeneral, " +
          ":codEstatus, " +
          ":validarStock, " +
          ":fechaCreacion, " +
          ":fechaVencimiento, " +
          ":usuarioCreacion, " +
          ":estatusPedido, " +
          ":formaPago, " +
          ":metodoPago, " +
          ":idCaja, " +
          ":serieSucursal, " +
          ":idSucursal, " +
          ":idShop, " +
          ":facturarA, " +
          ":facturarARuc, " +
          ":facturarADireccion, " +
          ":facturarATelefono, " +
          ":facturarAEmail, " +
          ":facturarAPais, " +
          ":totalPorcentajeGanancia, " +
          ":totalMontoGananciaTotal, " +
          ":observacion, " +
          ":terminoPagoId, " +
          ":tipoPedido" +
          ")",
        {
          replacements: {
            id: idPedido,
            codPedido: codPedido,
            idCliente: customer.dataValues.id,
            codVendedor: data.cod_vendedor,
            fechaPedido: data.fechaPedido,
            subTotal: data.subtotal,
            montoItemsPedido: data.subtotal,
            ivaTotalPedido: data.ivaTotalPedido,
            TotalTotalPedido: data.TotalTotalPedido,
            cantidadItems: data.detalle.length,
            totalizarSubTotal: data.subtotal,
            totalizarTotalOperacion: data.TotalTotalPedido,
            totalizarBaseImponible: data.subtotal,
            totalizarMontoIva: data.ivaTotalPedido,
            totalizarTotalGeneral: data.TotalTotalPedido,
            codEstatus: 1,
            validarStock: "SI",
            fechaCreacion: formattedToday,
            fechaVencimiento: data.fechaVencimiento,
            usuarioCreacion: "shopify",
            estatusPedido: 1,
            formaPago: "contado",
            metodoPago: data.metodo_pago,
            idCaja: "9c49d6c8-9528-11ea-93b8-5820b10bae4f",
            serieSucursal: "AE",
            idSucursal: 13,
            idShop: 1,
            facturarA: facturarA,
            facturarARuc: facturarARuc,
            facturarADireccion: facturarADireccion,
            facturarATelefono: facturarATelefono,
            facturarAEmail: facturarAEmail,
            facturarAPais: facturarAPais,
            totalPorcentajeGanancia: totalPorcentajeGanancia,
            totalMontoGananciaTotal: totalGanancias,
            observacion: data.observacion,
            terminoPagoId: 3,
            tipoPedido: "shop",
          },
          type: QueryTypes.INSERT,
        }
      );
    
      if (record) {
        logger.info("Pedido creado exitosamente con ID: " + idPedido);
      } else {
        logger.error("No se logró crear el pedido con ID: " + idPedido);
      }

      if (record) {
        await sequelizeConn.query(
          "UPDATE correlativos SET contador = contador+1  WHERE id=17"
        );
      }

      for (const detalle of data.detalle) {
        const idPedidoDet = randomUUID();
        const codItem = await this.obtenerCodItem(
          detalle.id_item,
          sequelizeConn
        );

        const totalSinIva =
          parseFloat(detalle.precio_sin_iva) * detalle.cantidad;
        const totalConIva = parseFloat(detalle.total_con_iva);

        const datosItem = await this.obtenerDatosItem(
          detalle.id_item,
          sequelizeConn
        );

        const record = await sequelizeConn.query(
          "INSERT INTO pedido_detalle (" +
            "id_detalle_pedido, " +
            "id_pedido, " +
            "id_item, " +
            "cod_item, " +
            "_item_almacen, " +
            "_item_descripcion, " +
            "_item_cantidad, " +
            "_item_preciosiniva, " +
            "_item_piva, " +
            "_item_totalsiniva, " +
            "_item_totalconiva, " +
            "_posee_serial, " +
            "seriales_seleccionados, " +
            "usuario_creacion, " +
            "fecha_creacion, " +
            "_item_cantidad_total, " +
            "_unidad_empaque, " +
            "_ganancia_item_individual, " +
            "_item_unidad_empaque, " +
            "_porcentaje_ganancia" +
            ") VALUES (" +
            ":idPedidoDet, " +
            ":idPedido, " +
            ":idItem, " +
            ":codItem, " +
            ":itemAlmacen, " +
            ":itemDescripcion, " +
            ":itemCantidad, " +
            ":itemPreciosiniva, " +
            ":itemItemPiva, " +
            ":itemTotalsiniva, " +
            ":itemTotalconiva, " +
            "'YES', " +
            "'N/A', " +
            ":usuarioCreacion, " +
            ":fechaCreacion, " +
            ":itemCantidadTotal, " +
            ":unidadEmpaque, " +
            ":gananciaItemIndividual, " +
            ":itemUnidadEmpaque, " +
            ":porcentajeGanancia" +
            ")",
          {
            replacements: {
              idPedidoDet: randomUUID(),
              idPedido: idPedido,
              idItem: detalle.id_item,
              codItem: codItem,
              itemAlmacen: 1,
              itemDescripcion: detalle.descripcion,
              itemCantidad: detalle.cantidad,
              itemPreciosiniva: detalle.precio_sin_iva,
              itemItemPiva: datosItem.iva,
              itemTotalsiniva: totalSinIva,
              itemTotalconiva: totalConIva,
              usuarioCreacion: "shopify",
              fechaCreacion: formattedToday,
              itemCantidadTotal: detalle.cantidad,
              unidadEmpaque: datosItem.unidad_empaque,
              gananciaItemIndividual: datosItem.ganancia,
              itemUnidadEmpaque: datosItem.unidad_o_empaque,
              porcentajeGanancia: datosItem.porcentaje_ganancia,
            },
            type: QueryTypes.INSERT,
          }
        );

        if (record) {
          logger.info(
            "Pedido DETALLE creado exitosamente con ID: " + idPedidoDet
          );
        } else {
          logger.error(
            "No se logró crear el Pedido DETALLE con ID: " + idPedidoDet
          );
        }

        await t.commit();
        logger.info("Transacción completada exitosamente.");
        return { success: true, message: "Pedido creado exitosamente" };
      }
        } catch (error) {
          await t.rollback(); 
          logger.error("Transacción fallida: ", error);
          return { success: false, message: error.message, id: idPedido };
      }
  }

  async getPedidos(bd, user) {
    const sequelizeConn = await sequelize(bd);
    let pedidos = await sequelizeConn.query(
      "SELECT p.id_pedido, p.cod_pedido, p.fechaPedido, p.cantidad_items, p.TotalTotalPedido, concat(c.nombre,' ',c.apellido) as nombre FROM pedido p JOIN clientes c ON p.id_cliente = c.id_cliente WHERE p.usuario_creacion = :usuario ORDER BY p.fechaPedido DESC",
      {
        replacements: { usuario: user },
        type: QueryTypes.SELECT,
      }
    );

    for (const pedido of pedidos) {
      const pedidoDetalle = await sequelizeConn.query(
        "SELECT _item_descripcion AS descripcion, _item_cantidad AS cantidad, _item_totalconiva AS totalConIva FROM pedido_detalle WHERE id_pedido = :idPedido",
        {
          replacements: { idPedido: pedido.id_pedido },
          type: QueryTypes.SELECT,
        }
      );
      pedido.items = pedidoDetalle;
    }

    return pedidos;
  }

  async obtenerDatosItem(idItem, sequelizeConn) {
    try {
      const itemData = await sequelizeConn.query(
        "SELECT cod_item, unidad_empaque, costo_actual AS costo, utilidad1 AS ganancia, (utilidad1 / costo_actual * 100) AS porcentaje_ganancia, unidad_o_empaque, iva FROM item WHERE id_item = :idItem",
        {
          replacements: { idItem },
          type: QueryTypes.SELECT,
        }
      );

      if (itemData.length === 0) {
        throw new Error(
          "No se encontró el ítem para el id_item proporcionado."
        );
      }

      return itemData[0];
    } catch (error) {
      console.error("Error al obtener datos del item: ", error.message);
      throw error;
    }
  }

  async obtenerUsuarioCreacion(codVendedor, sequelizeConn, selectraConfPymeDb) {
    try {
      const vendedorData = await sequelizeConn.query(
        "SELECT cod_usuarios FROM vendedor WHERE cod_vendedor = :codVendedor",
        {
          replacements: { codVendedor },
          type: QueryTypes.SELECT,
        }
      );

      const codUsuarios = vendedorData[0].cod_usuarios;

      const userData = await selectraConfPymeDb.query(
        "SELECT usuario FROM usuarios WHERE cod_usuario = :codUsuarios",
        {
          replacements: { codUsuarios },
          type: QueryTypes.SELECT,
        }
      );

      if (userData.length === 0) {
        throw new Error(
          "No se encontró el usuario correspondiente al vendedor."
        );
      }

      return userData[0].usuario;
    } catch (error) {
      console.error("Error al obtener el usuario de creación: ", error.message);
      throw error;
    }
  }

  async obtenerCodItem(idItem, sequelizeConn) {
    try {
      const itemData = await sequelizeConn.query(
        "SELECT cod_item FROM item WHERE id_item = :idItem",
        {
          replacements: { idItem },
          type: QueryTypes.SELECT,
        }
      );

      if (itemData.length === 0) {
        throw new Error(
          "No se encontró el código del item para el id_item proporcionado."
        );
      }

      return itemData[0].cod_item;
    } catch (error) {
      console.error("Error al obtener cod_item: ", error.message);
      throw error;
    }
  }
}

export default new OrderService();
