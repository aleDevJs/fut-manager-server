import { CreateTeamService } from "@/services/team/create-team-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(3, "Nome deve ter no minímo 3 caracteres.").max(50, "Nome deve ter no máximo 50 caracteres.").nonempty("Nome não pode ser vazio."),
  userId: z.string().uuid("Id do usuário inválido.").nonempty("Id do usuário não pode ser vazio.")
})

export async function createTeamController(request: FastifyRequest, reply: FastifyReply) {

  const { name, userId } = schema.parse(request.body)
  const shield = request.file.filename

  const createTeamService = new CreateTeamService()

  let response = null

  try {
    const { team } = await createTeamService.execute({
      name,
      shield,
      userId
    })

    response = team

  } catch (error) {

    if (error instanceof Error) {
      return reply.status(400).send({
        message: error.message
      })
    }

    throw error

  }

  return reply.status(201).send({
    teamId: response.id
  })
}