import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const serviceSchema = z.object({
    createAt: z.date(),
    name: z.string(),
    orderedServiceDate: z.string(),
    orderedServiceTime: z.string(),
    userId: z.number()
})

const allServicesSchema = z.array(serviceSchema)

export type allServiceResponse = z.infer<typeof allServicesSchema>
export type serviceInput = z.infer<typeof serviceSchema>


export const { schemas: serviceSchemas, $ref } = buildJsonSchemas({
    allServicesSchema,
    serviceSchema
}, { $id: 'serviceSchema' })