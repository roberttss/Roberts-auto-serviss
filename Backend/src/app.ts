import fastifyJwt from "@fastify/jwt";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import userRoutes from "./modules/user/user.route";
import cors from '@fastify/cors'
import { userSchemas } from "./modules/user/user.schema";
import productRoutes from "./modules/product/product.route";

export const server = Fastify({
    logger: true
  })

declare module 'fastify' {
    export interface FastifyInstance {
        authenticate: any;
    }
}

server.register(fastifyJwt,{
    secret: 'fdgndfkbn2n345oii0msdlkfgfdfjsdoi1214asddfv908pvb6123nsdf8912kdfsgmweroabn'
  })

server.decorate("authenticate", async (request : FastifyRequest, reply: FastifyReply) => {
    try{
        await request.jwtVerify()
    }catch(e){
        return reply.send(e)
    }

})

server.register(cors, { 
    // put your options here
})

server.get("/healthcheck", async () => {
    return { status: "OK" };
});
  
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