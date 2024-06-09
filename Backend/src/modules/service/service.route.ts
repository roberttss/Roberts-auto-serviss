import { FastifyInstance } from "fastify"
import { $ref } from "./service.schema"
import { createServiceHandler } from "./service.controller"

export const serviceRoutes = async (server: FastifyInstance) => {
    server.post('/create', {
        schema: {
            body: $ref("serviceSchema"),
        }
    }, createServiceHandler)
}