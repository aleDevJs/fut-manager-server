import { IMatchesRepository } from "@/repositories/interfaces/matches-repository";
import { PrismaMatchesRepository } from "@/repositories/prisma/prisma-matches-repository";
import { Match } from "@prisma/client";

export class GetMatchesByTeamService {

  private matchesRepository: IMatchesRepository

  constructor() {
    this.matchesRepository = new PrismaMatchesRepository()
  }

  async execute(teamId: string): Promise<Match[]> {

    const matches = await this.matchesRepository.getByTeam(teamId)

    return matches

  }

}