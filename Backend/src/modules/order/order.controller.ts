import { FastifyReply, FastifyRequest } from "fastify"
import { createOrderInput, createOrderInputTest } from "./order.schema"
import { createOrder, findOrders } from "./order.service"

type ParamsType = {
    userId: string
}

export const getOrdersHandler = async (req: FastifyRequest<{ Params: ParamsType }>, reply: FastifyReply) => {
    const { userId } = req.params
    
    const orders = await findOrders(parseInt(userId, 10))

    return reply.code(200).send(orders)
}

export const createOrderHandler = async (request: FastifyRequest<{ Body: createOrderInputTest }>, reply: FastifyReply) => {
    const body = request.body

    try {
        const order = await createOrder(body)

        return reply.code(201).send(order)
    } catch (e) {
        console.log(e)

        return reply.code(500).send(e)
    }
}