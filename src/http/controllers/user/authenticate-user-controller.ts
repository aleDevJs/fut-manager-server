import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { makeAuthenticateUserService } from "@/factories/user/make-authenticate-user-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticateController(request: FastifyRequest, reply: FastifyReply) {

  const schema = z.object({
    email: z.string().email(),
    password: z.string()
  })

  const { email, password } = schema.parse(request.body)

  const authenticateService = makeAuthenticateUserService()

  try {

    const { user, teamId } = await authenticateService.execute({
      email, 
      password
    })

    const token = await reply.jwtSign({}, {
      sign: {
        sub: user.id
      }
    })

    return reply.status(200).send({
      name: user.name,
      teamId: teamId || null,
      token
    })
    
  }
  catch (err) {

    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: err.message
      })
    }

    throw err
  }

  

}