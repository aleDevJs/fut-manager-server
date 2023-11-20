import { GetPlayersByTeamService } from "@/services/player/get-players-by-team-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const schema = z.object({
  teamId: z.string().uuid(),
})

export async function getPlayersByTeamController(request: FastifyRequest, reply: FastifyReply) {
  
  const { teamId } = schema.parse(request.params)
  
  const getPlayersByTeamService = new GetPlayersByTeamService()

  try {

    const players = await getPlayersByTeamService.execute(teamId)

    return reply.send(players)

  } catch (error) {

    if (error instanceof Error) {
      return reply.status(400).send({
        message: error.message
      })
    }

    throw error

  }


} 