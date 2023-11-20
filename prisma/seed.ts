import { players } from './models/players'
import { rivals } from './models/rivals'
import { stadiums } from './models/stadiums'
import { teams } from './models/teams'
import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

async function main() {

  const user = await client.user.create({
    data: {
      email: 'alexandre@gmail.com',
      name: 'Alexandre Ferreira',
      password_hash: '12345678',
    }
  })

  const createdTeamsIds = await Promise.all(teams.map(async (team) => {
    const createdTeam = await client.team.create({
      data: {
        ...team,
        user_id: user.id,
      }
    })
    return createdTeam.id
  }))

  await Promise.all(players.map(async (player, index) => {
    const teamIndex = index % createdTeamsIds.length
    const teamId = createdTeamsIds[teamIndex]

    await client.player.create({
      data: {
        ...player,
        team_id: teamId,
      }
    })

  }))

  await Promise.all(rivals.map(async (rival, index) => {
    const teamIndex = index % createdTeamsIds.length
    const teamId = createdTeamsIds[teamIndex]

    await client.rival.create({
      data: {
        ...rival,
        team_id: teamId,
      }
    })

  }))

  await Promise.all(stadiums.map(async (stadium, index) => {
    const teamIndex = index % createdTeamsIds.length
    const teamId = createdTeamsIds[teamIndex]

    await client.stadium.create({
      data: {
        ...stadium,
        team_id: teamId,
      }
    });

  }))

}

main()
  .then(async () => {
    await client.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await client.$disconnect()
    process.exit(1)
  })