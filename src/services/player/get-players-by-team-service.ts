import { IPlayerRepository } from "@/repositories/interfaces/player-repository";
import { PrismaPlayersRepository } from "@/repositories/prisma/prisma-players-repository";
import { Player } from "@prisma/client";

export class GetPlayersByTeamService {

  private playerRepository: IPlayerRepository

  constructor() {
    this.playerRepository = new PrismaPlayersRepository()
  }

  async execute(teamId: string): Promise<Player[]> {

    const players = await this.playerRepository.getByTeam(teamId)

    players.forEach(player => {
      player.height = player.height / 100
      player.weight = player.weight / 1000
      player.salary = player.salary / 100
    })

    return players

  }

}