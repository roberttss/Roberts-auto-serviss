import { FastifyReply, FastifyRequest } from "fastify"
import { createServiceInput } from "./service.schema"
import { createService } from "./service.service"

export const createServiceHandler = async (request: FastifyRequest<{ Body: createServiceInput }>, reply: FastifyReply) => {
    const body = request.body

    try {
        const order = await createService(body)

        return reply.code(201).send(order)
    } catch (e) {
        console.log(e)

        return reply.code(500).send(e)
    }
}