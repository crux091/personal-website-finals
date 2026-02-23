import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { ExpressAdapter } from '@nestjs/platform-express'
import * as express from 'express'
import { IncomingMessage, ServerResponse } from 'http'
import { AppModule } from '../src/app.module'

// Cache the Express app across warm invocations
let cachedApp: express.Express

async function bootstrap(): Promise<express.Express> {
  const expressApp = express()
  const adapter = new ExpressAdapter(expressApp)

  const app = await NestFactory.create(AppModule, adapter, { logger: false })

  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    methods: ['GET', 'POST'],
  })

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))

  await app.init()
  return expressApp
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (!cachedApp) {
    cachedApp = await bootstrap()
  }
  cachedApp(req, res)
}
