import { FastifyInstance } from "fastify";
import { createOrderHandler, getOrdersHandler } from "./order.controller";
import { $ref } from "./order.schema";

// Function which has all order routes
const orderRoutes = async (server: FastifyInstance) => {
    server.get<{ Params: {userId: string}}>('/all/:userId', {
        preHandler: [server.authenticate]
    }, getOrdersHandler);

    server.post('/create', {
        schema: {
            body: $ref("createOrderResponseSchemaTest"),
        }
    }, createOrderHandler)
}

export default orderRoutes