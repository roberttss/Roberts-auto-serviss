import { FastifyReply, FastifyRequest } from "fastify"
import { createServiceInput } from "./service.schema"
import { createService, findServices } from "./service.service"

type ParamsType = {
    userId: string
}

export const getServiceHandler = async (req: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) => {
    const { userId } = req.params

    const orders = await findServices(parseInt(userId, 10))

    return reply.code(200).send(orders)
}

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