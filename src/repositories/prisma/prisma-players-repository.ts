import { Player, Prisma } from "@prisma/client"
import { IPlayerRepository } from "../interfaces/player-repository"
import { client } from "@/lib/client"

export class PrismaPlayersRepository implements IPlayerRepository {

  async create(player: Omit<Player, 'id'>): Promise<Player> {

    const createdPlayer = await client.player.create({
      data: {
        name: player.name,
        nationality: player.nationality,
        date_of_birth: player.date_of_birth,
        height: player.height,
        weight: player.weight,
        position: player.position,
        isInjured: player.isInjured,
        salary: player.salary,
        image: player.image,
        team_id: player.team_id
      }
    })

    return createdPlayer

  }

  async getById(id: string) {

    const player = await client.player.findUnique({
      where: {
        id
      }
    })

    return player

  }

  async getByTeam(teamId: string): Promise<Player[]> {

    const players = await client.player.findMany({
      where: {
        team_id: teamId
      }
    })

    return players

  }

  async update(id: string, data: Prisma.PlayerUpdateInput) {

    const updatedPlayer = await client.player.update({
      where: {
        id
      },
      data
    })

    return updatedPlayer

  }

}