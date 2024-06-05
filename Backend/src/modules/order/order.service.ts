import prisma from "../../utils/prisma";
import { createOrderInput, createOrderInputTest } from "./order.schema";


export const createOrder = async (input: createOrderInputTest) => {
    const order = await prisma.order.create({ 
        data: {
            userId: input.userId,
            orderedItems: {
                create: input.orderedItems
            }
        },
     })

    return order
}

export const findOrders = async () => {
    return prisma.order.findMany({
        select:{
            userId: true,
            orderId: true,
            orderedItems: true,
        }
    })
}