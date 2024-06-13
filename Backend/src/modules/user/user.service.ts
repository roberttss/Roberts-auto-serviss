import { hashPassword } from "../../utils/hash"
import prisma from "../../utils/prisma"
import { createUserInput } from "./user.schema"

// Function for user creating and password hashing
export const createUser = async (input: createUserInput) => {
    const { password, ...rest } = input

    const {hash, salt} = hashPassword(password)

    const user = await prisma.user.create({data: {...rest, salt, password: hash}})

    return user
}

// Function to find exact user with email
export const findUserByEmail = async (email: string, ) => {
    return prisma.user.findUnique({
        where: {
            email,
        }
    })
}

// Function to find all registered users
export const findUsers = async () => {
    return prisma.user.findMany({
        select:{
            email:true,
            name: true,
            id: true,
        }
    });
}