import { Stadium } from "@prisma/client";
import { IStadiumRepository } from "../interfaces/stadium-repository";
import { client } from "@/lib/client";


export class PrismaStadiumsRepository implements IStadiumRepository {

  async create(name: string, teamId: string): Promise<Stadium> {

    const stadium = await client.stadium.create({
      data: {
        name: name,
        team_id: teamId
      }
    });

    return stadium;

  }

  async getById(id: string): Promise<Stadium | null> {

    const stadium = await client.stadium.findUnique({
      where: {
        id: id
      }
    });

    return stadium;

  }

  async getByName(name: string, teamId: string): Promise<Stadium | null> {

    const stadium = await client.stadium.findFirst({
      where: {
        name: name,
        team_id: teamId
      }
    });

    return stadium;

  }

}