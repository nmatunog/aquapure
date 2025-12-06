// Main entry point - NestJS application bootstrap
// Following coding standards: Rule 12, Rule 62

import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  // Enable CORS for frontend communication
  const frontendUrl = process.env.CORS_ORIGIN || process.env.FRONTEND_URL || 'http://localhost:3000'
  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  })

  // Global validation pipe for DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  )

  // API prefix
  const port = process.env.PORT || 3001
  await app.listen(port)
  console.log(`🚀 Backend server running on http://localhost:${port}`)
  console.log(`📡 API available at http://localhost:${port}/api`)
  console.log(`🌐 CORS enabled for: ${frontendUrl}`)
}

bootstrap()
