import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'
import path from 'path'
import fastifyJwt from '@fastify/jwt'
import { InvalidFileError } from './errors/invalid-file-error'
import cors from '@fastify/cors'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET
})

app.register(cors, { 
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
})

app.register(appRoutes)

app.register(require("@fastify/static"), {
  root: path.join(__dirname, "uploads", 'playerFiles'),
  prefix: "/static/player/"
})

app.register(require("@fastify/static"), {
  root: path.join(__dirname, "uploads", 'teamFiles'),
  prefix: "/static/team/",
  decorateReply: false
})

app.register(require("@fastify/static"), {
  root: path.join(__dirname, "uploads", 'rivalFiles'),
  prefix: "/static/rival/",
  decorateReply: false
})

app.setErrorHandler((error, _, reply) => {

  if(error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.format()
    })
  }

  if (error instanceof InvalidFileError) {
    reply.code(400).send({ error: error.message });
  }

  if(env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({message: 'Internal Server Error'})
})