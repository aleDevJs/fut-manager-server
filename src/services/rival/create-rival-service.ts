import { ResourceAlreadyExistsError } from "@/errors/resource-already-exists-error";
import { IRivalsRepository } from "@/repositories/interfaces/rivals-repository";
import { ITeamsRepository } from "@/repositories/interfaces/teams-repository";
import { PrismaRivalsRepository } from "@/repositories/prisma/prisma-rivals-repository";
import { PrismaTeamsRepository } from "@/repositories/prisma/prisma-teams-repository";
import { Rival } from "@prisma/client";

interface IResponse {
  rival: Rival
}

export class CreateRivalService {

  private rivalsRepository: IRivalsRepository
  private teamRepository: ITeamsRepository

  constructor() {
    this.rivalsRepository = new PrismaRivalsRepository()
    this.teamRepository = new PrismaTeamsRepository()
  }

  async execute(name: string, shield: string, teamId: string): Promise<IResponse> {

    const rivalAlreadyExists = await this.rivalsRepository.getByName(name, teamId)

    if (rivalAlreadyExists) {
      throw new ResourceAlreadyExistsError('Rival')
    }

    const teamExists = await this.teamRepository.getById(teamId)

    if (!teamExists) {
      throw new ResourceAlreadyExistsError('Time')
    }

    const rival = await this.rivalsRepository.create(name, shield, teamId)

    return {
      rival
    }

  }

}