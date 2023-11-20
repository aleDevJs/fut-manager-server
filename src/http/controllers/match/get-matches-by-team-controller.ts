import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { GetMatchesByTeamService } from "@/services/match/get-matches-by-team-service";

const schema = z.object({
  teamId: z.string().uuid(),
})

export async function getMatchesByTeamController(request: FastifyRequest, reply: FastifyReply) {

  const { teamId } = schema.parse(request.params)
  const getMatchesByTeamService = new GetMatchesByTeamService()

  try {

    const matches = await getMatchesByTeamService.execute(teamId)

    return reply.send(matches)

  } catch (error) {

    if (error instanceof Error) {
      return reply.status(400).send({
        message: error.message
      })
    }

    throw error
  }


}