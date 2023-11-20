import { Prisma, Stadium } from "@prisma/client";


export interface IStadiumRepository {

  create(name: string, teamId: string): Promise<Stadium>
  getById(id: string): Promise<Stadium | null>
  getByName(name: string, teamId: string): Promise<Stadium | null>

}