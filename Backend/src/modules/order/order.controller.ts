import { FastifyReply, FastifyRequest } from "fastify"
import { createOrderInput } from "./order.schema"
import { createOrder } from "./order.service"

export const getOrdersHandler = () => {
    
}

export const createOrderHandler = async (request: FastifyRequest<{ Body: createOrderInput }>, reply: FastifyReply) => {
    const body = request.body

    try {
        const order = await createOrder(body)

        return reply.code(201).send(order)
    } catch (e) {
        console.log(e)

        return reply.code(500).send(e)
    }
}