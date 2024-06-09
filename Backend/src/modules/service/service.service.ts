import prisma from "../../utils/prisma"
import { createServiceInput } from "./service.schema"

export const createService = async (input: createServiceInput) => {
    const {...rest} = input

    const service = await prisma.service.create({
        data: {...rest}
    })

    return service
}

export const findServices = async (userId: number) => {
    return prisma.service.findMany({
        where: {
            userId: userId,
        },
        select: {
            userId: true, 
            name: true,
            orderedServiceDate: true,
            orderedServiceTime: true,
            createAt: true, 
        }
    })
}