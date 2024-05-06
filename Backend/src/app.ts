import fastifyJwt, { FastifyJWT } from "@fastify/jwt";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import userRoutes from "./modules/user/user.route";
import cors from '@fastify/cors'
import { userSchemas } from "./modules/user/user.schema";
import productRoutes from "./modules/product/product.route";
import fCookie from '@fastify/cookie'


export const server = Fastify({
    logger: true
  })

server.register(fastifyJwt,{
    secret: 'fdgndfkbn2n345oii0msdlkfgfdfjsdoi1214asddfv908pvb6123nsdf8912kdfsgmweroabn'
  })

server.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
    const token = request.cookies.access_token

    if (!token) {
        return reply.status(401).send({ message: 'Authentication required' })
    }

    const decoded = request.jwt.verify<FastifyJWT['user']>(token)
    request.user = decoded

})

server.addHook('preHandler', (req, res, next) => {
    req.jwt = server.jwt
    return next()
})

server.register(fCookie, {
    secret: 'fdgndfkbn2n3452348*9283#$*%@fh9isdf@*jsdoi1214asddfv908pvb6123nsdf8912kdfsgmweroabn',
    hook: 'preHandler',
})

server.register(cors, {
    origin:true,
    credentials:true,
})
  
const main = async () => {
    for(const schema of userSchemas){
        server.addSchema(schema);
    }

    server.register(userRoutes, {prefix: "api/users"})

    server.register(productRoutes, {prefix: "api/products"})

    try{
        await server.listen(3000, '0.0.0.0')

        console.log('Server ready at http://localhost:3000')
    }catch(e){
        console.error(e);

        process.exit(1)
    }
}

main()