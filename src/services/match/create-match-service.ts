import { CreateMatchDTO } from "@/DTO/match-dto";
import { InvalidDateError } from "@/errors/invalid-date-error";
import { InvalidScheduleMatchError } from "@/errors/invalid-schedule-match-error";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { IMatchesRepository } from "@/repositories/interfaces/matches-repository";
import { IRivalsRepository } from "@/repositories/interfaces/rivals-repository";
import { IStadiumRepository } from "@/repositories/interfaces/stadium-repository";
import { ITeamsRepository } from "@/repositories/interfaces/teams-repository";
import { PrismaMatchesRepository } from "@/repositories/prisma/prisma-matches-repository";
import { PrismaRivalsRepository } from "@/repositories/prisma/prisma-rivals-repository";
import { PrismaStadiumsRepository } from "@/repositories/prisma/prisma-stadiums-repository";
import { PrismaTeamsRepository } from "@/repositories/prisma/prisma-teams-repository";
import { Match } from "@prisma/client";
import { compareAsc, format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ICreateMatchRequest extends CreateMatchDTO {}

interface ICreateMatchResponse {
  match: Match
}

export class CreateMatchService {

  private matchRepository: IMatchesRepository
  private teamRepository: ITeamsRepository
  private rivalRepository: IRivalsRepository
  private IStadiumRepository: IStadiumRepository

  constructor() {
    this.matchRepository = new PrismaMatchesRepository()
    this.teamRepository = new PrismaTeamsRepository()
    this.rivalRepository = new PrismaRivalsRepository()
    this.IStadiumRepository = new PrismaStadiumsRepository()
  }

  async execute({date, team_id, rival_id, stadium_id}: ICreateMatchRequest): Promise<ICreateMatchResponse> {

    const currentDate = new Date(new Date().setHours(new Date().getHours() - 3))
    
    //check if the match time is before the current date
    const timeIsBefore = compareAsc(new Date(date), currentDate)
    if(timeIsBefore === -1) {
      throw new InvalidScheduleMatchError('Partida não pode ser marcada para um horário anterior ao atual')
    }

    const matchInSameSchedule = await this.matchRepository.getBySchedule(team_id, date)
    if(matchInSameSchedule) {
      throw new InvalidScheduleMatchError('Duas partidas não podem ser marcadas no mesmo horário')
    }

    // Verify if date is later than current date
    if(compareAsc(new Date(date), currentDate) === -1) {
      throw new InvalidDateError("earlier")
    }


    //Verify if resources exists

    const teamExists = await this.teamRepository.getById(team_id)

    if(!teamExists) {
      throw new ResourceNotFoundError('Time')
    }

    const rivalExists = await this.rivalRepository.getById(rival_id)

    if(!rivalExists) {
      throw new ResourceNotFoundError('Rival')
    }

    const stadiumExists = await this.IStadiumRepository.getById(stadium_id)

    if(!stadiumExists) {
      throw new ResourceNotFoundError('Estádio')
    }

    const match = await this.matchRepository.create({
      date,
      team_id,
      rival_id,
      stadium_id
    })

    return { match }

  }

}