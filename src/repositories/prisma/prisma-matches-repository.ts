import { Match } from "@prisma/client";
import { IMatchesRepository } from "../interfaces/matches-repository";
import { client } from "@/lib/client";
import { CreateMatchDTO } from "@/DTO/match-dto";
import { GetResult } from "@prisma/client/runtime";


export class PrismaMatchesRepository implements IMatchesRepository {

  async create(match: CreateMatchDTO): Promise<Match> {

    const createdMatch = await client.match.create({
      data: {
        date: match.date,
        team_id: match.team_id,
        rival_id: match.rival_id,
        stadium_id: match.stadium_id
      }
    });

    return createdMatch;

  }

  async getByTeam(teamId: string): Promise<Match[]> {

    const matches = await client.match.findMany({
      where: {
        team_id: teamId
      }
    });

    return matches;

  }

  async getBySchedule(teamId: string, schedule: Date) {

    const match = await client.match.findFirst({
      where: {
        date: schedule,
        team_id: teamId
      }
    });

    if (match) {
      return true
    }

    return false
  }

}