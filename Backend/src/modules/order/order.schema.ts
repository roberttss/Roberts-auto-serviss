import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const orderItemSchema = z.object({
    id: z.number(),
    title: z.string(),
    orderedAmount: z.number(),
    price: z.number(),
})

const createOrderSchema = z.array(orderItemSchema)

const createOrderResponseSchema = z.object({
    orderId: z.number(),
    // ...createOrderSchema,
})

export type createOrderInput = z.infer<typeof createOrderSchema>

export const {schemas: orderSchemas, $ref } = buildJsonSchemas({
    createOrderSchema,
    // createOrderResponseSchema
    
}, { $id: "orderSchema"})