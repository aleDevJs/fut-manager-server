import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { ResourceNotFoundError } from "@/errors/resource-not-found-error";
import { ITeamsRepository } from "@/repositories/interfaces/teams-repository";
import { IUsersRepository } from "@/repositories/interfaces/users-repository";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";

interface IAuthenticateServiceRequest {
  email: string
  password: string
}

interface IAuthenticateServiceReponse {
  user: User
  teamId?: string
}

export class AuthenticateService {

  constructor(private userRepository: IUsersRepository, private teamRepository: ITeamsRepository) { }

  async execute({ email, password }: IAuthenticateServiceRequest): Promise<IAuthenticateServiceReponse> {

    const user = await this.userRepository.findByEmail(email)

    if(!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if(!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    const team = await this.teamRepository.getByUserId(user.id)

    if(!team) {
      return {
        user
      }
    }else {
      return {
        user,
        teamId: team.id
      }
    }

  }

}