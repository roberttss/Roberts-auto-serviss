import fastifyJwt, { FastifyJWT } from "@fastify/jwt";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import userRoutes from "./modules/user/user.route";
import cors from '@fastify/cors'
import { userSchemas } from "./modules/user/user.schema";
import productRoutes from "./modules/product/product.route";
import fCookie from '@fastify/cookie'
import orderRoutes from "./modules/order/order.route";
import { orderSchemas } from "./modules/order/order.schema";
import { serviceRoutes } from "./modules/service/service.route";
import { serviceSchemas } from "./modules/service/service.schema";

export const server = Fastify({
    logger: true
  })

server.register(fCookie, {
    secret: 'fdgndfkbn2n3452348*9283#$*%@fh9isdf@*jsdoi1214asddfv908pvb6123nsdf8912kdfsgmweroabn',
    hook: 'preHandler',
})

server.register(fastifyJwt,{
    secret: 'fdgndfkbn2n345oii0msdlkfgfdfjsdoi1214asddfv908pvb6123nsdf8912kdfsgmweroabn'
  })

server.addHook('preHandler', (req, res, next) => {
    req.jwt = server.jwt
    return next()
})

server.register(cors, {
    origin:true,
    credentials:true,
})

server.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
    const token = request.cookies.access_token

    if (!token) {
        return reply.status(401).send({ message: 'Authentication required' })
    }

    const decoded = request.jwt.verify<FastifyJWT['user']>(token)
    request.user = decoded
})
  
const main = async () => {
    for (const schema of [...userSchemas, ...orderSchemas, ...serviceSchemas]){
        server.addSchema(schema);
    }

    server.register(userRoutes, {prefix: "api/users"})

    server.register(productRoutes, {prefix: "api/products"})

    server.register(orderRoutes, { prefix: "api/orders" })

    server.register(serviceRoutes, { prefix: "api/services" })

    try{
        await server.listen(3000, '0.0.0.0')

        console.log('Server ready at http://localhost:3000')
    }catch(e){
        console.error(e);

        process.exit(1)
    }
}

main()