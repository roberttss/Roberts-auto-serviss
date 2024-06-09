import prisma from "../../utils/prisma"
import { serviceInput } from "./service.schema"

export const createService = async (input: serviceInput) => {
    const {...rest} = input

    const service = await prisma.service.create({
        data: {...rest}
    })

    return service
}