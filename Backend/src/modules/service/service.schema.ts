import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

// Variable for each created service
const serviceSchema = z.object({
    createAt: z.date(),
    name: z.string(),
    orderedServiceDate: z.string(),
    orderedServiceTime: z.string(),
    userId: z.number()
})

// Variable for all services
const allServicesSchema = z.array(serviceSchema)

// Service types
export type allServiceResponse = z.infer<typeof allServicesSchema>
export type createServiceInput = z.infer<typeof serviceSchema>


export const { schemas: serviceSchemas, $ref } = buildJsonSchemas({
    allServicesSchema,
    serviceSchema
}, { $id: 'serviceSchemas' })