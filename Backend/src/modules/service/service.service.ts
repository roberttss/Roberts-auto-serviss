import prisma from "../../utils/prisma"
import { createServiceInput } from "./service.schema"

export const createService = async (input: createServiceInput) => {
    const {...rest} = input

    const service = await prisma.service.create({
        data: {...rest}
    })

    return service
}