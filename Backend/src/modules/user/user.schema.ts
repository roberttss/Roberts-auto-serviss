import { z } from "zod";
import {buildJsonSchemas} from 'fastify-zod'

// Variable with main user information
const userCore = {
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email is required"
    }).email(),
    name: z.string(),
}

// Variable with schema for user creation
const createUserSchema = z.object({
    ...userCore,
    password: z.string({
            required_error: "Password is required",
            invalid_type_error: "Password is required"
        })
})

// Variable with created user response types
const createUserResponseSchema = z.object({
    id: z.number(),
    ...userCore, 
})

// Variable for type, to login
const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email is required"
    }).email(),
    password: z.string()
});

// Variable for type, to successfully login
const loginResponseSchema = z.object({
    accessToken: z.string(),
})

// Variables for user types
export type createUserInput = z.infer<typeof createUserSchema>
export type LoginInput = z.infer<typeof loginSchema>


export const {schemas: userSchemas, $ref } = buildJsonSchemas({
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginResponseSchema,
}, { $id: "userSchema" })