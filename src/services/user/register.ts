import { UserAlreadyExistsError } from "@/errors/user-already-exists-erros";
import { IUsersRepository } from "@/repositories/interfaces/users-repository";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";

interface IUserRegisterServiceParams {
  name: string
  email: string
  password: string
}

interface IUserRegisterServiceResponse {
  user: User
}


export class UserRegisterService {

  public constructor(private usersRepository: IUsersRepository) {}

  async execute({name, email, password}: IUserRegisterServiceParams): Promise<IUserRegisterServiceResponse> {


    const userAlreadyExists = await this.usersRepository.findByEmail(email)
    
    if (userAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash
    })

    return {
      user
    }
  }

}