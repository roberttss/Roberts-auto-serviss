import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const orderItemSchema = z.object({
    id: z.number(),
    title: z.string(),
    orderedAmount: z.number(),
    price: z.number(),
})

const createOrderSchema = z.array(orderItemSchema)

const createOrderResponseSchemaTest = z.object({
    userId: z.number(),
    orderedItems: z.array(orderItemSchema)
})

export type createOrderInput = z.infer<typeof createOrderSchema>
export type createOrderInputTest = z.infer<typeof createOrderResponseSchemaTest>

export const {schemas: orderSchemas, $ref } = buildJsonSchemas({
    createOrderSchema,
    createOrderResponseSchemaTest
}, { $id: "orderSchema"})