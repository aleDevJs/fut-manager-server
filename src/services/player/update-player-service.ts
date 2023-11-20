import { IPlayerRepository } from "@/repositories/interfaces/player-repository"
import { PrismaPlayersRepository } from "@/repositories/prisma/prisma-players-repository"
import { Prisma } from "@prisma/client"

interface IUpdatePlayerRequest {
  id: string
  player: Prisma.PlayerUpdateInput
}



export class UpdatePlayerService {

  private playerRepository: IPlayerRepository

  constructor() {
    this.playerRepository = new PrismaPlayersRepository()
  }

  async execute({ id, player }: IUpdatePlayerRequest) {

    const playerExists = await this.playerRepository.getById(id)

    if (!playerExists) {
      throw new Error('Player not found')
    }

    const updatedPlayer = await this.playerRepository.update(id, player)

    return {
      player: updatedPlayer
    }

  }

}