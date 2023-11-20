import { CreateMatchDTO } from "@/DTO/match-dto";
import { Match, Prisma } from "@prisma/client";

export interface IMatchesRepository {

  create(match: CreateMatchDTO): Promise<Match>
  getByTeam(teamId: string): Promise<Match[]>
  getBySchedule(teamId: string,scheduleId: Date): Promise<boolean>
}