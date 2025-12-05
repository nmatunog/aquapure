// Application Entry Point
// Following coding standards: Rule 12, Rule 62

import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  // Enable CORS for frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  // API prefix
  app.setGlobalPrefix('api')

  const port = process.env.PORT || 3001
  await app.listen(port)

  console.log(`🚀 Application is running on: http://localhost:${port}/api`)
}

bootstrap()
