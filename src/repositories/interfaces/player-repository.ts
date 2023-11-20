import { Player, Prisma } from "@prisma/client";


export interface IPlayerRepository {
  create(player: Omit<Player, 'id'>): Promise<Player>
  getById(id: string): Promise<Player | null>
  getByTeam(teamId: string): Promise<Player[]>
  update(id: string, data: Prisma.PlayerUpdateInput): Promise<Player>
}