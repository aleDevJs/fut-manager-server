import { Rival } from "@prisma/client";


export interface IRivalsRepository {
  
  create(name: string, shield: string, teamId: string): Promise<Rival>
  getById(id: string): Promise<Rival | null>
  getByName(name: string, teamId: string): Promise<Rival | null>

}