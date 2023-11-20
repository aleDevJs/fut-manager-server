import { GetPlayerByIdService } from "@/services/player/get-player-by-id-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


const schema = z.object({
  id: z.string().uuid()
})

export async function getPlayerByIdController(request: FastifyRequest, reply: FastifyReply) {

  const { id } = schema.parse(request.params)

  const getPlayerIdService = new GetPlayerByIdService()

  try {

    const player = await getPlayerIdService.execute(id)

    return reply.status(200).send(player)

  } catch (error) {

    if (error instanceof Error) {
      return reply.status(400).send({
        message: error.message
      })
    }

    throw error


  }

}