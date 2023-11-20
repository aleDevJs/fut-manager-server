import { Prisma } from "@prisma/client";
import { IUsersRepository } from "../interfaces/users-repository";
import { client } from "@/lib/client";


export class PrismaUsersRepository implements IUsersRepository {
  
  async create(user: Prisma.UserCreateInput) {

    const createdUser = await client.user.create({
      data: {
        email: user.email,
        name: user.name,
        password_hash: user.password_hash
      }
    })

    return createdUser
  }

  async findByEmail(email: string) {
    
    const user = await client.user.findUnique({
      where: {
        email
      }
    })

    return user

  }

  async findById(id: string) {
    
    const user = await client.user.findUnique({
      where: {
        id
      }
    })

    return user

  }

}