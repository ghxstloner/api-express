import Warehouse from '../models/warehouses/warehouse.model.js';
import sequelize from '../libs/sequelize.js';

export const getWarehouses = async (req, res) => {
  try {
    const codigosAlmacen = await sequelize.query(
      "SELECT cod_almacen FROM exchanger_parametros_producto",
      { type: sequelize.QueryTypes.SELECT }
    );

    const codigos = codigosAlmacen[0].cod_almacen.split(',');

    const warehouses = await Warehouse.findAll({
      where: {
        id: codigos
      }
    });

    res.json(warehouses);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los almacenes", error: error.message });
  }
};
export const createWarehouse = async (req, res) => {
  try {
    const { cod_almacen, descripcion } = req.body;
    const warehouse = await Warehouse.create({ cod_almacen, descripcion });
    res.status(201).json(warehouse);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el almacén", error: error.message });
  }
};

export const updateWarehouse = async (req, res) => {
  const { cod_almacen } = req.params;
  const { descripcion } = req.body;

  try {
    const warehouse = await Warehouse.findByPk(cod_almacen);
    if (!warehouse) {
      return res.status(404).json({ message: "Almacén no encontrado" });
    }

    warehouse.descripcion = descripcion;
    await warehouse.save();
    res.json(warehouse);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el almacén", error: error.message });
  }
};

export const deleteWarehouse = async (req, res) => {
  const { cod_almacen } = req.params;

  try {
    const warehouse = await Warehouse.findByPk(cod_almacen);
    if (!warehouse) {
      return res.status(404).json({ message: "Almacén no encontrado" });
    }

    await warehouse.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el almacén", error: error.message });
  }
};

const wareHouseController = {
    getWarehouses,
    // createWarehouse,
    // updateWarehouse,
    // deleteWarehouse
};

export default wareHouseController;