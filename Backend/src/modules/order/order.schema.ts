import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

// Variable for each order item schema
const orderItemSchema = z.object({
    productId: z.number(),
    title: z.string(),
    orderedAmount: z.number(),
    price: z.number(),
})

// Variable for all orders
const createOrderSchema = z.array(orderItemSchema)

// Variable for order response
const createOrderResponseSchemaTest = z.object({
    userId: z.number(),
    orderedItems: z.array(orderItemSchema)
})

// Exportable types for orders
export type createOrderInput = z.infer<typeof createOrderSchema>
export type createOrderInputTest = z.infer<typeof createOrderResponseSchemaTest>

export const {schemas: orderSchemas, $ref } = buildJsonSchemas({
    createOrderSchema,
    createOrderResponseSchemaTest
}, { $id: "orderSchema"})