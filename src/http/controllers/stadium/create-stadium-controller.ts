import { CreateStadiumService } from "@/services/stadium/create-stadium-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(3, "Nome deve ter no minímo 3 caracteres.").max(50, "Nome deve ter no máximo 50 caracteres.").nonempty("Nome não pode ser vazio."),
  teamId: z.string().uuid("Id do time inválido.")
})

export async function CreateStadiumController(request: FastifyRequest, reply: FastifyReply) {

  const { name, teamId } = schema.parse(request.body)

  const createStadiumService = new CreateStadiumService()
  let response = null

  try {

    const { stadium } = await createStadiumService.execute({ name, teamId })

    response = stadium

  } catch (error) {

    if (error instanceof Error) {
      return reply.status(400).send({
        message: error.message
      })
    }

    throw error

  }

  return reply.status(201).send({
    message: 'Stadium created successfully',
    stadium: response
  })

}