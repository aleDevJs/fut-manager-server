import { CreatePlayerService } from "@/services/player/create-player-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { playersPositions } from '@/utils/players-positions'
import { isoDateValidation } from "@/utils/validations";

const schema = z.object({
  name: z.string().max(50, "Nome deve ter no máximo 50 caracteres.").nonempty("Nome não pode ser vazio."),
  age: z.number().nonnegative("Idade deve ser um número positivo.").int("Idade deve ser um número inteiro."),
  position: z.nativeEnum(playersPositions, {
    errorMap: (issue, ctx) => {
      return {
        message: "Posição inválida. Lista de posições válidas: " + 
          Object.values(playersPositions).join(", ")
        + ".",
      }
    }
  }),
  height: z.number().int("Altura deve ser informado como número inteiro. (Ex: 1.80 = 180 / 100)"),
  weight: z.number().int("Peso deve ser informado como número inteiro. (Ex: 80.5 = 85500 / 1000)"),
  salary: z.number().int("Salário deve ser informado como número inteiro. (Ex: 1000.00 = 100000 / 100)"),
  date_of_birth: isoDateValidation,
  nationality: z.string().max(50, "Nacionalidade deve ter no máximo 50 caracteres.").nonempty("Nacionalidade não pode ser vazio."),
  isInjured: z.boolean().default(false),
  team_id: z.string().uuid("ID do time deve ser um UUID válido.").nonempty("ID do time não pode ser vazio."),
})

export async function createPlayerController(request: FastifyRequest, reply: FastifyReply) {

  const body = request.body as any
  const playerData = JSON.parse(body.player)
  const image = request.file.filename

  const validatedPlayer = schema.parse(playerData);

  console.log("Dados válidos:", validatedPlayer);

  const createPlayerService = new CreatePlayerService()

  let response = null

  try {

    const { player: createdPlayer } = await createPlayerService.execute({
      player: {
        height: validatedPlayer.height,
        image,
        isInjured: validatedPlayer.isInjured,
        name: validatedPlayer.name,
        nationality: validatedPlayer.nationality,
        position: validatedPlayer.position,
        salary: validatedPlayer.salary,
        team_id: validatedPlayer.team_id,
        weight: validatedPlayer.weight,
        date_of_birth: new Date(validatedPlayer.date_of_birth),
      }
    })

    response = createdPlayer


  } catch (error) {

    if (error instanceof Error) {
      return reply.status(400).send({
        message: error.message
      })
    }

    throw error

  }

  return reply.status(201).send({
    message: 'Player created successfully',
    playerId: response.id
  })

}