import { Team } from "@prisma/client";
import { ITeamsRepository } from "../interfaces/teams-repository";
import { client } from "@/lib/client";

export class PrismaTeamsRepository implements ITeamsRepository {

  async create(name: string, shield: string, userId: string): Promise<Team> {

    const createdTeam = await client.team.create({
      data: {
        name: name,
        shield: shield,
        user_id: userId
      }
    })

    return createdTeam

  }

  async getById(id: string): Promise<Team | null> {

    const team = await client.team.findUnique({
      where: {
        id
      }
    })

    return team

  }

  async getByUserId(userId: string): Promise<Team | null> {

    const team = await client.team.findFirst({
      where: {
        user: {
          id: userId
        }
      }
    })

    return team

  }

}