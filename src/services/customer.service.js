import { QueryTypes } from "sequelize";
import sequelize from '../libs/sequelize.js';
import Customer from '../models/customer.model.js';
import boom from '@hapi/boom';
import { randomUUID } from 'crypto';

class CustomersService {
    constructor() {}

    async create(data) {
        const idCliente = randomUUID();
        const correlativoCliente = await sequelize.query(
            "SELECT contador, formato FROM correlativos WHERE id=8",
            { type: QueryTypes.SELECT }
        );
        const cod_cliente = correlativoCliente[0][0].contador;
        const formatoLength = correlativoCliente[0][0].formato.length;
        const codCliente = cod_cliente.toString().padStart(formatoLength, '0');

        const newData = {
            id_cliente: idCliente,
            cod_cliente: codCliente,
            nombre: data.name,
            email: data.email,
            telefonos: data.phone,
            direccion: data.address,
            ciudad: data.city,
            pais: data.country,
            rif: data.ruc,
            dv: data.dv,
            tipo_cliente: data.tipo_cliente,
            tipo_contribuyente: data.tipo_contribuyente,
            provincia: data.provincia,
            distrito: data.distrito,
            corregimiento: data.corregimiento
        };

        const record = await Customer.create(newData);

        if (record) {
            await sequelize.query(
                "UPDATE correlativos SET contador = contador + 1 WHERE id=8",
                { type: QueryTypes.UPDATE }
            );
        }
        return record;
    }

    async find() {
        const customers = await Customer.findAll();
        return customers.map(customer => ({
            ...customer.dataValues,
            apenom: `${customer.nombre}`
        }));
    }

    async findOne(id_cliente) {
        const customer = await Customer.findOne({
            where: { id_cliente }
        });
        if (!customer) {
            throw boom.notFound("Customer not found");
        }
        return customer;
    }

    async update(cod_cliente, changes) {
        const customer = await this.findOne(cod_cliente);
        const updatedCustomer = await customer.update(changes);
        return updatedCustomer;
    }

    async delete(cod_cliente) {
        const customer = await this.findOne(cod_cliente);
        await customer.destroy();
        return { cod_cliente };
    }
}

export default new CustomersService();
