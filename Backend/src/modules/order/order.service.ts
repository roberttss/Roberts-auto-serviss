import prisma from "../../utils/prisma";
import { createOrderInput } from "./order.schema";


export const createOrder = async (input: createOrderInput) => {
    const order = await prisma.order.create({ 
        data: {
            orderedItems: {
                create: input
            }
        },
        include: {
            orderedItems: true
        }
     })

    return order
}

export const findOrders = async () => {
    return prisma.order.findMany({
        select:{
           orderedItems: true, 
        }
    })
}