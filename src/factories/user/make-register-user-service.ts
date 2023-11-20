import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserRegisterService } from "@/services/user/register";


export function makeUserRegisterService() {

  const prismaUsersRepository = new PrismaUsersRepository()
  const userService = new UserRegisterService(prismaUsersRepository)

  return userService
}