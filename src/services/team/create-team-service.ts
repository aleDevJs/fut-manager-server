import { ITeamsRepository } from "@/repositories/interfaces/teams-repository";
import { PrismaTeamsRepository } from "@/repositories/prisma/prisma-teams-repository";
import { Team } from "@prisma/client";

interface ICreateTeamServiceParams {
  shield: string
  name: string
  userId: string
}

interface ICreateTeamServiceResponse {
  team: Team
}

export class CreateTeamService {

  private teamsRepository: ITeamsRepository

  constructor() {
    this.teamsRepository = new PrismaTeamsRepository()
  }

  async execute({ name, shield, userId }: ICreateTeamServiceParams): Promise<ICreateTeamServiceResponse> {

    const team = await this.teamsRepository.create(name, shield, userId)

    return {
      team
    }
  }

}