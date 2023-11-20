import { UpdatePlayerService } from "@/services/player/update-player-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const schema = z.object({
  id: z.string(),
  player: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    position: z.string().optional(),
    height: z.number().optional(),
    wheigth: z.number().optional(),
    salary: z.number().optional(),
    date_of_birth: z.string().optional(),
    nationality: z.string().optional(),
    isInjured: z.boolean().optional(),
    team_id: z.string().optional()
  })
})

export async function updatePlayerController(request: FastifyRequest, reply: FastifyReply) {

  const body = schema.parse(request.body)
  let image: string | undefined = request.file?.filename
  
  if(!image) {
    image = undefined
  }

  const updatePlayerService = new UpdatePlayerService()

  let response = null

  try {

    const { player: updatedPlayer } = await updatePlayerService.execute({
      id: body.id,
      player: {
        ...body.player,
        image
      }
    })

    response = updatedPlayer


  } catch (error) {

    if (error instanceof Error) {
      return reply.status(400).send({
        message: error.message
      })
    }

    throw error

  }

  return reply.status(201).send({
    message: 'Player updated successfully',
    playerId: response?.id
  })

}