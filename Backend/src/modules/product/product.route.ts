import { FastifyInstance } from "fastify";
import { getProductsHandler } from "./product.controller";


const productRoutes = async (server: FastifyInstance) => {
    server.get("/", getProductsHandler)
}

export default productRoutes