import { z } from "zod";

const createUserSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email is required"
    }).email(),
    name: z.string(),
    password: z.string({
            required_error: "Password is required",
            invalid_type_error: "Password is required"
        })
})

export type createUserInput = z.infer<typeof createUserSchema>