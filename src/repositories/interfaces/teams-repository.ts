import { Prisma, Team } from "@prisma/client";

export interface ITeamsRepository {

  create(name: string, shield: string, userId: string): Promise<Team>
  getById(id: string): Promise<Team | null>
  getByUserId(userId: string): Promise<Team | null>
}