// Main entry point - NestJS application bootstrap
// Following coding standards: Rule 12, Rule 62

import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'
import { execSync } from 'child_process'

async function bootstrap(): Promise<void> {
  // Run database migrations before starting the app
  // Note: For Render, migrations should run in the start command:
  // npm run migrate:deploy && npm run start:prod
  // This code is a fallback if migrations weren't run in start command
  try {
    console.log('🔄 Checking database migrations...')
    const backendDir = __dirname.includes('dist') 
      ? __dirname.replace('/dist/src', '') 
      : process.cwd().includes('backend')
      ? process.cwd()
      : process.cwd() + '/backend'
    
    console.log(`📁 Working directory: ${backendDir}`)
    console.log(`📁 Current directory: ${process.cwd()}`)
    
    execSync('npx prisma migrate deploy', { 
      stdio: 'inherit',
      cwd: backendDir,
      env: { ...process.env },
      shell: '/bin/bash'
    })
    console.log('✅ Database migrations completed')
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('❌ Migration failed:', errorMessage)
    console.error('⚠️  If you see "table does not exist" errors, update Render start command to:')
    console.error('⚠️  npm run migrate:deploy && npm run start:prod')
    // Don't exit - let the app start so we can see other errors
  }

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
