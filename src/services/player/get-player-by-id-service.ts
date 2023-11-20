import { IPlayerRepository } from "@/repositories/interfaces/player-repository";
import { PrismaPlayersRepository } from "@/repositories/prisma/prisma-players-repository";
import { Player } from "@prisma/client";


export class GetPlayerByIdService {

  private playerRepository: IPlayerRepository

  constructor() {
    this.playerRepository = new PrismaPlayersRepository()
  }

  async execute(id: string): Promise<Player | null> {

    const player = await this.playerRepository.getById(id)

    if(!player) {
      throw new Error('Player not found')
    } 
    
    player.height = player.height / 100
    player.weight = player.weight / 1000
    player.salary = player.salary / 100
    
    return player

  }

}