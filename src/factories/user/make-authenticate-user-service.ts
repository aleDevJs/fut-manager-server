import { PrismaTeamsRepository } from "@/repositories/prisma/prisma-teams-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateService } from "@/services/user/authenticate";

export function makeAuthenticateUserService() {

  const prismaUsersRepository = new PrismaUsersRepository()
  const prismaTeamsRepository = new PrismaTeamsRepository()
  const userService = new AuthenticateService(prismaUsersRepository, prismaTeamsRepository)

  return userService
}