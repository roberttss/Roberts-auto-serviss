import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByEmail, findUsers } from "./user.service"
import { LoginInput, createUserInput } from "./user.schema";
import { verifyPassword } from "../../utils/hash";
import { server } from "../../app";

export const registerUserHandler = async (request: FastifyRequest<{Body: createUserInput}>, reply: FastifyReply) => {
    const body = request.body

    try{
        const user = await createUser(body)

        return reply.code(201).send(user)
    } catch(e){
        console.log(e)

        return reply.code(500).send(e)
    }
}

export const loginHandler = async (request: FastifyRequest<{Body: LoginInput}>, reply: FastifyReply) => {
    const body = request.body;
    
    const user = await findUserByEmail(body.email);

    if(!user){
        return reply.code(401).send({
            message: "Invalid email or password"
        })
    }

    const correctPassword = verifyPassword({
        candidatePassword: body.password,
        salt: user.salt,
        hash: user.password,
    })

    if(correctPassword){
        const {password, salt, ...rest} = user

        const token = server.jwt.sign(rest)

        let current = new Date();

        reply.setCookie('access_token', token, {
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            secure: true,
            expires: new Date(current.getTime() + 86400000),
        })
     
        return reply.send({ accessToken: token })
    }

    reply.code(401).send({
        message: "Invalid email or password"
    });
}

export const getUserHandler = async (req: FastifyRequest, reply: FastifyReply) => {
    const users = await findUsers()

    return reply.code(200).send(users)
}

export const logoutUser = (req: FastifyRequest, reply: FastifyReply) => {
    reply.clearCookie('access_token')

    return reply.send({ message: 'Logout successful' })
}