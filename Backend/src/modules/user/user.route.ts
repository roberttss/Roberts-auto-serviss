import { FastifyInstance } from "fastify"
import { getUserHandler, getVerifyHandler, loginHandler, logoutUser, registerUserHandler } from "./user.controller"
import { $ref } from "./user.schema";

const userRoutes = async (server: FastifyInstance) => {
    server.post('/create', {
        schema: {
            body:$ref("createUserSchema"),
            response:{
                201: $ref("createUserResponseSchema"),
            }
        }
    }, registerUserHandler);

    server.post('/login', {
        schema: {
            body: $ref('loginSchema'),
            response: {
                200: $ref("loginResponseSchema"),
            }
       }
    } , loginHandler)

    server.get('/',{
        preHandler: [server.authenticate]
    }, getUserHandler)

    server.delete('/logout',{
        preHandler: [server.authenticate]
    }, logoutUser)

    server.get('/verify', { preHandler: [server.authenticate] }, getVerifyHandler)
}

export default userRoutes