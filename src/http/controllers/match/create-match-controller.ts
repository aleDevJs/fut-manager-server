import { CreateMatchService } from "@/services/match/create-match-service";
import { isoDateValidation } from "@/utils/validations";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const schema = z.object({
  date: isoDateValidation,
  team_id: z.string().uuid(),
  rival_id: z.string().uuid(),
  stadium_id: z.string().uuid()
})

export async function createMatchController(request: FastifyRequest, reply: FastifyReply) {
  
  const body = schema.parse(request.body)

  const createMatchService = new CreateMatchService()

  let response = null

  try {
    
    const { match } = await createMatchService.execute({
      date: new Date(body.date),
      team_id: body.team_id,
      rival_id: body.rival_id,
      stadium_id: body.stadium_id
    })

    response = match

  } catch (error) {
      
      if (error instanceof Error) {
        return reply.status(400).send({
          message: error.message
        })
      }
  
      throw error
  
  }

  return reply.status(201).send({
    message: 'Match created successfully',
    match: response
  })

}