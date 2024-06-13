import { FastifyInstance } from "fastify";
import { getProductsHandler } from "./product.controller";

//Function for all product routes
const productRoutes = async (server: FastifyInstance) => {
    server.get("/", getProductsHandler)
}

export default productRoutes