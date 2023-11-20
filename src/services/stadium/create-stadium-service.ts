import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { IStadiumRepository } from "@/repositories/interfaces/stadium-repository";
import { ITeamsRepository } from "@/repositories/interfaces/teams-repository";
import { PrismaStadiumsRepository } from "@/repositories/prisma/prisma-stadiums-repository";
import { PrismaTeamsRepository } from "@/repositories/prisma/prisma-teams-repository";
import { Stadium } from "@prisma/client";

interface ICreateStadiumRequest {
  name: string
  teamId: string
}

interface ICreateStadiumResponse {
  stadium: Stadium
}


export class CreateStadiumService {

  private IStadiumRepository: IStadiumRepository;
  private teamRepository: ITeamsRepository

  constructor() {
    this.IStadiumRepository = new PrismaStadiumsRepository()
    this.teamRepository = new PrismaTeamsRepository()
  }

  async execute({ name, teamId }: ICreateStadiumRequest): Promise<ICreateStadiumResponse> {

    const teamExists = await this.teamRepository.getById(teamId);

    if(!teamExists) {
      throw new ResourceNotFoundError('Time')
    }

    const stadiumAlreadyExists = await this.IStadiumRepository.getByName(name, teamId);

    if(stadiumAlreadyExists) {
      throw new ResourceNotFoundError('Estádio')
    }

    const stadium = await this.IStadiumRepository.create(name, teamId);

    return {
      stadium
    }

  }

}