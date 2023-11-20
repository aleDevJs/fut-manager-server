import { makeUserRegisterService } from "@/factories/user/make-register-user-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'

const schema = z.object({
  name: z.string().max(50, "Nome deve ter no máximo 50 caracteres.").nonempty("Nome não pode ser vazio."),
  email: z.string().email(),
  password: z.string().min(6, "Senha deve ter no minímo 6 caracteres.").max(50, "Senha deve ter no máximo 50 caracteres.").nonempty("Senha não pode ser vazia.")
})

export async function registerUserController(request: FastifyRequest, reply: FastifyReply) {

  const { name, email, password } = schema.parse(request.body)

  const registerUserService = makeUserRegisterService()


  let response = null

  try {
    const { user } = await registerUserService.execute({
      name,
      email,
      password
    })

    response = user

  } catch (error) {

    if (error instanceof Error) {
      return reply.status(400).send({
        message: error.message
      })
    }

    throw error

  }

  return reply.status(201).send({
    id: response.id,
    name: response.name,
    email: response.email
  })
}