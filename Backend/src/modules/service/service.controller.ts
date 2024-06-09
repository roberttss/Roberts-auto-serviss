import { FastifyReply, FastifyRequest } from "fastify"
import { serviceInput } from "./service.schema"

export const createServiceHandler = async (request: FastifyRequest<{ Body: serviceInput }>, reply: FastifyReply) => {
    const body = request.body

    try {
        const order = await createService(body)

        return reply.code(201).send(order)
    } catch (e) {
        console.log(e)

        return reply.code(500).send(e)
    }
}