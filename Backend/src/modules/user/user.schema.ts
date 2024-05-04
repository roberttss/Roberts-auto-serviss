import { z } from "zod";
import {buildJsonSchemas} from 'fastify-zod'

const userCore = {
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email is required"
    }).email(),
    name: z.string(),
}

const createUserSchema = z.object({
    ...userCore,
    password: z.string({
            required_error: "Password is required",
            invalid_type_error: "Password is required"
        })
})

const createUserResponseSchema = z.object({
    id: z.number(),
    ...userCore, 
})

const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email is required"
    }).email(),
    password: z.string()
});

const loginResponseSchema = z.object({
    accessToken: z.string(),
})

export type createUserInput = z.infer<typeof createUserSchema>
export type LoginInput = z.infer<typeof loginSchema>


export const {schemas: userSchemas, $ref } = buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginResponseSchema,
})