import { client } from "@/lib/client";
import { IRivalsRepository } from "../interfaces/rivals-repository";
import { Rival } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime";


export class PrismaRivalsRepository implements IRivalsRepository {

  async create(name: string, shield: string, teamId: string) {

    const rival = await client.rival.create({
      data: {
        name,
        shield,
        team_id: teamId
      }
    })

    return rival

  }

  async getById(id: string) {

    const rival = await client.rival.findUnique({
      where: {
        id
      }
    })

    return rival
    
  }

  async getByName(name: string, teamId: string) {

    const rival = await client.rival.findFirst({
      where: {
        name,
        team_id: teamId
      }
    })

    return rival
    
  }

} 