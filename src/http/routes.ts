import { FastifyInstance } from "fastify";
import { registerUserController } from "./controllers/user/register-user-controller";
import { authenticateController } from "./controllers/user/authenticate-user-controller";
import { multerConfigPlayer } from "../middleware/multer-config-player"
import { multerConfigTeam } from "@/middleware/multer-config-team";
import multer from 'fastify-multer';
import { createTeamController } from "./controllers/team/create-team-controller";
import { createPlayerController } from "./controllers/player/create-player-controller";
import { createMatchController } from "./controllers/match/create-match-controller";
import { CreateStadiumController } from "./controllers/stadium/create-stadium-controller";
import { multerConfigRival } from "@/middleware/multer-config-rival";
import { getPlayerByIdController } from "./controllers/player/get-player-by-id-controller";
import { getPlayersByTeamController } from "./controllers/player/get-players-by-team-controller";
import { getMatchesByTeamController } from "./controllers/match/get-matches-by-team-controller";
import { updatePlayerController } from "./controllers/player/update-player-controller";
import path from "path";
import { fileFilter } from "@/utils/fileFilter";
import { createRivalController } from "./controllers/rival/create-rival-controller";

export async function appRoutes(app: FastifyInstance) {

  //Multer config
  const uploadTeam = multer({
    storage: multerConfigTeam.storage,
    dest: 'src/uploads/teamFiles/',
    fileFilter
  })
  const uploadPlayer = multer({
    storage: multerConfigPlayer.storage,
    dest: 'src/uploads/playerFiles/',
    fileFilter
  })
  const uploadRival = multer({
    storage: multerConfigRival.storage,
    dest: 'src/uploads/rivalFiles/',
    fileFilter
  })

  app.register(uploadTeam.contentParser);

  //Public routes
  app.register(async (user) => {

    user.post('/register', registerUserController)

    user.post('/authenticate', authenticateController)

  }, { prefix: '/user' })

  //Authenticated routes
  app.register(async (verify) => {

    verify.addHook('preHandler', async (request, reply) => {

      try {
        await request.jwtVerify()
      } catch (error) {

        if (error instanceof Error) {
          return reply.status(401).send({
            message: "Unauthorized"
          })
        }

        throw error

      }

    });

    verify.register(async (player) => {

      player.post(
        '/create',
        { preHandler: uploadPlayer.single('image') },
        createPlayerController
      )

      player.patch(
        '/update',
        { preHandler: uploadPlayer.single('image') },
        updatePlayerController
      )

      player.get('/get-by-id/:id', getPlayerByIdController)

      player.get('/get-by-team/:teamId', getPlayersByTeamController)

    }, { prefix: '/player' })

    verify.register(async (match) => {
      match.addHook('preHandler', async (request, reply) => {
        // console.log(request)
      });

      match.post('/create', createMatchController)

      match.get('/get-by-team/:teamId', getMatchesByTeamController)

    }, { prefix: '/match' })

    verify.register(async (team) => {
      team.addHook('preHandler', async (request, reply) => {
        // console.log(request)
      });

      team.post(
        '/create',
        { preHandler: uploadTeam.single('shield') },
        createTeamController
      )

    }, { prefix: '/team' });

    verify.register(async (rival) => {

      rival.addHook('preHandler', async (request, reply) => {
        // console.log(request)
      });

      rival.post(
        '/create',
        { preHandler: uploadRival.single('shield') },
        createRivalController
      )

    }, { prefix: '/rival' })

    verify.register(async (stadium) => {

      stadium.addHook('preHandler', async (request, reply) => {
        // console.log(request)
      });

      stadium.post('/create', CreateStadiumController)

    }, { prefix: '/stadium' });

  })

}