import { Sequelize, DataTypes, QueryTypes } from 'sequelize';
import sequelize from '../libs/sequelize.js';
import crypto from 'crypto';
import boom from '@hapi/boom';
import Customer from '../models/customer.model.js';

class CustomersService {
    constructor() {}

    async create(data) {
        const idCliente = crypto.randomUUID();
        const correlativoCliente = await sequelize.query(
            "SELECT contador, formato FROM correlativos WHERE id=8",
            { type: QueryTypes.SELECT }
        );
        const cod_cliente = correlativoCliente[0][0].contador;
        const formatoLength = correlativoCliente[0][0].formato.length;
        const codCliente = cod_cliente.toString().padStart(formatoLength, "0");

        // Preparing data for insertion
        const newData = {
            id: idCliente,
            name: data.name,
            email: data.email,
            status: data.status,
            phone: data.phone,
            address: data.address,
            city: data.city,
            country: data.country,
            ruc: data.ruc,
            dv: data.dv,
            tipo_cliente: data.tipo_cliente,
            tipo_contribuyente: data.tipo_contribuyente,
            provincia: data.provincia,
            distrito: data.distrito,
            corregimiento: data.corregimiento
        };

        const record = await sequelize.models.Customer.create(newData);

        if (record) {
            await sequelize.query(
                "UPDATE correlativos SET contador = contador+1 WHERE id=8",
                { type: QueryTypes.UPDATE }
            );
        }
        return record;
    }

    async find() {
        const customers = await sequelize.models.Customer.findAll();
        customers.forEach(customer => {
            customer.dataValues.apenom = `${customer.name}`;
        });
        return customers;
    }

    async findOne(cod_cliente) {
        const customer = await sequelize.models.Customer.findOne({
            where: { cod_cliente }
        });
        if (!customer) {
            throw boom.notFound("Customer not found");
        }
        return customer;
    }
    

    async update(id, changes) {
        const customer = await this.findOne(id);
        const updatedCustomer = await customer.update(changes);
        return updatedCustomer;
    }

    async delete(id) {
        const customer = await this.findOne(id);
        await customer.destroy();
        return { id };
    }
}

export default CustomersService;
