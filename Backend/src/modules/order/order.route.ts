import { FastifyInstance } from "fastify";
import { createOrderHandler, getOrdersHandler } from "./order.controller";
import { $ref } from "./order.schema";

const orderRoutes = async (server: FastifyInstance) => {
    server.get('/all', {
        preHandler: [server.authenticate]
    }, getOrdersHandler);

    server.post('/create', {
        schema: {
            body: $ref("createOrderResponseSchemaTest"),
            // response: {
            //     200: $ref("createOrderSchema"),
            // }
        }
    }, createOrderHandler)
}

export default orderRoutes