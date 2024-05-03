import Fastify from "fastify";
import userRoutes from "./modules/user/user.route";
import cors from '@fastify/cors'

const server = Fastify({
    logger: true
  })

server.register(cors, { 
    // put your options here
})

server.get("/healthcheck", async () => {
    return { status: "OK" };
});
  
const main = async () => {

server.register(userRoutes, {prefix: "api/users"})

    try{
        await server.listen(3000, '0.0.0.0')

        console.log('Server ready at http://localhost:3000')
    }catch(e){
        console.error(e);

        process.exit(1)
    }
}

main()