import { FastifyInstance } from "fastify";
import { createOrderHandler } from "./order.controller";
import { $ref } from "./order.schema";

const orderRoutes = async (server: FastifyInstance) => {
    // server.get('/', {
    //     preHandler: [server.authenticate]
    // }, getOrdersHandler);

    server.post('/create', {
        schema: {
            // body: $ref("createOrderSchema"),
            // response: {
            //     200: $ref("createOrderSchema"),
            // }
        }
    }, createOrderHandler)
}

export default orderRoutes