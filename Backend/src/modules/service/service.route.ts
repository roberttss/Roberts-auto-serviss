import { FastifyInstance } from "fastify"
import { $ref } from "./service.schema"
import { createServiceHandler, getServiceHandler } from "./service.controller"

// Function for all service endpoint routes
export const serviceRoutes = async (server: FastifyInstance) => {
    server.get<{ Params: { userId: string } }>('/all/:userId', {
        preHandler: [server.authenticate]
    }, getServiceHandler);

    server.post('/create', {
        schema: {
            body: $ref("serviceSchema"),
        }
    }, createServiceHandler)
}