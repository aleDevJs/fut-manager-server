import { InvalidDateError } from "@/errors/invalid-date-error";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { IPlayerRepository } from "@/repositories/interfaces/player-repository";
import { ITeamsRepository } from "@/repositories/interfaces/teams-repository";
import { PrismaPlayersRepository } from "@/repositories/prisma/prisma-players-repository";
import { PrismaTeamsRepository } from "@/repositories/prisma/prisma-teams-repository";
import { Player } from "@prisma/client";
import { compareAsc } from "date-fns";


interface ICreatePlayerRequest {
  player: Omit<Player, 'id'>
}

interface ICreatePlayerResponse {
  player: Player
}

export class CreatePlayerService {

  private readonly playerRepository: IPlayerRepository
  private teamRepository: ITeamsRepository

  public constructor() {
    this.playerRepository = new PrismaPlayersRepository()
    this.teamRepository = new PrismaTeamsRepository()
  }

  async execute({ player }: ICreatePlayerRequest): Promise<ICreatePlayerResponse> {

    let createdPlayer = null

    const teamExists = await this.teamRepository.getById(player.team_id)

    if(!teamExists) {
      throw new ResourceNotFoundError('Time')
    }

    const currentDate = new Date(new Date().setHours(new Date().getHours() - 3))
    
    //check if the date_of_birth is before the current date
    const timeIsBefore = compareAsc(currentDate, new Date(player.date_of_birth))
    if(timeIsBefore === -1) {
      throw new InvalidDateError('later')
    }

    try {
      createdPlayer = await this.playerRepository.create(player)
    } catch (error) {
      console.info(error)
    }

    if (!createdPlayer) throw new Error('Player not created')

    return {
      player: createdPlayer
    }

  }

}