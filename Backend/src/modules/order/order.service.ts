import prisma from "../../utils/prisma";
import { createOrderInputTest } from "./order.schema";

//Function to create order by prisma type
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

//Function to fin all users with exact userId
export const findOrders = async (userId: number) => {
    return prisma.order.findMany({
        where: {
            userId: userId,
        },
        select:{
            userId: true,
            orderId: true,
            orderedItems: true,
        }
    })
}